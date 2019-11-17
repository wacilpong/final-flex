const { src, dest, task } = require("gulp");
const babel = require("gulp-babel");
const minifyCSS = require("gulp-csso");
const concat = require("gulp-concat");

task("default", done => {
  src("lib/*.css")
    .pipe(minifyCSS())
    .pipe(concat("final-flex.min.css"))
    .pipe(dest("dist"));

  src("lib/*.js", { sourcemaps: true })
    .pipe(babel())
    .pipe(concat("final-flex.min.js"))
    .pipe(dest("dist", { sourcemaps: true }));

  done();
});
