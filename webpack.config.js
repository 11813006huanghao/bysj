const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
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
          test: /\.less$/,
          use: ["style-loader", "css-loader", { loader: "less-loader" }],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({ template: "./index.html" }),
      new webpack.DefinePlugin({
        //用于代码运行时根据开发环境和生产环境分别配置不同的变量
        "process.env": env.production
          ? "{production:true}"
          : "{development:true}",
      }),
    ],
  };
  if (env.production) {
    console.log("it is production");
    config.mode = "production";
    config.plugins.push(new BundleAnalyzerPlugin());
    let prodRules = [
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1,
            name: "resource/font/[name].[ext]",
          },
        },
      },
      {
        test: /\.mp4$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1,
            name: "resource/video/[name].[ext]",
          },
        },
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1,
            name: "resource/image/[name].[ext]",
          },
        },
      },
    ];
    for (let rule of prodRules) {
      config.module.rules.push(rule);
    }
    console.log(config.module.rules);
  }
  if (env.development) {
    console.log("it is development");
    config.mode = "development";
    config.devtool = "source-map";
    let devRules = [
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1,
            name: "resource/font/[name].[ext]",
            publicPath: "http://localhost:8080/",
          },
        },
      },
      {
        test: /\.mp4$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1,
            name: "resource/video/[name].[ext]",
            publicPath: "http://localhost:8080/",
          },
        },
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1,
            name: "resource/image/[name].[ext]",
            publicPath: "http://localhost:8080/",
          },
        },
      },
    ];
    for (let rule of devRules) {
      config.module.rules.push(rule);
    }
    console.log(config.module.rules);
  }
  return config;
};
