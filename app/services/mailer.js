'use strict';
const nodemailer = require('nodemailer');
const config = require('../../config');

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.common.mailer.mailerHost,
      port: config.common.mailer.mailerPort,
      secure: false,
      auth: {
        user: config.common.mailer.mailerUser,
        pass: config.common.mailer.mailerPass
      }
    });
  }
  return transporter;
};

exports.sendMail = async user => {
  await getTransporter().sendMail({
    from: `"WAlbums Admin" <${config.common.mailer.adminMail}>`,
    to: user.mail,
    subject: 'Welcome to WAlbums',
    text: 'Welcome to WAlbums',
    html: '<b>Welcome to WAlbums</b>'
  });
};
