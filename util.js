require('colors')

global.info = console.info; // eslint-disable-line
global.success = function() {
    info((' √ ' + Array.prototype.join.call(arguments, ' ')).green);
};
global.error = function() {
    info((' X ' + Array.prototype.join.call(arguments, ' ')).red);
};
global.warn = function() {
    info((' ∆ ' + Array.prototype.join.call(arguments, ' ')).yellow);
};
global.log = function() {
    info('[信息] '.gray + Array.prototype.join.call(arguments, ' '));
};
global.logTime = function() {
    info(logSymbols.info + (' [' + moment().format('YY.MM.DD HH:mm:ss') + '] ').gray + Array.prototype.join.call(arguments, ' '));
};
global.logLinefeed = function() {
    info();
};
exports.sleep = function(timeout) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, timeout)
    })
}
