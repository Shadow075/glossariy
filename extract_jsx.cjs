const fs = require('fs');

const babelCode = fs.readFileSync('index.html', 'utf-8').split('<script type="text/babel">')[1].split('</script>')[0];
fs.writeFileSync('temp.jsx', babelCode);
console.log('Saved temp.jsx');
