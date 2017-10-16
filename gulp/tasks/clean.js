import gulp from "gulp";
import del from "del";
import pathConfig from "../config.js";

/* -------------------------------------------------------------------------- */
/* clean
/* -------------------------------------------------------------------------- */
gulp.task("clean", () => del([
     pathConfig.scss.dest,
     pathConfig.js.dest,
     pathConfig.json.dest,
     pathConfig.wxml.dest     
]));