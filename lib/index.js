'use strict';

const fs = require('fs');

let getEnvironment = () => {
		return process.env.NODE_ENV || 'development';
	},
	settings;

class Config {
	constructor() {
		settings = JSON.parse(fs.readFileSync('config/' + getEnvironment() + '.json', 'utf8'));
	}

	get(path) {
		let obj = settings;

		path.split('/').forEach((key) => {
			if (key in obj) {
				return (obj = obj[key]);
			}

			throw new Error('Trying to get "' + path + '" but key "' + key + '" was not found');
		});

		return obj;
	}

	set(path, value) {
		let keys = path.split('/'),
			last = keys.pop(),
			obj = settings;

		keys.forEach((key) => {
			if (key in obj) {
				return (obj = obj[key]);
			}

			return (obj = obj[key] = {});
		});

		obj[last] = value;

		return this;
	}
}

module.exports = new Config();
