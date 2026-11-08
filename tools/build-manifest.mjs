// Build deterministic data-only manifest; no JavaScript/native code can be published.
import {readdir,readFile,writeFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {join,relative} from 'node:path';
const root=process.cwd(),base=join(root,'resources');
const allowed=/\.(?:mp3|ogg|wav|m4a|glb|png|jpg|jpeg|webp|json)$/i;
async function walk(dir){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){if(e.isSymbolicLink())throw Error('No symlinks: '+e.name);const p=join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else if(e.isFile())out.push(p)}return out;}
const files=[];
for(const p of (await walk(base)).sort()){
 const rel=relative(base,p).split('\\').join('/');
 if(rel.endsWith('/.gitkeep'))continue;
 if(rel.split('/').some(x=>x.startsWith('.')) || !allowed.test(rel))throw Error('Unsupported asset: '+rel);
 const st=await stat(p);if(st.size>90*1024*1024)throw Error('GitHub file exceeds 90MB: '+rel);
 if(rel.endsWith('.json'))JSON.parse(await readFile(p,'utf8'));
 const body=await readFile(p);if(!body.length)continue;
 const sha256=createHash('sha256').update(body).digest('hex');
 files.push({id:rel,bytes:body.length,sha256});
}
const signature=createHash('sha256').update(JSON.stringify(files)).digest('hex').slice(0,16);
const manifest={schema:1,version:signature,files};
await writeFile(join(root,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log('Assets:',files.length,'Version:',signature);
