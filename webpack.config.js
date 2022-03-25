const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env, args) => {
  const config = {
    entry: "./index.js",
    //需要指定一下输出的路径path和输出的文件名filename
    output: {
      filename: "[name]-bundle.js", //自定义输出文件名
      path: path.resolve(__dirname, "./dist"), //自定义输出文件所在目录
    },
    devServer: {},
    module: {
      rules: [
        { test: /\.vue$/, use: "vue-loader" },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        {
          test: /\.(ttf|eot|svg|woff|woff2)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 1,
              name: "resource/font/[name].[ext]",
              publicPath: "./dist",
            },
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
            options: {
              limit: 1,
              name: "resource/image/[name].[ext]",
              publicPath: "./dist/",
            },
          },
        },
      ],
    },
    plugins: [new VueLoaderPlugin()],
  };
  if (env.production) {
    console.log("it is production");
    config.mode = "production";
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  if (env.development) {
    console.log("it is development");
    config.mode = "development";
  }
  return config;
};
