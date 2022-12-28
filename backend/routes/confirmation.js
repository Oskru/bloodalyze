const router = require('express').Router();
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWTEMAILKEY);

    await User.updateOne({ _id: decoded._id }, { confirmed: true });
  } catch (error) {
    res.status(500).send({ message: `Internal server error: ${error}` });
  }

  // Redirect to login page
  res.redirect('http://localhost:3000/login');
});

module.exports = router;
