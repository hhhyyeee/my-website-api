const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use('/public', express.static('./api/help'));
require('dotenv').config();
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true
}

// setting middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions));
app.use(cookieParser());

// router
// app.use('/api/cinema', require('./api/routes/cinema').cinema);
app.use('/api/post', require('./api/routes/base').base);
app.use('/api/dev', require('./api/routes/dev').dev);
app.use('/api/film', require('./api/routes/film').film);
app.use('/api/category', require('./api/routes/category').category);

app.listen(3030, () => {
	console.log('Example app listening on port 3030!');
});

app.get("/", (req, res) => {
	res.sendFile("cineAPI.html", {root: "api/help"});
})

module.exports = app;