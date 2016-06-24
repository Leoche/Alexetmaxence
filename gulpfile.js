var gulp = require("gulp");
var dest = 'dist/';
var browserSync = require('browser-sync').create();
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});
var mainBowerFiles = require('main-bower-files');

var paths = {
  scripts: ['src/js/main.js'],
  adminscripts: ['src/js/admin.js'],
  htmls: 'src/*.html',
  images: 'src/imgs/**/*',
  styles:'src/css/*',
};

gulp.task('scripts', function() {
	console.log(dest);
	var scripts = ['src/js/scrolloverflow.min.js'].concat(mainBowerFiles());
	console.log(scripts);
	return gulp.src(scripts.concat(paths.scripts))
		.pipe(plugins.filter('**/*.js'))
		.pipe(plugins.concat('main.min.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('dist/js'));
});
gulp.task('adminscripts', function() {
	console.log(dest);
	return gulp.src(paths.adminscripts)
		.pipe(plugins.filter('**/*.js'))
		.pipe(plugins.concat('admin.min.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('dist/js'));
});
gulp.task('css', function() {
	return gulp.src(mainBowerFiles().concat(paths.styles))
		.pipe(plugins.filter('**/*.css'))
		.pipe(plugins.order([
			'normalize.css',
			'*'
		]))
		.pipe(plugins.concat('style.min.css'))
		.pipe(plugins.uglifycss({"uglyComments": false}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});
gulp.task('htmls', function(){
  return gulp.src(paths.htmls)
      .pipe(plugins.htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist'));
});
gulp.task('images', function(){
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/imgs'));
});
gulp.task('serve', function() {
    browserSync.init({
    	notify: false,
        server: "./dist"
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']).on("change", browserSync.reload);
  gulp.watch(paths.adminscripts, ['adminscripts']).on("change", browserSync.reload);
  gulp.watch(paths.styles, ['css']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.htmls, ['htmls']).on("change", browserSync.reload);
});
gulp.task("default", ['htmls','css','scripts','adminscripts', 'images','serve','watch']);