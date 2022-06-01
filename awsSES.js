import 'dotenv/config';
import AWS from 'aws-sdk';


const SES_CONFIG = {
  accessKeyId: process.env.AWS_SES_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET,
  region: process.env.AWS_SES_REGION
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let sendEmail = (name, recipientEmail, code) => {
  let params = {
    Source: process.env.AWS_SES_SOURCE,
    Destination: {
      ToAddresses: [
        recipientEmail
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:8081/confirm/${code}> Click here</a>
          </div>`
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Hello, ${name}!`,
      }
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

export const sendConfirmationEmail = (name, email, confirmationCode) => {
  sendEmail(name, email, confirmationCode).then((resp) => {
    console.log('Message sent: ' + resp);
  }).catch((error) =>{
      return console.log(error);
  }
)};
