import config from '../config';
import gulp from 'gulp';
import path from 'path';
import changed from 'gulp-changed';
import del from 'del';
import gulpif from 'gulp-if';

// TODO: 复制到st服务器上时，排除temp文件夹
gulp.task('img', () => {
    return gulp.src(config.img.src)
        .pipe(changed(config.img.dest))
        .pipe(gulp.dest(config.img.dest))
        .pipe(gulpif(config.is.prod, gulp.dest(config.prod)));
});

gulp.task('img:watch', () => {
    gulp.watch(config.img.src, gulp.series('img')).on('unlink', function (_path) {
        destClean(_path);
    });
});

// src与本地dest目录比对，仅操作有unlink动作的文件
function destClean(_path) {
    let _filePathFromSrc = path.relative(path.resolve(config.src), _path);
    let _destFilePath = path.resolve(config.dest, _filePathFromSrc);

    del.sync(_destFilePath);

    console.log(`source file was removed: ${_path}`);
    console.log(`destination file was removed: ${_destFilePath}`);
}

