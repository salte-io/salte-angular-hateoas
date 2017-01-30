module.exports = {
  output: {
    pathinfo: true
  },
  module: {
    rules: [{
        enforce: 'pre',
        test: /\.js$/,
        include: /tests/,
        loader: 'eslint-loader'
    }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    }]
  },
  devtool: 'inline-source-map'
};
