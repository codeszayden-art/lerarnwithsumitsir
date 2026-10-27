/**
 * Downloads every image hosted on learnwithsumit.in that the data files point to and
 * rewrites the URLs to local files. Run once on a machine with internet: `npm run images:localize`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const FILES = ['src/data/achievers.js', 'src/data/experts.js'];
const OUT = 'src/assets/images/remote';
const URL_RE = /https:\/\/learnwithsumit\.in\/wp-content\/uploads\/[^'"`\s)]+/g;

await mkdir(OUT, { recursive: true });
for (const file of FILES) {
  let src = await readFile(file, 'utf8');
  const urls = [...new Set(src.match(URL_RE) || [])];
  for (const url of urls) {
    const name = url.split('/uploads/')[1].replace(/\//g, '-');
    const res = await fetch(url);
    if (!res.ok) { console.warn('skip', url, res.status); continue; }
    await writeFile(path.join(OUT, name), Buffer.from(await res.arrayBuffer()));
    src = src.replaceAll(url, `/src/assets/images/remote/${name}`);
    console.log('saved', name);
  }
  await writeFile(file, src);
}
console.log('Done.');
