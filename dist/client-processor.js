'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processClient = undefined;

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processClient = function processClient(token) {
  var client = new _discord2.default.Client();
  var controllerFiles = _fs2.default.readdirSync('../src/controllers');
  client.controllers = new _discord2.default.Collection();

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = controllerFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var file = _step.value;

      var controller = require('./controllers/' + file);
      client.controllers.set(controller.name, controller);
    }

    // Initialise DogeBot using config token
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

  client.login(token).catch(function (error) {
    return console.log('Failed: ' + error);
  });

  return client;
};

exports.processClient = processClient;