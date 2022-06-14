'use strict';

const fs = require('fs');

const indexContent = fs.readFileSync('/tmp/base-index.json', 'utf8');
const baseDir = '/Users/sebastianalvarez/recursos';

const updatedContent = JSON.parse(indexContent).reduce((acc, r, i) => {
  try {
    if (r.ignorar) return acc;

    const p = `${baseDir}/${r.nombre_archivo}`;
    fs.accessSync(p);

    const o = { id: i + 1, ...r };

    return acc.concat(o);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}, []);

fs.writeFileSync('/tmp/b.json', JSON.stringify(updatedContent, null, 4));
