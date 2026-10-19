import { mkdir, copyFile, stat } from 'node:fs/promises';
import sharp from 'sharp';

const source = process.argv[2];
if (!source) throw new Error('Provide the generated original PNG path.');
await mkdir('public/images', { recursive: true });
await sharp(source).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile('public/images/anime-sky.webp');
await sharp(source).resize(750, 1200, { fit: 'cover', position: 'centre' }).webp({ quality: 82, effort: 6 }).toFile('public/images/anime-sky-mobile.webp');
await copyFile(source, '../anime-background-original.png');
for (const name of ['anime-sky.webp', 'anime-sky-mobile.webp']) {
  console.log(`${name}: ${(await stat(`public/images/${name}`)).size} bytes`);
}
