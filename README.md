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
  gulp.src('template.hogan')
    .pipe(hogan({handle: 'gnumanth'}))
    .pipe(gulp.dest('dist'));
});
```
Now dist will have `template.js` with content as `Follow @gnumanth`


## Template inheritance & Partials

Partials will be rendered recursively, allowing for template inheritance.

### Example:

Folder structure

```
|-- templates
    |-- page1.hogan
    |-- page2.hogan
    |-- partials
    |   |-- header.hogan
    |   |-- footer.hogan
```

page1.hogan

```html
<h1>Page 1</h1>
{{> header }}
{{> footer }}
```

page2.hogan
```html
<h1>Page 2</h1>
{{> header }}
{{> footer }}
```

header.hogan
```html
<header>
    Logo {{#image}}<img>{{/image}}
</header>
```

footer.hogan
```html
<footer>
    Copyright {{year}}
</footer>
```

gulpfile.js

```javascript
var hogan = require('gulp-hogan');

gulp.task('default', function(){
  gulp.src('template/*.hogan', {}, '.html')
    .pipe(hogan({year: '2016', section: true}, null, '.html'))
    .pipe(gulp.dest('dist'));
});
```

dist/page1.html

```html
<h1>Page 1</h1>
<header>
    Logo <img>
</header>
<footer>
    Copyright 2016
</footer>
```

dist/page2.html

```html
<h1>Page 2</h1>
<header>
    Logo <img>
</header>
<footer>
    Copyright 2016
</footer>
```


[travis-url]: http://travis-ci.org/hemanth/gulp-hogan
[travis-image]: https://travis-ci.org/hemanth/gulp-hogan.svg


