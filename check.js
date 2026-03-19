const fs = require('fs');
const { parse } = require('@babel/parser');

try {
    const html = fs.readFileSync('index.html', 'utf8');
    const scriptMatch = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
    const code = scriptMatch[1];

    parse(code, {
        sourceType: 'module',
        plugins: ['jsx']
    });
    console.log("No syntax errors found by Babel.");
} catch (e) {
    console.error("Syntax Error at line", e.loc?.line, "col", e.loc?.column);
    console.error(e.message);
}
