// const nodemailer = require('nodemailer');

// exports.sendEmail = (username, email) => {
//      nodemailer.createTestAccount((err, account) => {


//         var transporter = nodemailer.createTransport({
//             service: 'Gmail',
//              auth: {
//                  user: 'trumpchange2@gmail.com',
//                  pass: '8~a8UH"Ju"m`8vY\\'
//              }
//         })
//             let mailOptions = {
//               from: '"TrumpChange" <trumpchange2@gmail.com>', // sender address
//               to: email, // list of receivers
//               subject: 'Welcome ' + username +  ' ✔', // Subject line
//               text: 'Hello' + username + '! Welcome to BeatBook!', // plain text body
//               html: `<b>Hello ${username}! Welcome to BeatBook!</b>` // html body
//             };
//             transporter.sendMail(mailOptions, (error, info) => {
//               if (error) {
//                   return console.log(error);
//               }
//               console.log('Message sent: %s', info.messageId);
//             })
//     })
// }






exports.notifyRequest = (username, email) => {
    nodemailer.createTestAccount((err, account) => {
          var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'trumpchange2@gmail.com',
                pass: '8~a8UH"Ju"m`8vY\\'
            }
          })
          let mailOptions = {
              from: '"TrumpChange" <trumpchange2@gmail.com>', // sender address
              to: email, // list of receivers
              subject: 'Welcome ' + username +  ' ✔', // Subject line
              text: 'Hello' + username + '! You have a New Request!', // plain text body
              html: `<b>Hello ${username}! You have a New Request!</b>` // html body
          }
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
          });
    })
  }
