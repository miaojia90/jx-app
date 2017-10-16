import config from '../config';
import gulp from "gulp";
import changed from "gulp-changed";
import concat from "gulp-concat";
import rename from "gulp-rename";
import replace from "gulp-str-replace";
// json拷贝
gulp.task('wxml:copy', () => {
    return gulp.src(config.wxml.src)
        .pipe(changed(config.wxml.dest))
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
        .pipe(gulp.dest(config.wxml.dest));
});

gulp.task('wxml:watch', () => {
    gulp.watch(config.wxml.src, gulp.series('wxml:copy'));
});