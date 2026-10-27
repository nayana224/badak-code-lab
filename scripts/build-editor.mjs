import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
await mkdir(path.join(root,'web/vendor'),{recursive:true});
await build({entryPoints:[path.join(root,'editor-src/editor.js')],outfile:path.join(root,'web/vendor/editor.js'),bundle:true,format:'esm',target:['es2022'],minify:true,legalComments:'eof',banner:{js:'// Bundled CodeMirror editor. Source: editor-src/editor.js. Licenses: THIRD_PARTY_NOTICES.md.'}});
const lock=JSON.parse(await readFile(path.join(root,'package-lock.json'),'utf8'));
const notices=['# Third-party notices','', 'The local editor bundle includes the following packages. The project license is separate from these dependency licenses.',''];
for(const [location,info] of Object.entries(lock.packages)){
 if(!location||info.dev||info.optional)continue;
 const packageRoot=path.join(root,location);
 const pkg=JSON.parse(await readFile(path.join(packageRoot,'package.json'),'utf8'));
 let license;
 for(const name of ['LICENSE','LICENSE.md','LICENSE.txt','license','license.txt']){
  try{license=await readFile(path.join(packageRoot,name),'utf8');break;}catch{}
 }
 if(!license)throw Error('Missing dependency license: '+pkg.name);
 notices.push(`## ${pkg.name} ${pkg.version}`,'',license.trim(),'');
}
await writeFile(path.join(root,'THIRD_PARTY_NOTICES.md'),notices.join('\n'));
console.log('Built local editor bundle and dependency license notices.');
