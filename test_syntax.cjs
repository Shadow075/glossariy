const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');
let js = html.split('<script type="text/babel">')[1].split('</script>')[0];
// Since babel includes JSX, standard node JS parser might fail if we don't mock JSX, but actually this script checks the JS array part.
// Wait, Node JS won't parse JSX syntax (`<MegaInfiniteApp />`).
// Let's just check if we can JSON.parse the defaultTerms array.
let arrayMatch = js.match(/const defaultTerms = (\[[\s\S]*?\]);/);
if (arrayMatch) {
    let arrayStr = arrayMatch[1];
    // It's a JS object literal string. It might have unquoted keys?
    // Actually, keys like id:, term: don't have quotes. We can't JSON parse.
    // Let's evaluate it instead to see if it throws.
    try {
        eval('var arr = ' + arrayStr);
        console.log("Array evaluated successfully, length:", arr.length);
    } catch(e) {
        console.error("Syntax Error in defaultTerms array:", e);
    }
} else {
    console.log("Could not find defaultTerms array.");
}

// And codeNumbers array
let codeMatch = js.match(/const codeNumbers = (\[[\s\S]*?\]);/);
if (codeMatch) {
    try {
        eval('var codes = ' + codeMatch[1]);
        console.log("codeNumbers evaluated successfully, length:", codes.length);
    } catch(e) {
        console.error("Syntax Error in codeNumbers array:", e);
    }
}
