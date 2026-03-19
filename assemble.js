const fs = require('fs');

try {
    // Read files
    const html = fs.readFileSync('index.html', 'utf8');
    const tempJsx = fs.readFileSync('temp.jsx', 'utf8');
    const adminJsx = fs.readFileSync('admin.jsx', 'utf8');
    const loginJsx = fs.readFileSync('login.jsx', 'utf8');

    // Extract HTML header (everything before <script type="text/babel"> inclusive)
    const scriptStartTag = '<script type="text/babel">';
    const htmlHeader = html.substring(0, html.indexOf(scriptStartTag) + scriptStartTag.length) + '\n';

    // Extract HTML footer (everything after </script>)
    const scriptEndTag = '</script>';
    const htmlFooter = '\n    ' + scriptEndTag + '\n</body>\n</html>\n';

    // Replace AdminPage in temp.jsx
    let modifiedJsx = tempJsx;

    // Replace AdminPage: from "const AdminPage =" to "// --- Email Backend Configuration ---" (exclusive)
    const adminStart = modifiedJsx.indexOf('const AdminPage = ({ users = [] }) => {');
    const adminEnd = modifiedJsx.indexOf('        // --- Email Backend Configuration ---');
    if (adminStart !== -1 && adminEnd !== -1) {
        modifiedJsx = modifiedJsx.substring(0, adminStart) + adminJsx.split('\n').map(l => '        ' + l).join('\n') + '\n' + modifiedJsx.substring(adminEnd);
    } else {
        console.error('Could not find AdminPage bounds.');
    }

    // Replace LoginPage: from "const LoginPage =" to "const VerifyPage =" (exclusive)
    const loginStart = modifiedJsx.indexOf('const LoginPage = ({ onLogin, onRegister, user, registerError, onForgotPassword }) => {');
    let loginEnd = modifiedJsx.indexOf('        const VerifyPage = ({ user, onVerify, onResendOtp }) => {');
    if (loginStart !== -1 && loginEnd !== -1) {
        modifiedJsx = modifiedJsx.substring(0, loginStart) + loginJsx.split('\n').map(l => '        ' + l).join('\n') + '\n\n' + modifiedJsx.substring(loginEnd);
    } else {
        console.error('Could not find LoginPage bounds.');
    }

    // Write the combined output to index.html
    const finalHtml = htmlHeader + modifiedJsx + htmlFooter;
    fs.writeFileSync('index.html', finalHtml);
    console.log('Successfully re-assembled index.html. Total length:', finalHtml.length);

} catch (e) {
    console.error(e);
}
