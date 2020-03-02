const { check } = require('express-validator');

exports.createValidation = () => [
  check('firstName').exists(),
  check('lastName').exists(),
  check('password')
    .exists()
    .isLength({ min: 8 })
    .isAlphanumeric(),
  check('email')
    .exists()
    .isEmail()
    .matches(new RegExp(`@wolox(${['\\.com\\.ar', 'co', '\\.cl', '\\.mx'].join('|')})$`))
];
