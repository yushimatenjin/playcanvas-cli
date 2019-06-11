"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

require("dotenv/config");

var _inquirer = _interopRequireDefault(require("inquirer"));

var _playcanvasNode = _interopRequireDefault(require("playcanvas-node"));

var _projectInit = require("./project-init");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var init =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var accessToken, questions, authenticate, _ref2, projectId, playcanvas, branches, branchChoices, branchAnswer, branchId, playcanvas2, remoteSecnes, scenesChoices, sceneAnswer, scenes, playcanvas3, remoteProjectName, pn, projectNameAnswer, projectName, remotePath, settingsJson;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            accessToken = process.env.PC_API_KEY;
            questions = [{
              type: 'input',
              name: 'projectId',
              message: "What's your project id https://playcanvas.com/project/"
            }];

            if (!accessToken) {
              authenticate = [{
                type: 'input',
                name: 'accessToken',
                message: "What's your accessToken"
              }];
              questions.unshift(authenticate);
            } else {}

            _context.next = 6;
            return _inquirer["default"].prompt(questions);

          case 6:
            _ref2 = _context.sent;
            projectId = _ref2.projectId;
            playcanvas = new _playcanvasNode["default"]({
              accessToken: accessToken,
              projectId: projectId
            });
            _context.next = 11;
            return playcanvas.listBranches();

          case 11:
            branches = _context.sent;
            branchChoices = branches.result.map(function (branch) {
              var id = branch.id,
                  name = branch.name;
              return {
                value: id,
                name: "".concat(name, " | ").concat(id)
              };
            });
            _context.next = 15;
            return _inquirer["default"].prompt([{
              type: 'list',
              name: 'selectedBranch',
              message: 'Please select use branche.',
              choices: branchChoices
            }]);

          case 15:
            branchAnswer = _context.sent;
            branchId = branchAnswer.selectedBranch;
            playcanvas2 = new _playcanvasNode["default"]({
              accessToken: accessToken,
              projectId: projectId,
              branchId: branchId
            });
            _context.next = 20;
            return playcanvas2.listScenes();

          case 20:
            remoteSecnes = _context.sent;
            scenesChoices = remoteSecnes.result.map(function (scene) {
              var id = scene.id,
                  name = scene.name;
              return {
                name: "".concat(name, " | ").concat(id, " "),
                value: id
              };
            });
            _context.next = 24;
            return _inquirer["default"].prompt([{
              type: 'list',
              name: 'selectedScenes',
              message: 'Please select use scenes.',
              choices: scenesChoices
            }]);

          case 24:
            sceneAnswer = _context.sent;
            scenes = sceneAnswer.selectedScenes;
            playcanvas3 = new _playcanvasNode["default"]({
              accessToken: accessToken,
              projectId: projectId,
              branchId: branchId,
              scenes: scenes
            });
            _context.prev = 27;
            _context.next = 30;
            return playcanvas3.getPrimaryApp();

          case 30:
            pn = _context.sent;
            remoteProjectName = pn.result[0].name;
            _context.next = 37;
            break;

          case 34:
            _context.prev = 34;
            _context.t0 = _context["catch"](27);
            remoteProjectName = 'my-app';

          case 37:
            _context.next = 39;
            return _inquirer["default"].prompt([{
              type: 'input',
              name: 'inputProjectName',
              message: 'Please input projectName',
              "default": remoteProjectName
            }, {
              type: 'input',
              name: 'remotePath',
              message: '',
              "default": 'dev'
            }]);

          case 39:
            projectNameAnswer = _context.sent;
            projectName = projectNameAnswer.inputProjectName;
            remotePath = projectNameAnswer.remotePath;
            settingsJson = {
              accessToken: accessToken,
              scenes: scenes,
              projectId: projectId,
              branchId: branchId,
              projectName: projectName,
              remotePath: remotePath
            };
            (0, _projectInit.projectInit)(projectName, settingsJson);
            _context.next = 49;
            break;

          case 46:
            _context.prev = 46;
            _context.t1 = _context["catch"](0);
            throw _context.t1;

          case 49:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 46], [27, 34]]);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

exports.init = init;