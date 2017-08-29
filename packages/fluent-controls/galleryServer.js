var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/SegMDL2.1.6.ttf', express.static(path.join(__dirname, 'static/fonts/SegMDL2.1.6.ttf')));
app.use('/SegMDL2.1.6.woff', express.static(path.join(__dirname, 'static/fonts/SegMDL2.1.6.woff')));
app.use('/normalize.css', express.static(path.join(__dirname, 'static/css/normalize.css')));

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function (err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Listening at http://localhost:3000');
});