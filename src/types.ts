export type Collection = 'original' | 'community' | 'personal';
export type Prompt = { id:string; collection:Collection; title:string; category:string; description:string; template:string; useCases:string[]; keywords:string[]; aliases:string[]; language:string; exampleQuery?:string; source?:string; originalNumber?:number; quickLabel?:string; adaptation?:boolean };
export type PersonalPrompt = { id:string; title:string; category:string; description:string; template:string; useCases:string[]; keywords:string[]; language:string; updatedAt:number };
export type PersonalData = { schemaVersion:1; prompts:PersonalPrompt[]; favorites:string[]; recent:string[] };
export type SearchHit = { prompt:Prompt; score:number; reason:string; exactCommand:boolean };
