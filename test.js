'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var hogan = require('./index');

function fixture(stream, content)
{
    stream.write(new gutil.File({
                                path: 'fixture.hogan',
                                contents: new Buffer(content)
                                }));
}

it('should compile hogan to js', function (cb) {
        var stream = hogan({handle: 'gnumanth'});

        stream.on('data', function (file) {
                assert.equal(file.relative, 'fixture.js');
                assert.equal(file.contents.toString(), 'gnumanth');
                cb();
        });
        fixture(stream, '{{handle}}');
});

it('should support custom delimiters', function (cb) {
   var stream = hogan({handle: 'gnumanth'}, {delimiters: '<% %>'});
   stream.on('data', function (file) {
             assert.equal(file.relative, 'fixture.js');
             assert.equal(file.contents.toString(), 'gnumanth');
             cb();
             });
   fixture(stream, '<% handle %>');
   });

it('should support custom extensions', function (cb) {
   var stream = hogan({handle: 'gnumanth'}, null, '.html');
   
   stream.on('data', function (file) {
             assert.equal(file.relative, 'fixture.html');
             assert.equal(file.contents.toString(), 'gnumanth');
             cb();
             });
   
   fixture(stream, '{{handle}}');
   });