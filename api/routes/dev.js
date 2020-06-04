const express = require('express');
const router = express.Router();
const db = require('../database/config');

router.get('/welcome', (req, res) => { // root page
	res.send('Dev posts\n');
});

router.get('/', (req, res) => { // retrieve every rows
	db.query("select id, title, author, category from Post where category = Dev", (err, rows) => {
		if (!err) {
			console.log("Dev Posts Retrieved!");
			return res.json(rows);
		} else {
			console.log(`query error : ${err}`);
			return res.status(400).json({error: "Retrieve Error"});
		}
	});
})

router.get('/latest', (req, res) => { // retrieve every rows
	db.query("select id, title, author, category from Post where category = Dev limit 5", (err, rows) => {
		if (!err) {
			console.log("Latest Dev Posts Retrieved!");
			return res.json(rows);
		} else {
			console.log(`query error : ${err}`);
			return res.status(400).json({error: "Retrieve Error"});
		}
	});
})

router.get('/:id', (req, res) => { // retrieve one row
	console.log(req.params.id);
	const id = parseInt(req.params.id, 10);
	db.query("SELECT * FROM Post WHERE id = " + id, (err, rows) => {
		if (!err) {
			console.log(rows.length);
			if (rows.length == 0) {
				return res.status(404).json({error: "ID unavailable"});
			} else {
				console.log(rows);
				return res.json(rows);
			}
		} else {
			console.log(`query error : ${err}`);
			return res.json(err);
		}
	});
})

module.exports.dev = router;