'use strict';
const nodemailer = require('nodemailer');
const logger = require('../logger');

exports.sendMail = async user => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const info = await transporter.sendMail({
    from: '"WAlbums Admin" <admin@walbums.com>',
    to: user.mail,
    subject: 'Welcome to WAlbums',
    text: 'Welcome to WAlbums',
    html: '<b>Welcome to WAlbums</b>'
  });

  logger.info('Message sent: %s', info.messageId);
  logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
