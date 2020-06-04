const express = require('express');
const router = express.Router();
const db = require('../database/config');

router.get('/', (req, res) => {
	db.query("select id, title, author, category, date from Post", (err, rows) => {
        if (!err) {
            console.log("All Posts Retrieved!");
            return res.json(rows);
        } else {
            console.log(`query error : ${err}`);
            return res.json(err);
        }
    });
})

router.get('/:category', (req, res) => {
	console.log(req.params.category);
    // const category = String(req.params.category);
    const category = req.params.category;
	db.query("select id, title, author, date from Post where category = ?", category, (err, rows) => {
        if (!err) {
            console.log("Posts in " + category + " Retrieved!");
            return res.json(rows);
        } else {
            console.log(`query error : ${err}`);
            return res.json(err);
        }
    });
})

module.exports.category = router;