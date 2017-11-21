/**
 * Created by Administrator on 2017/8/18.
 */
var gulp = require("gulp");
var uglify = require('gulp-uglify');//压缩组件
var clean = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var imagemin = require("gulp-imagemin");
var less = require('gulp-less');
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
//压缩js文件
gulp.task('compass',function () {
    gulp.src(['src/js/*.js','!src/js/*.min.js'])//过滤掉.min.js的文件
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});
//压缩css文件
gulp.task('cssmini',function () {
    gulp.src('src/css/*.css')
        .pipe(clean())
        .pipe(gulp.dest('dist/css'))
});
//压缩html文件
gulp.task('htmlmini',function () {
    gulp.src('*.html')
        .pipe(htmlmin({collapseWhitespace:true}))//collapseWhitespace  卷缩和空白地方
        .pipe(gulp.dest('dist'))
});
//压缩图片
gulp.task("imagemin",function () {
    gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/imgs"));
});
//编译less文件到css文件
gulp.task('myless',function () {
    gulp.src('src/lesses/*.less')
        .pipe(less())  //将less文件编译成css文件
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}))//steam 流  .pipe 管道
});
//browser-sync自动刷新  命令行写入gulp serve
gulp.task('serve',['myless'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("src/lesses/*.less", ['myless']);
    gulp.watch("dist/css/*.css");
    gulp.watch("*.html").on('change', reload);
});

