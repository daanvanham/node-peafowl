const map = new WeakMap();

class Config {
	constructor() {
		map.set(this, require(`${__dirname}/../config/${this.getEnvironment()}.json`));
	}

	getEnvironment() {
		return process.env.NODE_ENV || 'development';
	}

	get(path) {
		let obj = map.get(this);

		path.split('/').forEach((key) => {
			if (key in obj) {
				return (obj = obj[key]);
			}

			throw new Error(`Trying to get "${path}" but key "${key}" was not found`);
		});

		return obj;
	}

	set(path, value) {
		let keys = path.split('/'),
			last = keys.pop(),
			obj = map.get(this);

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
