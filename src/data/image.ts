import type { Prompt } from '../types';

type Item = [slug:string, english:string, chinese:string];
type Group = { category:string; englishCategory:string; items:Item[] };

// The labels and numbering come from the nine screenshots supplied by the user.
// Descriptions and editable templates are independently written adaptations.
const groups:Group[] = [
 {category:'畫質與寫實感',englishCategory:'Detail & Realism',items:[
  ['4k','a crisp, high-detail 4K-inspired look','清晰且細節豐富的類 4K 視覺質感'],
  ['8k','an exceptionally detailed, high-resolution-inspired look','極高細節的高解析度視覺質感'],
  ['hdreal','a polished, photorealistic HD look','精緻的高畫質寫實攝影感'],
  ['ultrarealistic','a highly realistic appearance with believable textures','強調真實材質與細節的高度寫實感'],
 ]},
 {category:'視角與構圖',englishCategory:'Camera & Composition',items:[
  ['cinematic','cinematic framing, lighting, and mood','電影感的構圖、光線與氛圍'],
  ['droneview','a drone-like aerial perspective','彷彿空拍機拍攝的空中視角'],
  ['aerialview','a high-altitude view of the scene','從高空俯瞰場景的視角'],
  ['topdown','a camera angle directly above the subject','鏡頭位於主體正上方的俯拍角度'],
  ['lowangle','a dramatic low camera angle looking upward','由下向上拍攝的戲劇性低角度'],
  ['highangle','a camera angle looking down toward the subject','由上向下觀看主體的高角度'],
  ['sideview','a clear side-profile view of the subject','清楚呈現主體側面的視角'],
  ['closeup','close framing focused on the subject','聚焦主體的近距離構圖'],
  ['extremecloseup','an extreme close-up showing fine details','呈現細微細節的極近特寫'],
  ['wideangle','a wide field of view that includes the surroundings','納入周邊環境的廣角視野'],
  ['fisheye','a visibly curved, ultra-wide fisheye perspective','帶有彎曲變形的超廣角魚眼視角'],
  ['pov','a first-person point-of-view composition','第一人稱所見的主觀視角構圖'],
  ['overtheshoulder','a view from behind the subject’s shoulder','從主體肩後觀看的過肩視角'],
  ['birdseyeview','a bird’s-eye view straight down on the scene','從正上方俯瞰整體場景的鳥瞰視角'],
  ['wormseyeview','an extreme low viewpoint looking upward','貼近地面、向上仰望的視角'],
 ]},
 {category:'天氣與時間氛圍',englishCategory:'Weather & Time of Day',items:[
  ['fog','dense fog surrounding the scene','濃霧環繞場景的氛圍'],
  ['mist','a soft veil of light mist','輕柔薄霧籠罩的氛圍'],
  ['rainynight','a wet city or outdoor scene at night','夜晚雨中的濕潤場景'],
  ['rain','visible rainfall and a damp atmosphere','可見雨勢與潮濕空氣的場景'],
  ['storm','dramatic storm clouds and turbulent weather','暴風雲層與激烈天氣變化'],
  ['snow','falling snow and a winter atmosphere','飄雪與冬季氛圍'],
  ['sunset','warm light near sunset','日落時分的暖色光線'],
  ['sunrise','soft light at the beginning of the day','日出初始的柔和光線'],
  ['goldenhour','warm, low-angle golden-hour light','黃金時段低角度的暖色陽光'],
  ['bluehour','cool blue light during twilight','暮光時分的冷藍色調'],
  ['moonlight','a scene illuminated mainly by moonlight','主要由月光照亮的場景'],
  ['neonlights','vivid neon lights that shape the scene','鮮明霓虹燈塑造的場景'],
  ['cyberpunk','a futuristic city mood with neon and technology','霓虹與科技交織的賽博龐克氛圍'],
  ['darkmoody','a dark, dramatic, subdued atmosphere','深沉、戲劇性且壓抑的氛圍'],
 ]},
 {category:'打光與鏡頭效果',englishCategory:'Lighting & Lens Effects',items:[
  ['softlighting','gentle, diffused light with soft shadows','柔和擴散光與淡化的陰影'],
  ['dramaticlighting','strong, high-contrast cinematic lighting','強烈高對比的電影感打光'],
  ['rimlight','a bright edge light outlining the subject','勾勒主體輪廓的明亮邊緣光'],
  ['backlight','light shining from behind the subject','從主體後方照射的逆光'],
  ['volumetriclight','visible light beams passing through the air','穿透空氣且可見的光束'],
  ['godrays','dramatic shafts of sunlight through the scene','穿過場景的戲劇性陽光光束'],
  ['studio','controlled lighting in a professional studio setup','專業攝影棚中受控的打光'],
  ['filmgrain','a subtle analog-film grain texture','細緻的類比底片顆粒'],
  ['anamorphic','a wide cinematic lens aesthetic','寬幅電影鏡頭的視覺感'],
  ['bokeh','softly blurred points of light behind the subject','主體後方柔化的散景光點'],
  ['shallowdepth','a sharp subject against a blurred background','清晰主體與模糊背景形成的淺景深'],
  ['motionblur','directional blur that conveys movement','呈現移動方向的動態模糊'],
  ['longexposure','a long-exposure effect with flowing motion trails','帶有流動軌跡的長時間曝光效果'],
  ['freezeaction','a sharply captured moment of fast action','清晰凝結高速動作的瞬間'],
 ]},
 {category:'攝影與設計風格',englishCategory:'Photography & Design Styles',items:[
  ['vintage','a classic old-fashioned visual style','經典復古的影像風格'],
  ['retro','a nostalgic retro-inspired design','帶有懷舊感的復刻設計'],
  ['oldmoney','an understated, timeless luxury aesthetic','低調而經典的奢華質感'],
  ['luxury','a refined premium visual treatment','精緻高級的視覺呈現'],
  ['minimalist','a clean composition with few intentional elements','元素精簡且留白明確的極簡構圖'],
  ['editorial','a polished magazine-editorial photography style','專業雜誌編輯攝影風格'],
  ['fashion','a styled high-fashion photography look','造型鮮明的高級時尚攝影感'],
  ['streetstyle','a contemporary urban street-fashion mood','現代都會街頭時尚氛圍'],
  ['magazinecover','a professional magazine-cover composition','專業雜誌封面式構圖'],
  ['polaroid','the colors and framing of an instant Polaroid photo','拍立得即時照片的色彩與構圖'],
  ['disposablecamera','a candid, imperfect disposable-camera look','自然不刻意的一次性相機影像感'],
  ['35mmfilm','the color and grain of classic 35 mm film photography','經典 35 毫米底片的色彩與顆粒'],
  ['instantphoto','a casual instant-camera photograph appearance','隨手拍攝的即時相機照片感'],
 ]},
 {category:'場景與環境',englishCategory:'Settings & Environments',items:[
  ['underwater','an underwater setting with believable depth and light','有水下深度與折射光線的環境'],
  ['space','an outer-space or cosmic setting','外太空或宇宙場景'],
  ['desert','a desert landscape with dry terrain','地形乾燥的沙漠景觀'],
  ['forest','a natural forest setting with layered vegetation','植物層次豐富的自然森林'],
  ['mountains','a dramatic mountain landscape','壯闊且富有層次的山景'],
  ['beach','a coastal beach setting','海岸與沙灘場景'],
  ['cityscape','a wide urban cityscape','寬廣的城市天際線'],
  ['nightcity','an urban environment after dark','夜晚的都市環境'],
 ]},
 {category:'世界觀與題材',englishCategory:'Worlds & Genres',items:[
  ['futuristic','an advanced futuristic design language','前衛未來感的設計語彙'],
  ['postapocalyptic','a ruined world after a major catastrophe','重大災變後的荒廢世界'],
  ['fantasy','a magical and imaginative fantasy setting','充滿魔法與想像的奇幻世界'],
  ['scifi','a science-fiction-inspired visual world','受科幻題材啟發的視覺世界'],
  ['medieval','a historically inspired medieval-era atmosphere','受中世紀時代啟發的氛圍'],
  ['samurai','a cinematic scene inspired by Japanese samurai stories','受日本武士故事啟發的電影場景'],
  ['noir','a dark, high-contrast film-noir look','黑暗且高對比的黑色電影風格'],
  ['detective','a mysterious atmosphere inspired by detective stories','帶有推理故事感的神祕氛圍'],
  ['superhero','an epic superhero-inspired visual','史詩感的超級英雄題材畫面'],
 ]},
 {category:'插畫與立體風格',englishCategory:'Illustration & Rendering',items:[
  ['anime','a Japanese-anime-inspired illustration style','受日本動畫啟發的插畫風格'],
  ['comicbook','a bold illustrated comic-book style','線條鮮明的漫畫書插畫風格'],
  ['oilpainting','the brushwork and texture of an oil painting','油畫筆觸與顏料質感'],
  ['watercolor','soft watercolor washes and edges','柔和水彩暈染與邊緣'],
  ['sketch','a hand-drawn sketch appearance','手繪素描的外觀'],
  ['claystyle','a stylized clay or clay-animation look','黏土塑形或黏土動畫的風格'],
  ['3drender','a polished three-dimensional rendered look','精緻的三維渲染外觀'],
  ['isometric','an isometric three-dimensional perspective','等角投影的三維視角'],
  ['miniature','a tiny miniature-world or diorama effect','微縮世界或立體場景模型效果'],
  ['tiltshift','a tilt-shift miniature-photography effect','移軸攝影形成的微縮模型效果'],
  ['papercraft','a layered handmade paper-cut appearance','層疊的手工剪紙外觀'],
 ]},
 {category:'材質與特殊效果',englishCategory:'Materials & Special Effects',items:[
  ['glassart','an artistic transparent-glass aesthetic','具藝術感的透明玻璃材質'],
  ['chrome','a reflective chrome-metal finish','高反射的鍍鉻金屬表面'],
  ['holographic','a shifting holographic-material finish','色彩隨角度變化的全像材質'],
  ['doubleexposure','two visual scenes blended into one composition','兩個場景融合的雙重曝光構圖'],
  ['silhouette','a dark outline against a brighter background','明亮背景前的深色剪影輪廓'],
  ['reflection','a visible reflection on water or another surface','水面或其他表面上的可見倒影'],
  ['mirror','a composition built around a mirror and its reflection','以鏡面與映像為核心的構圖'],
  ['fire','dramatic flames and warm firelight','戲劇性火焰與暖色火光'],
  ['smoke','atmospheric drifting smoke','在空氣中飄散的煙霧'],
  ['glitch','a controlled digital-glitch distortion','受控的數位故障失真效果'],
  ['dreamcore','a surreal, dreamlike, slightly uncanny mood','超現實、夢境般且略帶詭異的氛圍'],
 ]},
];

