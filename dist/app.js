'use strict';

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_config.prefix);
console.log(_config.token);
var client = processClient();

client.login(_config.token);

client.on('ready', function () {
  console.log('DogeBot, operational.');
});

function processClient() {
  var client = new _discord2.default.Client();
  var controllerFiles = _fs2.default.readdirSync('../src/controllers');
  client.commands = new _discord2.default.Collection();

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = controllerFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var file = _step.value;

      var controller = require('./controllers/' + file);
      client.commands.set(controller.name, controller);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return client;
}