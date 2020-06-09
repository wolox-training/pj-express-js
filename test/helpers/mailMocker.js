const nodemailer = require('nodemailer');

exports.mockMailSending = () => {
  jest.mock('nodemailer');
  const sendMailMock = jest.fn().mockResolvedValue({});
  nodemailer.createTransport = jest.fn().mockReturnValue({ sendMail: sendMailMock });
  return sendMailMock;
};
