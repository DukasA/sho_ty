const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '', //твой эмейл
        pass: '', //пароль от мейла
    },
});

let currentVerificationCode = "";

app.post('/send-verification-email', (req, res) => {
    const {
        email,
        code
    } = req.body;

    currentVerificationCode = code; // Store the code for later verification

    const mailOptions = {
        from: '', //твой эмейл
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('OK');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});