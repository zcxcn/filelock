const Locker = require('./index.js');
const path = require('path');
const assert = require('assert')

let locker = new Locker(path.resolve(__dirname, './demo.lock'), 1000 * 3);
locker.lock();
locker
	.waitUntilUnlock()
	.then(function() {
		//dosth
	})

console.log(locker.isLocked())
// locker.unlock()
setTimeout(() => {
	console.log(locker.isLocked())
	assert(locker.isLocked() === true)
}, 2000);
setTimeout(() => {
	console.log(locker.isLocked())
	assert(locker.isLocked() === false)
}, 4000);
