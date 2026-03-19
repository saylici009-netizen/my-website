const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const loginStart = html.indexOf('const LoginPage = ({ onLogin, onRegister, user, registerError, onForgotPassword }) => {');
const loginEnd = html.indexOf('};', html.indexOf('</form>', loginStart)) + 2;

const adminStart = html.indexOf('const AdminPage = ({ users = [] }) => {');
const adminEndStr = '        // --- Email Backend Configuration ---';
const adminEnd = html.indexOf(adminEndStr);

const adminComponentStr = fs.readFileSync('admin.jsx', 'utf8').split('\n').map(l => '        ' + l).join('\n') + '\n';
const loginComponentStr = fs.readFileSync('login.jsx', 'utf8').split('\n').map(l => '        ' + l).join('\n') + '\n';

// We replace Admin first, because it's earlier in the file to not mess up indices
let newHtml = html.substring(0, adminStart) + adminComponentStr + html.substring(adminEnd - '\n'.length); // minus \n before comment
const newLoginStart = newHtml.indexOf('const LoginPage = ({ onLogin, onRegister, user, registerError, onForgotPassword }) => {');
const newLoginEnd = newHtml.indexOf('};', newHtml.indexOf('</form>', newLoginStart)) + 2;

newHtml = newHtml.substring(0, newLoginStart) + loginComponentStr + newHtml.substring(newLoginEnd);

fs.writeFileSync('index.html', newHtml);
console.log('Successfully replaced both components.');
