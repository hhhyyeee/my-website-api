const express = require('express');
const router = express.Router();
const db = require('../database/config');

router.get('/welcome', (req, res) => { // root page
	res.send('Testing... Comment\n');
});

router.get('/', (req, res) => { // retrieve every rows
	db.query("SELECT * FROM Comment", (err, rows) => {
		if (!err) {
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
	db.query("SELECT * from Comment WHERE id = " + id, (err, rows) => {
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

router.delete('/:id', (req, res) => { // delete one row
	console.log(req.params.id);
	const id = parseInt(req.params.id, 10);
	db.query("DELETE FROM Comment WHERE id = " + id, (err, rows) => {
		if (!err) {
			console.log("Comment deleted");
			return res.json(rows);
		} else {
			console.log(`query error : ${err}`);
			return res.json(err);
		}
	});
})

router.post('/', (req, res) => { // create one (body param: title, year, director, actors, country)
	let newid;
	db.query("SELECT * FROM Comment ORDER BY id DESC LIMIT 1", (err, rows) => {
		if (!err) {
			newid = rows[0].id + 1;
			const nickname = req.body.nickname || '';
			if (!nickname.length) {
				return res.status(400).json({error: 'Empty Nickname'});
			}
			const content = req.body.content || '';
			if (!content.length) {
				return res.status(400).json({error: 'Empty Content'});
			}
			
			console.log("id: " + newid + ", nickname: " + nickname + ", content: " + content);
			let sql = "INSERT INTO Comment (id, nickname, content) VALUES ?";
			let values = [
				[newid, nickname, content],
			];
			db.query(sql, [values], (err, result) => {
				if (err) throw err;
				console.log("Number of records inserted: " + result.affectedRows);
			});
			const newComment = {
				id: newid,
				nickname: nickname,
				content: content
			};
			return res.json(newComment);
		} else {
			console.log(`query error : ${err}`);
			return res.status(400).json({error: "Retrieve Error"});
		}
	});
})

module.exports.comment = router;