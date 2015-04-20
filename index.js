'use strict';
var map = require('map-stream');
var es = require('event-stream');;
var gutil = require('gulp-util');
var Hogan = require('hogan.js');

module.exports = function(data, options, extension) {
  data = data || {};
  extension = extension || '.js';
  return es.map(function (file, cb) {
    file.contents = new Buffer( Hogan.compile(file.contents.toString(), options).render(data) );
    file.path = gutil.replaceExtension(file.path, extension);
    cb(null,file);
  });
};