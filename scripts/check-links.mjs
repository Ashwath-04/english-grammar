// Checks every internal link in the built site.
// Scans each .html file in dist/, collects every href and src that starts
// with "/", and fails if the target is not in dist/ as path, path/index.html
// or path.html. Run `npm run build` first.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));

if (!existsSync(dist)) {
	console.error('dist/ not found. Run `npm run build` first.');
	process.exit(1);
}

function htmlFiles(dir) {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) return htmlFiles(path);
		return name.endsWith('.html') ? [path] : [];
	});
}

function targetExists(url) {
	const path = decodeURIComponent(url.split('#')[0].split('?')[0]);
	if (path === '' || path === '/') return existsSync(join(dist, 'index.html'));
	const base = join(dist, path);
	return (
		(existsSync(base) && statSync(base).isFile()) ||
		existsSync(join(base, 'index.html')) ||
		existsSync(base.replace(/[\\/]$/, '') + '.html')
	);
}

const files = htmlFiles(dist);
const linkPattern = /\s(?:href|src)=["']?(\/[^"'\s>]*)/g;
const broken = [];
let checked = 0;

for (const file of files) {
	const html = readFileSync(file, 'utf8');
	for (const [, url] of html.matchAll(linkPattern)) {
		if (url.startsWith('//')) continue; // protocol-relative: an external link
		checked++;
		if (!targetExists(url)) broken.push(`${relative(dist, file)} → ${url}`);
	}
}

console.log(`Checked ${checked} internal links in ${files.length} HTML files.`);
if (broken.length) {
	console.error(`\n${broken.length} broken link(s):`);
	for (const line of broken) console.error(`  ${line}`);
	process.exit(1);
}
console.log('No broken links.');
