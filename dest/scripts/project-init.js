"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectInit = void 0;

var _crossSpawn = _interopRequireDefault(require("cross-spawn"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var projectInit = function projectInit(projectName, settingsJson) {
  var template = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'hot-reload';

  var templatePath = _path["default"].join(__dirname, '..', 'template', template);

  var distPath = _path["default"].join('.', projectName);

  if (!_fsExtra["default"].existsSync(distPath)) {
    _fsExtra["default"].copySync(templatePath, distPath);

    var settingsFilePath = _path["default"].join(distPath, 'playcanvas.json');

    _fsExtra["default"].writeFileSync(settingsFilePath, JSON.stringify(settingsJson), 'utf8');

    var packageJson = _path["default"].join(distPath, 'package.json');

    if (_fsExtra["default"].existsSync(packageJson)) {
      (0, _crossSpawn["default"])('npm', ['install', '--prefix', distPath], {
        stdio: 'inherit'
      });
    }
  } else {
    console.log('Project already exists');
  }
};

exports.projectInit = projectInit;