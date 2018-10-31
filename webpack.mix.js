const mix = require('laravel-mix');

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


//Isso aqui vai pegar todos os nossos arquivos js e css 
//e compilar em um unico arquivo WEBPACK
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');


//browserSync é para não precisar compilar toda hora com
//o comando npm run dev
//Aqui vamos passar o host
//Digite para alterar a porta  npm config set proxy http://example.com:8080
// digite no terminal o comando npm run watch
mix.browserSync('http://laravel-vue.test/')

//O npm run watch compila automaticamente a cada mudança
//o browserSync atualiza o browser