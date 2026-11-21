process.env.PORT='8096';process.env.HOST='127.0.0.1';
try {
 await import('../.output/server/index.mjs');
 await new Promise(r=>setTimeout(r,500));
 for(const path of ['/api/boxoffice/providers','/api/boxoffice/records?tmdbId=155','/','/intelligence']){
  const r=await fetch('http://127.0.0.1:8096'+path,{signal:AbortSignal.timeout(20000)});
  const text=await r.text();console.log(path+' HTTP '+r.status+' bytes '+text.length);
  if(r.status!==200)throw new Error('Non-200 production response');
  if(path==='/')console.log('Homepage workbench present: '+text.includes('workbench'));
 }
 console.log('PASS production HTTP smoke');process.exit(0);
}catch(e){console.log('FAIL production smoke: '+e.message+' '+(e.cause?.code??''));process.exit(1);}

