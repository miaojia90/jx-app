import config from '../config';
import gulp from 'gulp';
import sass from 'gulp-sass';
import gulpPostCss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import browsersync from 'browser-sync';
import gulpif from 'gulp-if';
import fs from 'fs';
import postcss from 'postcss';
import sprites from 'postcss-sprites';
import rename from "gulp-rename";
import replace from "gulp-str-replace";
const reload = browsersync.reload;

// TODO: partials无法更新

gulp.task('css:sass', () => {
    return gulp.src(config.scss.src)
        .pipe(changed(config.scss.dest, { extension: '.wxss' }))
        .pipe(gulpif(config.is.dev, sourcemaps.init()))
        .pipe(sass({
            outputStyle: "expanded"
        }).on('error', sass.logError))
        .pipe(gulpPostCss([
            autoprefixer({
                browsers: ["last 4 versions"],
                cascade: false
            })
        ]))
        .pipe(replace({
            original: {
                resProxy: /\@{3}RESPREFIX\@{3}/g,
                prefix: /\@{3}PREFIX\@{3}/g
            },
            target: {
                resProxy: config.staticpath.resProxy,
                prefix: config.staticpath.prefix
            }
        }))
        .pipe(gulpif(config.is.dev, sourcemaps.write('.')))
        .pipe(rename({ extname: ".wxss" }))
        .pipe(gulp.dest(config.scss.dest))
        .pipe(filter('**/*.wxss')) // 确保browser-sync只会响应*css文件而非*.css.map文件
        .pipe(reload({
            stream: true // 浏览器css自动注入(browsersync)
        }));
});


gulp.task('css:watch', () => {
    gulp.watch(config.scss.src, gulp.series('css:sass'));
});