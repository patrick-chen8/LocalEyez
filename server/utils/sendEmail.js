const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
    try {
        console.log(email)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: Number(465),
            secure: Boolean(true),
            auth: {
                user: 'c7se2022@gmail.com',
                pass: 'sihnbnenuimiffvk'
            }
        });

        await transporter.sendMail({
            from: 'c7se2022@gmail.com',
            to: email,
            subject: subject,
            text: text
        });
        console.log("Email sent successfully")
    } catch (error) {
        console.log("Email not sent");
        console.log(error);
    }
}