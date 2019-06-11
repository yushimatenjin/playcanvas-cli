#!/usr/bin/env node
"use strict";

var _commands = require("../scripts/commands");

var args = process.argv.slice(2);
var scriptIndex = args.findIndex(function (x) {
  return x === "create" || x === "init";
});
var script = scriptIndex === -1 ? args[0] : args[scriptIndex];

switch (script) {
  case "create":
    {
      var projectName = args[1] ? args[1] : "my-app";
      (0, _commands.create)(projectName);
      break;
    }

  case "init":
    {
      (0, _commands.init)();
      break;
    }

  default:
    {
      console.log("Unknown script ".concat(script, " ."));
      break;
    }
}