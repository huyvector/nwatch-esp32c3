const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {english, chooseLanguage} = require('./app.js');
const root = __dirname;
for (const zone of ['Asia/Ho_Chi_Minh', 'Asia/Saigon']) assert.equal(chooseLanguage(zone), 'vi');
for (const zone of ['Asia/Bangkok','Europe/London','America/New_York','UTC','',undefined]) assert.equal(chooseLanguage(zone), 'en');
assert.equal(chooseLanguage('Asia/Saigon','en'), 'en');
assert.equal(chooseLanguage('UTC','vi'), 'vi');
assert.equal(chooseLanguage('Asia/Saigon','invalid'), 'vi');
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
for (const [,key] of html.matchAll(/data-i18n(?:-aria)?="([^"]+)"/g)) assert.ok(english[key], `Missing English: ${key}`);
assert.equal((html.match(/download data-i18n="sourceDownload"/g)||[]).length,1);
assert.ok(!html.includes('id="source"'));
for (const asset of ['app.js?v=6.7.2','styles.css?v=6.7.2','manifest.json?v=6.7.2']) assert.ok(html.includes(asset), `Missing cache version: ${asset}`);
assert.ok(html.indexOf('class="source-download"') > html.indexOf('</esp-web-install-button>'));
const manifest = JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
assert.equal(manifest.version,'6.7.2');
// ESP Web Tools false skips the prompt by erasing; true presents an unchecked checkbox.
assert.equal(manifest.new_install_prompt_erase,true);
for (const part of manifest.builds[0].parts) {
  const size=fs.statSync(path.join(root,part.path)).size;
  const start=Math.floor(part.offset/4096)*4096, end=Math.ceil((part.offset+size)/4096)*4096;
  assert.ok(end<=0x9000 || start>=0xe000, `Touches NVS sectors: ${part.path}`);
}
for (const [,href] of html.matchAll(/href="(downloads\/[^"]+)"/g)) assert.ok(fs.existsSync(path.join(root,href)));
console.log('PASS: language zones/overrides, translation coverage, compact download, firmware paths, NVS-safe sectors, erase prompt');
