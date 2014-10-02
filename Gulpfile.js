var gulp = require('gulp');
var karma = require('gulp-karma');
var concat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var handlebars = require('gulp-ember-handlebars');
var transpiler = require('gulp-es6-module-transpiler');

var paths = {
    mainTemplates: [
        'main/templates/**/*.handlebars'
    ],
    reportsTemplates: [
        'reports/templates/**/*.handlebars'
    ],
    mainConcatDist: [
        'shared/vendor/jquery/dist/jquery.min.js',
        'shared/vendor/handlebars/handlebars.js',
        'shared/vendor/ember/ember.min.js',
        'shared/vendor/ember-loader/loader.js',
        'shared/vendor/ember-resolver/dist/ember-resolver.js',
        'main/dist/tmpl.min.js',
        'main/app/**/*.js'
    ],
    reportsConcatDist: [
        'reports/dist/tmpl.min.js',
        'reports/app/**/*.js'
    ],
    mainConcatTest: [
        'shared/vendor/jquery/dist/jquery.min.js',
        'shared/vendor/handlebars/handlebars.js',
        'shared/vendor/ember/ember.js',
        'shared/vendor/fauxjax/dist/fauxjax.min.js',
        'shared/vendor/ember-loader/loader.js',
        'shared/vendor/ember-resolver/dist/ember-resolver.js',
        'main/dist/tmpl.min.js',
        'main/app/**/*.js',
        'main/tests/**/*.js',
        'vendor/main-loader.js'
    ],
    reportsConcatTest: [
        'shared/vendor/jquery/dist/jquery.min.js',
        'shared/vendor/handlebars/handlebars.js',
        'shared/vendor/ember/ember.js',
        'shared/vendor/fauxjax/dist/fauxjax.min.js',
        'shared/vendor/ember-loader/loader.js',
        'shared/vendor/ember-resolver/dist/ember-resolver.js',
        'reports/dist/tmpl.min.js',
        'reports/app/**/*.js',
        'reports/tests/**/*.js',
        'vendor/main-loader.js'
    ]
};

var filter = gulpFilter(function(file) {
  var vendor = file.path.indexOf('vendor') === -1;
  var templates = file.path.indexOf('dist') === -1;
  return vendor && templates;
});

gulp.task('main', ['mainemberhandlebars'], function(){
    return gulp.src(paths.mainConcatDist)
        .pipe(filter)
        .pipe(transpiler({
            type: "amd",
            prefix: "js"
        }))
        .pipe(filter.restore())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('main/dist/'));
});

gulp.task('reports', ['reportsemberhandlebars'], function(){
    return gulp.src(paths.reportsConcatDist)
        .pipe(filter)
        .pipe(transpiler({
            type: "amd",
            prefix: "js"
        }))
        .pipe(filter.restore())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('reports/dist/'));
});

gulp.task('maintest', ['mainemberhandlebars'], function(){
    return gulp.src(paths.mainConcatTest)
        .pipe(filter)
        .pipe(transpiler({
            type: "amd",
            prefix: "js"
        }))
        .pipe(filter.restore())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('main/dist/'))
        .pipe(karma({
            configFile: 'karma.main.conf.js',
            action: 'run'
        }));
});

gulp.task('reportstest', ['reportsemberhandlebars'], function(){
    return gulp.src(paths.reportsConcatTest)
        .pipe(filter)
        .pipe(transpiler({
            type: "amd",
            prefix: "js"
        }))
        .pipe(filter.restore())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('reports/dist/'))
        .pipe(karma({
            configFile: 'karma.reports.conf.js',
            action: 'run'
        }));
});

gulp.task('mainemberhandlebars', function(){
    return gulp.src(paths.mainTemplates)
        .pipe(handlebars({outputType: 'browser'}))
        .pipe(concat('tmpl.min.js'))
        .pipe(gulp.dest('main/dist/'));
});

gulp.task('reportsemberhandlebars', function(){
    return gulp.src(paths.reportsTemplates)
        .pipe(handlebars({outputType: 'browser'}))
        .pipe(concat('tmpl.min.js'))
        .pipe(gulp.dest('reports/dist/'));
});
