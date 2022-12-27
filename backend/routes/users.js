const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const userEmail = await User.findOne({ email: req.body.email });

    if (userEmail)
      return res
        .status(409)
        .send({ message: 'User with given email already exist!' });

    const userName = await User.findOne({ username: req.body.username });

    if (userName)
      return res
        .status(409)
        .send({ message: 'User with given username already exist!' });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Internal server error: ${error.message}` });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0)
      return res.status(404).send({ message: 'No users found!' });
    res.status(200).send({ data: users, message: 'Users found successfully' });
  } catch (error) {
    res.status(500).send({ message: `Internal server error` });
  }
});

router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user)
      return res
        .status(404)
        .send({ message: 'User with given username not found!' });
    res.status(200).send({ data: user, message: 'User found successfully' });
  } catch (error) {
    res.status(500).send({ message: `Internal server error` });
  }
});

module.exports = router;
