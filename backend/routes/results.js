const router = require('express').Router();
const { Result, validate } = require('../models/result');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

// Create new result for user with given username
router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const result = await Result.findOne({
      testDate: req.body.testDate,
      testName: req.body.testName,
      elements: req.body.elements,
    });

    if (result)
      return res
        .status(409)
        .send({ message: 'Result with given data already exist!' });

    // Verify token
    const decoded = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.JWTPRIVATEKEY
    );
    if (!decoded) return res.status(401).send({ message: 'Invalid token!' });

    // Find user with decoded _id
    const userAuthor = await User.findOne({ _id: decoded._id });
    if (!userAuthor)
      return res
        .status(404)
        .send({ message: 'User with given _id not found!' });

    // Make result author to be the user _id with given username
    const readyResult = await new Result({
      ...req.body,
      author: userAuthor._id,
    }).save();

    // Push result _id to user results array
    await User.findOneAndUpdate(
      { _id: userAuthor._id },
      { $push: { results: readyResult._id } }
    );
    res.status(201).send({ message: 'Result created successfully' });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Internal server error: ${error.message}` });
  }
});

module.exports = router;
