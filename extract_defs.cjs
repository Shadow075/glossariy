const fs = require('fs');

const termsToFind = [
  "Аддиктивное поведение", "Акцентуация характера", "Андроцентризм", "Афроцентризм",
  "Булимия", "Банворд", "Гомофобия", "Геронтофобия", "Гиноцентризм", "Гендерцид",
  "Деанонимизация", "Дисморфофобия", "Исламизация", "Кибертравля", "Линчевание",
  "Лукизм", "Менсплейнинг", "Мизандрия", "Мизогиния", "Моббинг", "Мизопедия",
  "Славянофобия", "Панславизм", "Сниффинг", "Таргетинг", "Трансфобия", "Флейминг",
  "Харассмент", "Лесбофобия", "Христианизация"
];

const docxText = fs.readFileSync('docx_text.txt', 'utf-8');
const lines = docxText.split('\n');

const foundTerms = [];

for (const term of termsToFind) {
  const regex = new RegExp(`^\\s*${term}\\s*[-—–]+(.*)`, 'i');
  const regex2 = new RegExp(`^\\s*${term}\\s+(.*)`, 'i');
  
  let match = null;
  for (const line of lines) {
    if (line.match(regex)) {
      match = line;
      break;
    } else if (line.match(regex2)) {
      // make sure it's not just a partial match
      if (line.toLowerCase().startsWith(term.toLowerCase())) {
         match = line;
         break;
      }
    }
  }
  
  if (match) {
    foundTerms.push({ term, def: match.replace(new RegExp(`^\\s*${term}\\s*[-—–]*\\s*`, 'i'), '').trim() });
  } else {
    // try to find just the term somewhere at the start of the line
    const altRegex = new RegExp(`^\\s*${term}`, 'i');
    const altLine = lines.find(l => altRegex.test(l));
    if (altLine) {
        foundTerms.push({ term, def: altLine.replace(new RegExp(`^\\s*${term}\\s*[-—–]*\\s*`, 'i'), '').trim() });
    } else {
        foundTerms.push({ term, def: "NOT FOUND" });
    }
  }
}

console.log(JSON.stringify(foundTerms, null, 2));
