module.exports = {
  output: {
    pathinfo: true
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /node_modules\/(?!chai)/,
      loader: 'babel-loader'
    }]
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: false
  }
};
