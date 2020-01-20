const { check } = require('express-validator/check');

export function createValidation() {
  return [
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
}
