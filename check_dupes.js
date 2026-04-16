const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walk(full));
    else if (e.name.match(/\.(tsx?|jsx?)$/)) files.push(full);
  }
  return files;
}

let issues = 0;
for (const file of walk('src')) {
  const content = fs.readFileSync(file, 'utf8');
  const imports = {};
  const lines = content.split('\n');
  for (const line of lines) {
    const m = line.match(/import\s+.*\s+from\s+['"](.+)['"]/);
    if (m) {
      const mod = m[1];
      imports[mod] = (imports[mod] || 0) + 1;
    }
  }
  const dupes = Object.entries(imports).filter(([,c]) => c > 1);
  if (dupes.length) {
    console.log('DUPE:', file);
    dupes.forEach(([m,c]) => console.log('  x'+c, m));
    issues++;
  }
}
console.log('Files with duplicate imports:', issues);
