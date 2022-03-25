const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  //入口文件,
  entry: "./index.js",
  //需要指定一下输出的路径path和输出的文件名filename
  output: {
    filename: "[name]-bundle.js", //自定义输出文件名
    path: path.resolve(__dirname, "./dist"), //自定义输出文件所在目录
  },
  mode: "production",
  devServer: {},
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: { limit: 1, name: "resource/font/[name].[ext]" },
        },
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", { loader: "less-loader" }],
      },

      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: {
          loader: "url-loader",
          options: { limit: 1, name: "resource/image/[name].[ext]" },
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new BundleAnalyzerPlugin()],
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         compress: false,
  //       },
  //     }),
  //   ],
  // },
};
