'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var fsExtra = require('fs-extra');
var util = require('./util');

var Locker = function () {
  function Locker(path, timeout) {
    _classCallCheck(this, Locker);

    this.path = path;
    this.timeout = timeout;
  }

  _createClass(Locker, [{
    key: 'lock',
    value: function lock() {
      fs.writeFileSync(this.path, new Date().getTime());
    }
  }, {
    key: 'unlock',
    value: function unlock() {
      fsExtra.removeSync(this.path);
    }
  }, {
    key: 'isLocked',
    value: function isLocked() {
      if (!fs.existsSync(this.path)) {
        return false;
      }
      if (typeof this.timeout !== 'undefined') {
        return !this._isTimeout();
      }
      return true;
    }
  }, {
    key: 'waitUntilUnlock',
    value: function waitUntilUnlock() {
      var t = this;
      return new Promise(function (resolve, reject) {
        wait(resolve, reject);

        function wait(resolve, reject) {
          try {
            if (!t.isLocked()) {
              resolve();
            } else {
              // 	log('waiting');
              //
              return util.sleep(1000).then(function () {
                wait(resolve, reject);
              });
            }
          } catch (e) {
            console.info(e);
            console.error('wait error');
          }
        }
      });
    }
  }, {
    key: '_isTimeout',
    value: function _isTimeout() {
      var content = parseInt(fs.readFileSync(this.path), 10);
      var nowTime = new Date().getTime();
      var result = nowTime - content > this.timeout;
      if (result) {
        //超时就删掉
        this.unlock();
      }
      return result;
    }
  }]);

  return Locker;
}();

module.exports = Locker;