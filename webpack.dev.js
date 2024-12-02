const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/main.js', // Same entry as production
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devtool: 'inline-source-map', // Faster source maps for development
  devServer: {
    static: path.resolve(__dirname, 'build'), // Serve files from the build directory
    open: true, // Automatically open in the browser
    port: 3000, // Port for the dev server
  }
};
