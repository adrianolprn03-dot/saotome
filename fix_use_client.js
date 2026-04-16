const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walk(full));
    else if (e.name.endsWith('.tsx') || e.name.endsWith('.ts')) files.push(full);
  }
  return files;
}

const allFiles = walk('src/app');
let fixed = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  // Remove BOM
  content = content.replace(/^\uFEFF/, '');

  // Check if file has 'use client'
  if (!content.includes('"use client"') && !content.includes("'use client'")) continue;

  // Check first non-empty line
  const lines = content.split('\n');
  const firstNonEmpty = (lines.find(l => l.trim() !== '') || '').trim().replace(/\r/, '');
  if (firstNonEmpty === '"use client";' || firstNonEmpty === "'use client';") continue;

  // Remove 'use client' directive from wherever it is (including BOM variants)
  let newContent = content.replace(/^\s*[\u{FEFF}]?"use client";?\r?\n?/mu, '');
  newContent = newContent.replace(/^\s*[\u{FEFF}]?'use client';?\r?\n?/mu, '');

  // Add at very top
  newContent = '"use client";\n' + newContent.trimStart();

  fs.writeFileSync(file, newContent, 'utf8');
  console.log('FIXED:', file);
  fixed++;
}
console.log('\nTotal fixed:', fixed, 'files');
