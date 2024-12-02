const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].[contenthash].js', // Unique filenames for each chunk || Places JS files in `js` folder
    publicPath: '/', // Ensures correct paths for assets || Root-relative paths for assets
    clean: true // Clean the output directory before emitting files
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        type: 'asset/resource',
        generator: {
          filename: 'css/[name][contenthash].css', // Ensure CSS is placed in `build/css/`
        },
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extracts CSS to separate files
      },
      {
        test: /\.(mp3|wav|ogg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'sounds/[name][ext]', // Places audio files in the `sounds` folder in `build`
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|json)$/i, // Include JSON for typeface files
        type: 'asset/resource', // Ensures correct handling of these files
        generator: {
          filename: 'fonts/[name][ext]', // Places fonts in the `fonts` folder in `build`
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Handles JavaScript files
        },
      },
    ],
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      zlib: require.resolve('browserify-zlib'),
      url: require.resolve('url/'),
      vm: require.resolve('vm-browserify') // Added polyfill for `vm`
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // Split all chunks to reduce bundle size
    },
    runtimeChunk: 'single', // Create a single runtime chunk to avoid duplication
    usedExports: true, // Enable tree shaking
  },
  devtool: 'source-map', // Generate source maps for debugging
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css', // Places CSS in `build/css/`
    }),
    new CompressionPlugin({
      algorithm: 'gzip', // Use gzip compression
      test: /\.js$|\.css$|\.html$/, // Compress JS, CSS, and HTML files
      threshold: 10240, // Compress files larger than 10 KB
      minRatio: 0.8, // Only compress if compression ratio is below 0.8
    }),
    new HtmlWebpackPlugin({
      template: './index.html', // The source index.html
      inject: true, // Automatically inject all assets (CSS/JS)
      filename: 'index.html', // Output filename in `build`
    }),
    new BundleAnalyzerPlugin(), // Generates a visual bundle analysis report
  ]
};
