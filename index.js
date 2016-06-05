'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');
var Hogan = require('hogan.js');
var path = require('path');
var fs = require('fs');

module.exports = function(data, options, extension) {
  data = data || {};
  extension = extension || '.js';
  return es.map(function (file, cb) {
    var compiled = Hogan.compile(file.contents.toString(), options);
    var partialTemplates = getPartials(compiled, path.dirname(file.path), path.extname(file.path), data, options);
    
    file.contents = new Buffer( compiled.render(data, partialTemplates) );
    file.path = gutil.replaceExtension(file.path, extension);
    cb(null,file);
  });
};


function getPartials(compiled, dir, ext, data, options) {
    var currentPartials = {},
        partialTemplates = {},
        partialPath = '',
        compiledPartial;
    
    Object.keys(compiled.partials).forEach(function (tag) {
        // find the path of the partial
        partialPath = path.format({
            'dir': dir,
            'base': compiled.partials[tag].name + ext
        });
        
        
        // read and compile the files contents
        compiledPartial = Hogan.compile(fs.readFileSync(partialPath).toString(), options);
        
        
        // if partials exist within the compiled tempalte, then 
        if (Object.keys(compiledPartial.partials).length !== 0) {
            currentPartials = getPartials(compiledPartial, dir, ext, data, options);
        }
        
        
        // Assign the contents of the partial to a key of the same name
        partialTemplates[compiled.partials[tag].name] = compiledPartial.render(data, currentPartials);
    });
    
    return partialTemplates;
}
