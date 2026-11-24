export async function loadLabEdition({fetcher=fetch,signal,now=Date.now()}={}){
 const base='https://public-api.wordpress.com/wp/v2/sites/reneorense.wordpress.com/';
 const time=p=>Date.parse(typeof p.date_gmt==='string'?( /[zZ]$|[+-]\d\d:\d\d$/.test(p.date_gmt)?p.date_gmt:p.date_gmt+'Z'):'');
 const cmp=(a,b)=>time(b)-time(a)||b.id-a.id;
 const valid=p=>Number.isInteger(p.id)&&typeof p.link==='string'&&/^https:\/\/reneorense\.wordpress\.com\//i.test(p.link)&&p.status==='publish'&&!p.password&&!p.password_protected&&!p.content?.protected&&Number.isFinite(time(p))&&time(p)<=now;
 async function getPage(resource,params,index,size){
  const q=Object.entries({...params,page:index,per_page:size}).map(([k,v])=>encodeURIComponent(k)+'='+encodeURIComponent(v)).join('&');
  const r=await fetcher(base+resource+'?'+q,{signal,credentials:'omit',cache:'no-store'});
  if(!r.ok)throw Error(resource+' feed unavailable: '+r.status);
  const rows=await r.json();if(!Array.isArray(rows))throw Error('Invalid feed');
  const h=r.headers?.get('X-WP-TotalPages'),total=h==null?NaN:Number(h);
  return {rows,done:Number.isFinite(total)?index>=total:rows.length<size};
 }
 let labs=[],pg=1,done=false;
 while(!done){const r=await getPage('categories',{hide_empty:'false',orderby:'id',order:'asc',_fields:'id,name,slug'},pg++,100);labs.push(...r.rows.filter(c=>Number.isInteger(c.id)&&/^ren-.+-lab$/.test(c.slug)));done=r.done}
 const states=[...new Map(labs.map(l=>[l.id,l])).values()].map(lab=>({lab,pg:1,done:false,posts:[],seen:new Set()}));
 async function candidate(s,used){
  while(true){const p=s.posts.find(p=>!used.has(p.id));if(p)return p;if(s.done)return null;
   const r=await getPage('posts',{categories:s.lab.id,status:'publish',orderby:'date',order:'desc',_embed:'wp:featuredmedia',_fields:'id,title,link,date,date_gmt,status,categories,content.protected,_links,_embedded'},s.pg++,10);
   for(const p of r.rows){if(valid(p)&&p.categories?.includes(s.lab.id)&&!s.seen.has(p.id)){s.posts.push(p);s.seen.add(p.id)}}
   s.posts.sort(cmp);s.done=r.done;
  }
 }
 const initial=await Promise.all(states.map(async s=>({s,p:await candidate(s,new Set())})));
 initial.sort((a,b)=>(b.p?time(b.p):-Infinity)-(a.p?time(a.p):-Infinity)||a.s.lab.id-b.s.lab.id);
 const used=new Set(),out=[];
 for(const {s,p} of initial){if(!p)continue;const pick=await candidate(s,used);if(pick){used.add(pick.id);out.push({post:pick,lab:s.lab})}}
 return out.sort((a,b)=>cmp(a.post,b.post));
}
