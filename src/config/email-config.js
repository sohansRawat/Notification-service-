const nodemailer = require("nodemailer");
const{GMAIL_EMAIL,GMAIL_PASS}=require('./server-config')

const mailSender = nodemailer.createTransport({
    service:'Gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: GMAIL_EMAIL,
      pass: GMAIL_PASS
    }
  });

  module.exports=mailSender