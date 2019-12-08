import { src, dest, task } from "gulp";
import babel from "gulp-babel";
import minifyCSS from "gulp-csso";
import minifyJs from "gulp-minify";
import concat from "gulp-concat";

task("default", done => {
  src("lib/*.css")
    .pipe(minifyCSS())
    .pipe(concat("final-flex.min.css"))
    .pipe(dest("dist"));

  src("lib/*.js", { sourcemaps: true })
    .pipe(babel())
    .pipe(concat("final-flex.js"))
    .pipe(minifyJs())
    .pipe(dest("dist", { sourcemaps: true }));

  done();
});
