/* Export the same live definitions as readable, self-contained default-view JSON.
   Run from any directory: node tools/export-specs.cjs
   No package installation is required. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js/visualisation.js'), 'utf8');
const end = source.indexOf('\nfunction prepareInterface(');
if (end < 0) throw new Error('Chart definitions could not be located.');
const context = {console};
vm.createContext(context);
vm.runInContext(source.slice(0, end) + '\nprepareCharts(2026,9,"Reading");globalThis.exportCharts=charts;', context);
fs.mkdirSync(path.join(root, 'charts'), {recursive:true});
const links=[];
for (let i=0;i<context.exportCharts.length;i++) {
  const [id,spec] = context.exportCharts[i];
  const file=String(i+1).padStart(2,'0')+'-'+id+'.vg.json';
  fs.writeFileSync(path.join(root,'charts',file), JSON.stringify(spec,null,2)+'\n');
  links.push('                <li><a href="charts/'+file+'">Chart '+(i+1)+': '+id.replaceAll('-',' ')+'</a></li>');
}
const page=fs.readFileSync(path.join(root,'index.html'),'utf8');
const eol=page.includes('\r\n')?'\r\n':'\n';
const updated=page.replace(/<ul id="chart-spec-links">[\s\S]*?<\/ul>/,'<ul id="chart-spec-links">\n'+links.join('\n')+'\n            </ul>');
fs.writeFileSync(path.join(root,'index.html'),updated.replace(/\r?\n/g,eol));
console.log('Exported 14 readable JSON chart specifications.');
