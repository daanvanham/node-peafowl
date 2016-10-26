'use strict';

const Lab = require('lab'),
	Code = require('code'),
	lab = exports.lab = Lab.script(),
	config = require('lib/index');

lab.experiment('Config', () => {
	lab.experiment(':get', () => {
		lab.test('should find the key if it exists', (done) => {
			Code.expect(config.get('name')).to.equal('Peafowl');

			done();
		});

		lab.test('should find nested config', (done) => {
			Code.expect(config.get('path/to/nested')).to.equal('thingy');

			done();
		});

		lab.test('should throw Error when it can\'t find the config', (done) => {
			try {
				config.get('does/not/exist');
			}
			catch (e) {
				Code.expect(e).to.be.an.object();

				done();
			}
		});
	});

	lab.experiment(':set', () => {
		lab.test('should set config', (done) => {
			config.set('test', 'example');
			Code.expect(config.get('test')).to.equal('example');

			done();
		});

		lab.test('should set nested config', (done) => {
			config.set('path/to/config', 'example');
			Code.expect(config.get('path/to/config')).to.equal('example');

			done();
		});

		lab.test('should be able to add to existing config', (done) => {
			config.set('manifest/test', 'example');
			Code.expect(config.get('manifest/test')).to.equal('example');

			done();
		});
	});
});
