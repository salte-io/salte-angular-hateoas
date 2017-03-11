const path = require('path');
const webpack = require('webpack');
const deindent = require('deindent');
const packageJson = require('./package.json');
const args = require('yargs').argv;

const isProd = args.p;

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        'salte-angular-hateoas': './salte-angular-hateoas.module.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProd ? '[name].min.js' : '[name].js',
        sourceMapFilename: '[file].map',
        library: 'salteAngularHateoas',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: [{
        angular: 'angular'
    }],
    devtool: 'source-map',
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.BannerPlugin({
        banner: deindent(`
            /**
             * ${packageJson.name} JavaScript Library v${packageJson.version}
             *
             * @license MIT (https://github.com/salte-io/salte-auth/blob/master/LICENSE)
             *
             * Made with ♥ by ${packageJson.contributors.join(', ')}
             */
        `).trim(),
        raw: true
        })
    ]
};
