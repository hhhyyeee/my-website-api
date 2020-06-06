const express = require('express');
const router = express.Router();
const db = require('../database/config');

router.get('/welcome', (req, res) => { // root page
	res.send('Testing... Base (Post)\n');
});

router.get('/all', (req, res) => { // retrieve every rows
	db.query("SELECT `id`, `title`, `author`, `date` FROM Post", (err, rows) => {
		if (!err) {
			console.log("All Posts Retrieved!");
			return res.json(rows);
		} else {
			console.log(`query error : ${err}`);
			return res.status(400).json({error: "Retrieve Error"});
		}
	});
})

router.get('/latest', (req, res) => { // retrieve every rows
	db.query("SELECT `id`, `title`, `author`, `date` FROM Post limit 5", (err, rows) => {
		if (!err) {
            console.log("Latest Posts Retrieved!");
			return res.json(rows);
		} else {
			console.log(`query error : ${err}`);
			return res.status(400).json({error: "Retrieve Error"});
		}
	});
})

router.get('/:id', (req, res) => {
    console.log(req.params.id);
	const id = parseInt(req.params.id, 10);
	db.query("SELECT * FROM Post where id = " + id, (err, rows) => {
		if (!err) {
			console.log("Single Post Retrieved!");
			return res.json(rows);
		} else {
			console.log(`query error : ${err}`);
			return res.status(400).json({error: "Retrieve Error"});
		}
	});
})

module.exports.base = router;