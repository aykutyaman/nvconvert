#!/usr/bin/env node

var nvconvert = require('../lib/nvconvert'),
    argv = require('optimist')
      .demand(['from', 'to'])
      .argv;

nvconvert.run(argv, function(err) {
  console.log(err);
});
//nvconvert.run(
