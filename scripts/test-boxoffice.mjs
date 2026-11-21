import ts from 'typescript';
import {readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const dir=mkdtempSync(resolve('.','boxoffice-test-'));
try{
 for(const name of ['model','server','finance']){let text=readFileSync(`src/lib/boxoffice/${name}.ts`,'utf8').replaceAll("from './model'","from './model.mjs'").replaceAll("from './model.ts'","from './model.mjs'");writeFileSync(resolve(dir,name+'.mjs'),ts.transpileModule(text,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText);}
 const {reportInput,parseCsv,fingerprint,conflicts,scenarioGross}=await import(pathToFileURL(resolve(dir,'model.mjs')));
 const {calculateScenario}=await import(pathToFileURL(resolve(dir,'finance.mjs')));
 assert.deepEqual(calculateScenario({production:100,marketing:20,distribution:10,gross:250,share:40,digital:20,satellite:10,other:0}),{cost:130,rights:30,revenue:130,profit:0,roi:0,breakEvenGross:250});
 assert.equal(calculateScenario({production:0,marketing:0,distribution:0,gross:0,share:0,digital:0,satellite:0,other:0}).roi,null);
 assert.throws(()=>calculateScenario({production:100,marketing:0,distribution:0,gross:100,share:101,digital:0,satellite:0,other:0}));
 const {boxOfficeApi}=await import(pathToFileURL(resolve(dir,'server.mjs')));
 const input={tmdbId:1,imdbId:'tt0000001',sourceName:'Test fixture (not real data)',sourceUrl:'https://example.com/report',reportDate:'2026-01-01',period:'lifetime',periodStart:null,periodEnd:null,territory:'Worldwide',currency:'INR',classification:'gross',amount:100,reportingStatus:'reported',notes:''};
 assert.equal(reportInput.safeParse({...input,amount:null}).success,true);
 assert.equal(reportInput.safeParse({...input,amount:-1}).success,false);
 assert.equal(reportInput.safeParse({...input,reportDate:'2026-02-30'}).success,false);
 assert.equal(reportInput.safeParse({...input,sourceUrl:'javascript:alert(1)'}).success,false);
 assert.deepEqual(parseCsv('a,b\r\n"a,b","hello\nworld"'),[{a:'a,b',b:'hello\nworld'}]);
 assert.throws(()=>parseCsv('a,b\n"oops'));
 assert.equal(fingerprint(input),fingerprint({...input}));
 const r={...input,id:'a',provider:'manual',retrievedAt:new Date().toISOString(),approval:'approved',revision:1};
 assert.deepEqual(conflicts(r,[r,{...r,id:'b',amount:101}]),['b']);
 assert.deepEqual(conflicts(r,[r,{...r,id:'b',territory:'India',amount:101}]),[]);
 assert.equal(scenarioGross(r),0.00001);
 for(const change of [{approval:'pending'},{currency:'USD'},{territory:'India'},{classification:'net'},{amount:null}])assert.throws(()=>scenarioGross({...r,...change}));
 process.env.BOXOFFICE_STORE_PATH=resolve(dir,'store.json');process.env.BOXOFFICE_ADMIN_TOKEN='x'.repeat(40);
 const req=(path,body,auth=true)=>new Request('http://localhost/api/boxoffice/'+path,{method:body?'POST':'GET',headers:{...(auth?{authorization:'Bearer '+process.env.BOXOFFICE_ADMIN_TOKEN}:{}),'content-type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
 assert.equal((await boxOfficeApi(req('import',{record:input},false))).status,401);
 assert.equal((await boxOfficeApi(req('records?tmdbId=bad',null,false))).status,400);
 let count=0;globalThis.fetch=async(url)=>{count++;if(String(url).includes('themoviedb'))return Response.json({id:1,title:'Fixture',external_ids:{imdb_id:'tt0000001'}});return new Response('',{status:404});};process.env.TMDB_API_KEY='fixture-only';
 for(let i=0;i<2;i++)assert.equal((await boxOfficeApi(req('import',{record:input}))).status,200);
 let records=await (await boxOfficeApi(req('records?tmdbId=1'))).json();assert.equal(records.length,1);assert.equal(count,1,'metadata cached');
 assert.equal((await (await boxOfficeApi(req('records?tmdbId=1',null,false))).json()).length,0);
 let row=records[0];assert.equal((await boxOfficeApi(req('review',{id:row.id,revision:1,approval:'approved'}))).status,200);
 assert.equal((await boxOfficeApi(req('review',{id:row.id,revision:1,approval:'rejected'}))).status,400,'stale update rejected');
 assert.equal((await (await boxOfficeApi(req('records?tmdbId=1',null,false))).json()).length,1);
 assert.equal((await boxOfficeApi(req('import',{record:{...input,amount:101}}))).status,200);
 records=await (await boxOfficeApi(req('records?tmdbId=1'))).json();row=records.find(x=>x.amount===101);
 assert.equal((await boxOfficeApi(req('review',{id:row.id,revision:row.revision,approval:'approved'}))).status,400,'conflict acknowledgement required');
 assert.equal((await boxOfficeApi(req('review',{id:row.id,revision:row.revision,approval:'approved',acknowledgeConflict:true}))).status,200);
 assert.ok((await (await boxOfficeApi(req('audit'))).json()).length>=4);
 console.log('PASS: validation, missing values, CSV quoting, deduplication, conflict isolation, scenario guardrails, authentication, caching, approval, stale revisions and audit. All data is synthetic test fixtures only.');
}finally{rmSync(dir,{recursive:true,force:true});}

