var gulp = require('gulp');
		$ = require("gulp-load-plugins")();	
		http = require("http");	
		gutil=require('gulp-util')
		ecstatic = require("ecstatic");
		inject = require('gulp-inject')

gulp.task('copy', function(){
	return gulp
					.src('src/index.html')
    			.pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
	return gulp
					.src('dist')
	  			.pipe($.clean());
});

gulp.task('js', function(){
	return gulp
					.src('src/js/**/*.js',{
						base: 'src'
					})
					.pipe($.uglify())
					.pipe(gulp.dest('dist'));
});

gulp.task('jshint', function(){
	return gulp
					.src('src/js/**/*.js')
					.pipe($.jshint())
					.pipe(jshint.reporter('default'));
});

gulp.task('htmlmin', function(){
	return gulp
					.src('src/**.html',{
						base: 'src'
					})
					.pipe($.htmlmin())
					.pipe(gulp.dest('dist'))
})

gulp.task('watch', function(){
	return gulp.watch(['src/**/*.scss'], ['sass']);
})

gulp.task('usemin', function() {
  return gulp.src('src/index.html')
    .pipe($.usemin({
      js: [$.uglify(),$.rev()],
      css: [$.minifyCss(),'concat']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('server', function(){ 
		http.createServer(ecstatic({
        root: 'dist',
        cache: 0
    })).listen(8080);
    gutil.log(gutil.colors.blue('HTTP server listening on port 8080'));
});

gulp.task('index', function () {
  return gulp.src('src/index.html')
  	.pipe(inject(gulp.src(['src/**/*.js', 'src/**/*.css','bower_components/**/*.min.css','bower_components/**/*.min.js'], {read: false})))
    .pipe(gulp.dest('dist'));
});

gulp.task('build',function(){
	runSequence('clean',
							'htmlmin',
							'jshint',
							'js',
							'copy');
})