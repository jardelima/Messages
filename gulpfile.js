const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

//Sass
function scssTask() {
    return src('src/scss/**/*.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' })); 
}

//Javascript
function jsTask() {
    return src('src/js/app.js', { sourcemaps: true })
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }));
}

//Browser Sync
function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: ['src', 'dist']
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

//Watch task
function watchTask() {
    watch('src/**/*.html', browsersyncReload);
    watch(['src/scss/**/*.scss', 'src/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}

//Default task
exports.default = series(
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
)