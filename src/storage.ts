import type { PersonalData, PersonalPrompt } from './types';
export const STORAGE_KEY='ai-prompt-finder.personal.v1';
export const emptyData=():PersonalData=>({schemaVersion:1,prompts:[],favorites:[],recent:[]});
export function validatePersonalData(value:unknown):PersonalData|null{
 if(!value||typeof value!=='object')return null; const x=value as Record<string,unknown>;
 if(x.schemaVersion!==1||!Array.isArray(x.prompts)||!Array.isArray(x.favorites)||!Array.isArray(x.recent))return null;
 const prompts:PersonalPrompt[]=[]; const ids=new Set<string>();
 for(const raw of x.prompts){if(!raw||typeof raw!=='object')return null;const p=raw as Record<string,unknown>;
  if(typeof p.id!=='string'||!/^user-[a-z0-9-]{1,80}$/i.test(p.id)||ids.has(p.id)||typeof p.title!=='string'||!p.title.trim()||p.title.length>160||typeof p.category!=='string'||typeof p.description!=='string'||typeof p.template!=='string'||p.template.length>50000||!Array.isArray(p.useCases)||!p.useCases.every(v=>typeof v==='string')||!Array.isArray(p.keywords)||!p.keywords.every(v=>typeof v==='string')||typeof p.language!=='string'||typeof p.updatedAt!=='number')return null;
  ids.add(p.id);prompts.push(p as unknown as PersonalPrompt);
 }
 if(!x.favorites.every(v=>typeof v==='string')||!x.recent.every(v=>typeof v==='string'))return null;
 return {schemaVersion:1,prompts,favorites:[...new Set(x.favorites as string[])],recent:[...new Set(x.recent as string[])]};
}
export function loadData():PersonalData{try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return emptyData();return validatePersonalData(JSON.parse(raw))??emptyData();}catch{return emptyData();}}
export function saveData(data:PersonalData):boolean{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));return true;}catch{return false;}}
export function detectPlaceholders(text:string):string[]{return [...new Set([...text.matchAll(/\[([^\]\n]{1,80})\]/g)].map(m=>m[0]))];}
