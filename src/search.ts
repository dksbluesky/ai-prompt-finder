import type { Prompt, SearchHit } from './types';

export const synonyms:Record<string,string[]>={
 '除錯':['debug','rootcause','程式','錯誤','故障','程式錯誤'],'debug':['除錯','rootcause','bug','程式錯誤'],
 '拆解':['blueprint','mindmap','architecture','分解','組件'],'image':['blueprint','圖片','圖像','拆解'],'圖片':['blueprint','image','圖像','分析'],
 '學習卡':['flashcard','flashcards','study cards','問答卡'],'study cards':['flashcard','學習卡','問答卡'],
 '心智圖':['mindmap','concept map','概念圖'],'mindmap':['心智圖','概念圖'],
 '投資方案':['compare','scenario','decision','tradeoff','比較','情境'],'投資':['compare','scenario','decision','tradeoff'],
 'challenge':['redteam','critique','risk-assessment','挑戰','反方'],'assumptions':['redteam','scenario','假設','風險'],
 '摘要':['summarize','tldr','exec-summary','summary'],'比較':['compare','proscons','tradeoff'],'翻譯':['translate','語言轉換'],
 'plan':['actionplan','studyplan','workflow','計畫'],'原因':['rootcause','5whys','hypotheses'],
 '安全':['security-review','risk-assessment','security'],'風險':['risk-assessment','redteam','scenario']
};
const norm=(s:string)=>s.toLocaleLowerCase().normalize('NFKC').replace(/[\s\p{P}\p{S}]+/gu,' ').trim();
const tokens=(s:string)=>norm(s).split(/\s+/).filter(Boolean);
export type SearchIndex=Array<{prompt:Prompt;title:string;label:string;aliases:string;keywords:string;category:string;description:string;body:string}>;
export function buildSearchIndex(items:Prompt[]):SearchIndex{return items.map(prompt=>({prompt,title:norm(prompt.title),label:norm(prompt.quickLabel||''),aliases:norm(prompt.aliases.join(' ')),keywords:norm(prompt.keywords.join(' ')),category:norm(prompt.category),description:norm(prompt.description),body:norm(prompt.template)}));}
export function searchIndexed(index:SearchIndex,query:string,collection='all',category='all'):SearchHit[]{
 const q=norm(query); const qt=tokens(q); const expanded=new Set(qt);const matchedSynonyms:string[]=[];
 for(const [key,values] of Object.entries(synonyms)) if(q.includes(norm(key))||qt.includes(norm(key))) values.forEach(v=>{tokens(v).forEach(x=>expanded.add(x));matchedSynonyms.push(norm(v));});
 const slash=query.match(/\/[a-z0-9-]+/i)?.[0]?.toLowerCase();
 return index.filter(({prompt})=>(collection==='all'||prompt.collection===collection)&&(category==='all'||prompt.category===category)).map(fields=>{
  const {prompt,title,label}=fields;
  let score=0; let exactCommand=false; const reasons:string[]=[];
  if(slash&&(title===norm(slash)||label===norm(slash)||fields.aliases.split(' ').includes(norm(slash)))){score+=120;exactCommand=true;reasons.push('完全符合指令');}
  if(q&&title===q){score+=100;reasons.push('完全符合標題');}
  if(q&&fields.aliases.includes(q)){score+=65;reasons.push('符合別名');}
  if(q&&fields.keywords.includes(q)){score+=48;reasons.push('符合關鍵字');}
  for(const term of matchedSynonyms){if(fields.title===term){score+=80;reasons.push('同義詞任務');}else if(fields.title.includes(term)||fields.aliases.includes(term)||fields.keywords.includes(term)){score+=24;reasons.push('同義詞');}}
  const queryWords=[...expanded]; for(const word of queryWords){if(!word||word.length<2)continue; if(title.includes(word)){score+=18;reasons.push('標題');} if(fields.aliases.includes(word)){score+=12;reasons.push('別名');} if(fields.keywords.includes(word)){score+=10;reasons.push('關鍵字');} if(fields.category.includes(word)){score+=8;reasons.push('分類');} if(fields.description.includes(word)){score+=5;reasons.push('描述');} if(fields.body.includes(word)){score+=1;} }
  const covered=qt.filter(t=>[fields.title,fields.aliases,fields.keywords,fields.category,fields.description,fields.body].some(v=>v.includes(t))).length;
  if(qt.length>1&&covered) score+=Math.round(covered/qt.length*8);
  return {prompt,score,reason:reasons.length?[...new Set(reasons)].slice(0,3).join('、'):'分類相關',exactCommand};
 }).filter(h=>q? h.score>0 : true).sort((a,b)=>{if(!q){const featured=['community-blueprint','community-debug','community-compare','community-flashcard','community-mindmap'];const ai=featured.indexOf(a.prompt.id),bi=featured.indexOf(b.prompt.id);if(ai!==-1||bi!==-1)return(ai===-1?99:ai)-(bi===-1?99:bi);}return b.score-a.score||a.prompt.title.localeCompare(b.prompt.title);});
}
export function searchPrompts(items:Prompt[],query:string,collection='all',category='all'):SearchHit[]{return searchIndexed(buildSearchIndex(items),query,collection,category);}
