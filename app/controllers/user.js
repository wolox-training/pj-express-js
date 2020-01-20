const { validationResult } = require('express-validator');
const { User } = require('../models/user');

function create(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  return User.create(req.body)
    .then(user => res.status(500).json(user))
    .catch(error =>
      res.status(500).json({ status: 500, message: "Couldn't create user", error: error.message })
    );
}

export { create };
