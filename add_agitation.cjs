const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// New term to add
const agitatsiyaTerm = `
    {
        id: 449,
        term: "Агитация",
        category: "Политика",
        shortDef: "Целенаправленное распространение идей для влияния на общественное мнение.",
        longDef: "Систематическое распространение политических, идеологических или иных идей с целью формирования определённых взглядов и побуждения к действию. Может проявляться в виде митингов, листовок, агитационных материалов и онлайн-кампаний. В экстремистском контексте используется для вербовки и радикализации.",
        related: ["Пропаганда", "Радикализация", "Экстремизм"],
        example: "Распространение агитационных листовок, призывающих к насилию против отдельных групп населения."
    },`;

// Find the ID 448 block and everything until the closing },
const idStart = html.indexOf('id: 448,');
if (idStart === -1) {
    console.log('ERROR: id 448 not found');
    process.exit(1);
}

// From idStart, find the next '},\r\n    {' OR '};\n' pattern 
// to locate the end of the id:448 block
const searchFrom = idStart;
// Find the closing brace+comma after the id 448 block
// It ends with example: "..."\n    },
let pos = searchFrom;
let closingPos = -1;

// Search for the pattern: example: ...quote then },
const exampleStr = 'example:';
let exampleIdx = html.indexOf(exampleStr, pos);
while (exampleIdx !== -1) {
    // Get value after example:
    const afterExample = html.substring(exampleIdx);
    // Find the closing quote of example value
    const quoteStart = afterExample.indexOf('"');
    if (quoteStart !== -1) {
        const quoteEnd = afterExample.indexOf('"', quoteStart + 1);
        if (quoteEnd !== -1) {
            // After closing quote, look for },
            const afterQuote = afterExample.substring(quoteEnd + 1);
            const braceClose = afterQuote.search(/\s*\},/);
            if (braceClose !== -1) {
                closingPos = exampleIdx + quoteEnd + 1 + braceClose + afterQuote.match(/\s*\},/)[0].length;
                // Check if this is within our id:448 block (should be within 500 chars)
                if (closingPos - idStart < 700) {
                    console.log('Found closing position at:', closingPos);
                    console.log('Context:', JSON.stringify(html.substring(closingPos - 10, closingPos + 50)));
                    break;
                }
            }
        }
    }
    exampleIdx = html.indexOf(exampleStr, exampleIdx + 1);
}

if (closingPos === -1) {
    console.log('ERROR: could not find closing position');
    process.exit(1);
}

// Insert after the closing },
html = html.substring(0, closingPos) + agitatsiyaTerm + html.substring(closingPos);
fs.writeFileSync('index.html', html);
console.log('SUCCESS: Агитация (ID 449) added!');

// Verify count
const allIds = html.match(/id:\s*\d+/g);
console.log('Total IDs now:', allIds ? allIds.length : 0);
console.log('Contains Агитация:', html.includes('Агитация'));
