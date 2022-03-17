const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  //入口文件,
  entry: "./index.js",
  //需要指定一下输出的路径path和输出的文件名filename
  output: {
    filename: "bundle.js", //自定义输出文件名
    path: path.resolve(__dirname, "./dist"), //自定义输出文件所在目录
  },
  mode: "development",
  devServer: {},
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: "url-loader" },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", { loader: "less-loader" }],
      },

      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: "url-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
