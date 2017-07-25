var gulp = require('gulp')
		$ = require("gulp-load-plugins")();		

gulp.task('copy', function(){
	return gulp
					.src('app/index.html')
    			.pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
	return gulp
					.src('dist')
	  			.pipe($.clean());
});

gulp.task('js', function(){
	return gulp
					.src('app/js/**/*.js',{
						base: 'app'
					})
					.pipe($.uglify())
					.pipe(gulp.dest('dist'));
});

gulp.task('jshint', function(){
	return gulp
					.src('app/js/**/*.js')
					.pipe($.jshint())
					.pipe(jshint.reporter('default'));
});

gulp.task('htmlmin', function(){
	return gulp
					.src('app/**.html',{
						base: 'app'
					})
					.pipe($.htmlmin())
					.pipe(gulp.dest('dist'))
})

gulp.task('watch', function(){
	return gulp.watch(['src/**/*.scss'], ['sass']);
})

gulp.task('usemin', function() {
  return gulp.src('app/index.html')
    .pipe($.usemin({
      js: [$.uglify(),$.rev()],
      css: [$.minifyCss(),'concat']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build',function(){
	runSequence('clean',
							'htmlmin',
							'jshint',
							'js',
							'copy');
})