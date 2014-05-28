# gulp-hogan [![Build status][travis-image]][travis-url]
> gulp plugin to compile hogan templates.

## Usage

First, install `gulp-hogan` as a development dependency:

```shell
npm install --save-dev gulp-hogan
```

Then, add it to your `gulpfile.js`:

Say our `template.hogan` is :

```
Follow @{{handle}}.
```

```javascript
var hogan = require('gulp-hogan');

gulp.task('default', function(){
  gulp.src('index.html')
    .pipe(hogan({handle: 'gnumanth'}))
    .pipe(gulp.dest('dist'));
});
```
Now dist will have `template.js` with content as `Follow @gnumanth`

[travis-url]: http://travis-ci.org/hemanth/gulp-hogan
[travis-image]: https://travis-ci.org/hemanth/gulp-hogan.svg


