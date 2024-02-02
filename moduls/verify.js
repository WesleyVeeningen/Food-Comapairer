const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

module.exports = async function donatieMail(info) {
  try {
    const data = await fs.promises.readFile('./views/mail/emailverify.ejs', 'utf-8');
    let htm = data.replace('[id]', info.userId).replace('[uuid]', info.link)

    var transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      },
    });

    await transporter.sendMail({
      from: `"Grafisch Lyceum Rotterdam" <${process.env.SMTP_USERNAME}>`,
      to: info.email, // Use info.donateurEmail instead of 'mail'
      subject: 'GLR Foto Expositie Donatie',
      html: htm,
    });

  } catch (error) {
    console.log(error);
  }
}
