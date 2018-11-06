'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DogeBot = undefined;

var _messageHandler = require('./processors/message-handler');

var _clientProcessor = require('./processors/client-processor');

var _config = require('./config');

var _userService = require('./service/user-service');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DogeBot = class DogeBot {
  constructor() {
    this.client = (0, _clientProcessor.processClient)(_config.config.token);
    this.messageHandler = _messageHandler.messageHandler;
    this.services = {
      users: new _userService2.default()
    };
  }
};

exports.DogeBot = DogeBot;