export const imageCategories=[...groups.map(group=>group.category),'影像修復'];
export const englishImageCategories=[...groups.map(group=>group.englishCategory),'Image Repair'];

const numberedImagePrompts:Prompt[]=groups.flatMap(group=>group.items.map(([slug,effect,zhEffect],index)=>{
 const number=groups.slice(0,groups.indexOf(group)).reduce((total,item)=>total+item.items.length,0)+index+1;
 const title=`/${slug}`;
 return {
  id:`image-${String(number).padStart(2,'0')}`,collection:'image',title,
  imageNumber:number,quickLabel:title,category:group.category,
  description:`以${zhEffect}呈現圖片。`,
  template:`請生成以[主體]為核心的圖片，呈現${zhEffect}。讓構圖、背景與光線呼應這個方向；保留[必須保留的細節]，避免[不想出現的元素]。${group.category==='畫質與寫實感'?'若要指定實際輸出尺寸，請另外使用圖片工具的尺寸設定。':''}`,
  useCases:[group.category,zhEffect],keywords:[slug,group.category,zhEffect,effect],
  aliases:[title],exampleQuery:`以${zhEffect}呈現[主體]`,language:'zh-Hant',
  english:{title,category:group.englishCategory,description:`Image with ${effect}.`,
   template:`Create an image of [subject] with ${effect}. Make the composition, background, and lighting support this direction. Preserve [details to keep] and avoid [unwanted elements].${group.category==='畫質與寫實感'?' Set actual output dimensions in the image tool when needed.':''}`,
   useCases:[group.englishCategory,effect],exampleQuery:`Create [subject] with ${effect}`}
 };
}));

