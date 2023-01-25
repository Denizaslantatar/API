// prettier-ignore
const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const levels = JSON.parse(
	fs.readFileSync(`${__dirname}/data/levels-data.json`)
);

app.get('/levels', (req, res) => {
	res.status(200).json({
		status: 'success',
		results: levels.length,
		data: {
			levels,
		},
	});
});

app.get('/levels/:id', (req, res) => {
	console.log(req.params);
	const id = req.params.id * 1;
	if (id > levels.length) {
		return res.status(404).json({
			status: 'Fail',
			message: 'Invalid ID',
		});
	}
	const level = levels.find((el) => el.id === id);
	res.status(200).json({
		status: 'success',
		data: {
			level,
		},
	});
});

const port = 5000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
