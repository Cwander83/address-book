const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        // use: ['style-loader', 'css-loader'],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // options: { modules: true }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template:  './src/index.html',
      filename: './index.html',
			favicon: './src/address-book.ico',
    }),
    // new CopyPlugin({
    //   patterns: [{ from: 'src', to: 'dest' }],
    // }),
    new webpack.SourceMapDevToolPlugin({}),
  ],
  //stats: 'errors-only',
};