export const imagePrompts:Prompt[]=[...numberedImagePrompts,{
 id:'image-deblur',collection:'image',title:'/deblur',category:'影像修復',
 description:'減輕上傳原始照片的模糊，保留真實可辨識的細節。',
 template:'請編輯我上傳的原始照片，盡可能減輕手震或失焦造成的模糊，讓可辨識的細節更清楚。保留人物身分、原有物件、構圖、顏色與文字；不要憑空補造看不清楚的臉部特徵、字句或物件。若有細節無法可靠還原，請維持自然並告訴我哪些部分仍不清楚。',
 useCases:['影像修復','模糊照片改善'],keywords:['deblur','unblur','sharpen','photo restoration','去模糊','清晰化','照片修復'],
 aliases:['/deblur'],exampleQuery:'讓這張上傳的模糊照片更清楚',language:'zh-Hant',
 english:{title:'/deblur',category:'Image Repair',description:'Reduce blur in an uploaded original photo while preserving real details.',
  template:'Edit the original photo I uploaded. Reduce camera shake or focus blur where possible and make recoverable details clearer. Preserve the people, existing objects, composition, colors, and text. Do not invent facial features, words, or objects that cannot be seen. If details cannot be recovered reliably, keep them natural and tell me which areas remain unclear.',
  useCases:['Image Repair','Improve a blurry photo'],exampleQuery:'Make this uploaded blurry photo clearer'}
}];
