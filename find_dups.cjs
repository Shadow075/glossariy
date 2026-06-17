const fs = require('fs');

const htmlContent = fs.readFileSync('index.html', 'utf-8');

// Find the defaultTerms array
const match = htmlContent.match(/const defaultTerms = \[\s*([\s\S]*?)\s*\];/);
if (match) {
    const termsStr = match[1];
    const lines = termsStr.split('\n');
    const termNames = [];
    const duplicates = [];

    lines.forEach(line => {
        const termMatch = line.match(/term:\s*["']([^"']+)["']/);
        if (termMatch) {
            const name = termMatch[1];
            if (termNames.includes(name)) {
                duplicates.push(name);
            } else {
                termNames.push(name);
            }
        }
    });

    console.log('Duplicates found:', duplicates);
} else {
    console.log('Could not find defaultTerms');
}
