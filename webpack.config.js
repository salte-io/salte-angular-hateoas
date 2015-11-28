var path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './arx-angular-hateoas.module.js',
    output: {
        path: 'dist',
        filename: 'arx-angular-hateoas.js',
        sourceMapFilename: '[file].map',
        library: 'arxAngularHateoas',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
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
