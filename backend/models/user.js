const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'result' }],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '7d',
  });
  return token;
};

const User = mongoose.model('user', userSchema);

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 0,
};

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label('Username'),
    email: Joi.string().email().required().label('Email'),
    firstName: Joi.string().required().label('First name'),
    lastName: Joi.string().required().label('Last name'),
    password: passwordComplexity(complexityOptions)
      .required()
      .label('Password'),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
