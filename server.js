require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static HTML file from root
app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'code.html'));
});

// Setting up Nodemailer using App Passwords
// Requires Gmail and App Password in .env
// SMTP_EMAIL=your_email@gmail.com
// SMTP_PASSWORD=your_app_password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

app.post('/api/send-otp', async (req, res) => {
    const { email, name, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
        console.log(`Demo OTP for ${email}: ${otp}`);
        return res.status(503).json({ error: 'SMTP credentials not configured. Falling back to demo OTP.' });
    }

    const mailOptions = {
        from: `"Dr. Bile Eyewear" <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: 'Xaqiiji Account-kaaga (Verify Your Account)',
        html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #f8fafc;">
            <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #0f172a; margin: 0; font-family: 'Times New Roman', serif;">DR BILE</h1>
                <p style="color: #ec5b13; margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px;">PREMIUM EYEWEAR</p>
            </div>
            
            <div style="background-color: white; padding: 32px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <p style="color: #334155; font-size: 16px;">Hello ${name || 'Customer'},</p>
                <p style="color: #334155; font-size: 16px;">Waa kan koodkaaga xaqiijinta (Here is your verification code):</p>
                
                <div style="text-align: center; margin: 32px 0;">
                    <span style="display: inline-block; background-color: #f1f5f9; border: 2px solid #e2e8f0; color: #0f172a; font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 16px 32px; border-radius: 8px;">
                        ${otp}
                    </span>
                </div>
                
                <p style="color: #64748b; font-size: 14px; margin-bottom: 0;">If you didn't request this code, please ignore this email.</p>
            </div>
            
            <div style="text-align: center; margin-top: 24px; color: #94a3b8; font-size: 12px;">
                <p>© ${new Date().getFullYear()} Dr Bile Eyewear. All rights reserved.</p>
                <p>Hargeisa, Somaliland</p>
            </div>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ error: 'Failed to send OTP email', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Dr. Bile server running on http://localhost:${PORT}`);
    console.log(`Serving static files from ${__dirname}`);
});
