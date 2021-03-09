import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import popupWebpackConfig from './popup/webpack.config';
import eventWebpackConfig from './event/webpack.config';
import contentWebpackConfig from './content/webpack.config';

gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('popup-js', (cb) => {
  webpack(popupWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('event-js', (cb) => {
  webpack(eventWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('content-js', (cb) => {
  webpack(contentWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('popup-html', () => {
  return gulp.src('popup/src/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('popup-css', () => {
  return gulp.src('popup/src/popup.css')
    .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', () => {
  return gulp.src('manifest.json')
    .pipe(gulp.dest('./build'));
});

gulp.task('build', gulp.series('copy-manifest', 'popup-js', 'popup-css', 'popup-html', 'event-js', 'content-js'));
gulp.task('default', gulp.series('build'));

gulp.task('watch', function() {
  gulp.watch('popup/**/*', gulp.series('popup-js', 'popup-css', 'popup-html'));
  gulp.watch('content/**/*', gulp.series('content-js'));
  gulp.watch('event/**/*', gulp.series('event-js'));
  gulp.watch('manifest.json', gulp.series('copy-manifest'));
});
