let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .js('app/assets/js/main.js', 'public/js/app.js')
    .sass('app/assets/scss/main.scss', 'public/css/app.css')
    // .options({
    //     fileLoaderDirs: {
    //         fonts: 'public/fonts'
    //     }
    // })
    .setPublicPath('public')
    .setResourceRoot('../');
