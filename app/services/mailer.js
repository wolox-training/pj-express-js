'use strict';
const nodemailer = require('nodemailer');
const logger = require('../logger');
const config = require('../../config');

const transporter = nodemailer.createTransport({
  host: config.common.mailer.mailerHost,
  port: config.common.mailer.mailerPort,
  secure: false,
  auth: {
    user: config.common.mailer.user,
    pass: config.common.mailer.pass
  }
});

exports.sendMail = async user => {
  const info = await transporter.sendMail({
    from: `"WAlbums Admin" <${config.common.mailer.adminMail}>`,
    to: user.mail,
    subject: 'Welcome to WAlbums',
    text: 'Welcome to WAlbums',
    html: '<b>Welcome to WAlbums</b>'
  });

  logger.info('Message sent: %s', info.messageId);
  logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
