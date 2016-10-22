const path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './salte-angular-hateoas.module.js',
    output: {
        path: 'dist',
        filename: 'salte-angular-hateoas.js',
        sourceMapFilename: '[file].map',
        library: 'salteAngularHateoas',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: [{
        angular: {
            root: 'angular',
            commonjs2: 'angular',
            commonjs: 'angular',
            amd: 'angular'
        }
    }],
    devtool: 'source-map',
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint'
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'ng-annotate?map=false!babel'
        }]
    }
};
