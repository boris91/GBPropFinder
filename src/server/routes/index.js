const express = require('express');

const router = express.Router();

/* GET root. */
const getRoot = (req, res, next) => {
	res.render('index', { title: 'Express' });
};
router.get('/', getRoot);

module.exports = router;
