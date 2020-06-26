const nodemailer = require('nodemailer');

async function SendEmail(to, subject,content){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: 'thanhhai30091999@gmail.com',
          pass:  'Tdth13158'
        }
      });
      
      return transporter.sendMail({
        from:'thanhhai30091999@gmail.com',
        to: to,
        subject: subject,
        text: content,
      })
};

module.exports = {SendEmail};