 const fs = require('fs');
 const fsExtra = require('fs-extra');
 const util = require('../util');


 class Locker {
 	constructor(path, timeout) {
 		this.path = path;
 		this.timeout = timeout;
 	}
 	lock() {
 		fs.writeFileSync(this.path, new Date().getTime());
 	}
 	unlock() {
 		fsExtra.removeSync(this.path);
 	}
 	isLocked() {
 		if (!fs.existsSync(this.path)) {
 			return false;
 		}
 		if (typeof this.timeout !== 'undefined') {
 			return !this._isTimeout();
 		}
 		return true;
 	}
 	waitUntilUnlock() {
 		let t = this;
 		return new Promise(function(resolve, reject) {
 			wait(resolve, reject)
 			function wait(resolve, reject) {
 				try {
 					if (!t.isLocked()) {
 						resolve();
 					} else {
 						log('waiting');
 						return util.sleep(1000)
 							.then(function() {
 								wait(resolve, reject)
 							});
 					}
 				} catch (e) {
 					console.info(e);
 					console.error('wait error');
 				}
 			}
 		})
 	}
 	_isTimeout() {
 		let content = parseInt(fs.readFileSync(this.path), 10);
 		let nowTime = new Date().getTime();
 		let result = (nowTime - content) > this.timeout;
 		if (result) {
 			//超时就删掉
 			this.unlock();
 		}
 		return result;
 	}
 }

 module.exports = Locker
