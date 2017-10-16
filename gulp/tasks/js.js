import config from '../config';
import gulp from "gulp";
import changed from "gulp-changed";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
// js拷贝
gulp.task('js:copy', () => {
    return gulp.src(config.js.src)
        .pipe(changed(config.js.dest))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('js:watch', () => {
    gulp.watch(config.js.src, gulp.series('js:copy'));
});

