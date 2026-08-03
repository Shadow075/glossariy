const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// The last term (id:448) ends with:
// example: "Злоупотребление диссоциативами для достижения изменённого состояния сознания."\r\n    }\r\n];\r\n
// We need to change }  to },  and insert the new term before ];

const anchor = 'example: "Злоупотребление диссоциативами для достижения изменённого состояния сознания."\r\n    }\r\n];';

if (!html.includes(anchor)) {
    console.log('ERROR: anchor not found');
    // Try \n only
    const anchor2 = 'example: "Злоупотребление диссоциативами для достижения изменённого состояния сознания."\n    }\n];';
    if (html.includes(anchor2)) {
        console.log('Found with LF only');
    } else {
        process.exit(1);
    }
}

const newEntry = `    {
        id: 449,
        term: "Агитация",
        category: "Политология",
        shortDef: "Целенаправленное распространение идей для влияния на общественное мнение.",
        longDef: "Систематическое распространение политических, идеологических или иных идей с целью формирования определённых взглядов и побуждения к действию. Может проявляться в виде митингов, листовок, агитационных материалов и онлайн-кампаний. В экстремистском контексте используется для вербовки и радикализации.",
        related: ["Пропаганда", "Радикализация", "Экстремизм"],
        example: "Распространение агитационных листовок, призывающих к насилию против отдельных групп населения."
    }`;

// Replace the closing }  (no comma) with },  + new term + }
const replacement = `example: "Злоупотребление диссоциативами для достижения изменённого состояния сознания."\r\n    },\r\n${newEntry}\r\n];`;

html = html.replace(anchor, replacement);
fs.writeFileSync('index.html', html);
console.log('SUCCESS: Агитация (ID 449) added correctly!');

// Verify
const allIds = html.match(/id: \d+/g);
console.log('Total IDs:', allIds ? allIds.length : 0);
console.log('Contains Агитация:', html.includes('term: "Агитация"'));
console.log('Category Политология:', html.includes('category: "Политология"'));
