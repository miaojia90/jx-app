import config from '../config';
import gulp from "gulp";
import changed from "gulp-changed";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
// json拷贝
gulp.task('json:copy', () => {
    return gulp.src(config.json.src)
        .pipe(changed(config.json.dest))
        .pipe(gulp.dest(config.json.dest));
});

gulp.task('json:watch', () => {
    gulp.watch(config.json.src, gulp.series('json:copy'));
});

