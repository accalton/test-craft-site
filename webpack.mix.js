const Dotenv = require('dotenv-webpack');
const mix = require('laravel-mix');

mix.setPublicPath('web');

mix.js('src/js/main.js', 'web/assets/main.js').react();
mix.sass('src/css/main.scss', 'web/assets/main.css');

mix.copyDirectory('src/images', 'web/images');

mix.webpackConfig({
    plugins: [
        new Dotenv({
            path: `${__dirname}/.env`,
            allowEmptyValues: true,
        })
    ]
});

if (process.env.CRAFT_ENVIRONMENT !== 'dev') {
    mix.version();
}