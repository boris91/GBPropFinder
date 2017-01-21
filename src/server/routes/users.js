const express = require('express');
const router = express.Router();

/* GET users listing. */
const getUsers = (req, res, next) => {
	res.send('respond with a resource');
};
router.get('/', getUsers);

module.exports = router;
