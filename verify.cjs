const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf-8');

const agitIdx = h.indexOf('term: "Агитация"');
const afterAgit = h.substring(agitIdx, agitIdx + 700);
console.log('Full Агитация block:');
console.log(afterAgit);
