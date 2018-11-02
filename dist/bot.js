'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DogeBot = undefined;

var _messageHandler = require('./message-handler');

var _clientProcessor = require('./client-processor');

var _config = require('./config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DogeBot = function DogeBot() {
  _classCallCheck(this, DogeBot);

  this.client = (0, _clientProcessor.processClient)(_config.config.token);
  this.messageHandler = _messageHandler.messageHandler;
};

exports.DogeBot = DogeBot;