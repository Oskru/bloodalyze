const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { restart } = require('nodemon');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require('../email');

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(401).send({ message: 'Invalid Email or Password' });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: 'Invalid Email or Password' });

    if (!user.confirmed) {
      // Send email confirmation link again
      jwt.sign(
        { _id: user._id },
        process.env.JWTEMAILKEY,
        { expiresIn: '1d' },
        (error, token) => {
          if (error) {
            return res.status(400).send({ message: error });
          }
          sendConfirmationEmail(req.body.email, token);
        }
      );
      return res.status(401).send({ message: 'Please confirm your email' });
    }

    const token = user.generateAuthToken();
    res.status(200).send({
      data: { token: token, _id: this.id },
      message: 'Logged in successfully',
    });
  } catch (error) {
    res.status(500).send({ message: `Internal server error: ${error}` });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  });
  return schema.validate(data);
};
module.exports = router;
