import 'dotenv/config';
import nodemailer from 'nodemailer';
import sgTransport  from 'nodemailer-sendgrid-transport';

const options = {
  auth: {
      api_key: process.env.SENDGRID_API_KEY
  }
}

const user = process.env.SUPPORT_EMAIL_OLD;
const pass = process.env.SUPPORT_PASS;

// const transport = nodemailer.createTransport({
//   //service: "gmail",
//   host: "smtp.ethereal.email",
//     port: 587,
//     secure: false,
//   auth: {
//     user: user,
//     pass: pass,
//   },
// });
const transport = nodemailer.createTransport(sgTransport(options));

export const sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log('transport',name, email, confirmationCode, user);
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8081/confirm/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};
