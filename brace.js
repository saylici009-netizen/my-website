const fs = require('fs');

const text = fs.readFileSync('index.html', 'utf8');
const scriptMatch = text.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
const code = scriptMatch[1];

let stack = [];
let lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        const c = lines[i][j];
        if (c === '{' || c === '[' || c === '(') {
            stack.push({ char: c, line: i + 1 });
        } else if (c === '}' || c === ']' || c === ')') {
            if (stack.length === 0) {
                console.log(`Extra ${c} at line ${i + 1}`);
                process.exit(1);
            }
            const last = stack.pop();
            const pairs = { '}': '{', ']': '[', ')': '(' };
            if (last.char !== pairs[c]) {
                console.log(`Mismatch at line ${i + 1}: found ${c}, expected match for ${last.char} from line ${last.line}`);
                process.exit(1);
            }
        }
    }
}
if (stack.length > 0) {
    console.log(`Unclosed ${stack[stack.length - 1].char} from line ${stack[stack.length - 1].line}`);
} else {
    console.log("Braces match exactly!");
}
