const webpack = require('webpack');
//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: false,
			}
		}
	},
   devtool: 'source-map',
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.name': JSON.stringify(''),
  //   }),
  // //  new BundleAnalyzerPlugin(),
  // ],
};
