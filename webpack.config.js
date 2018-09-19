const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: true,
            collapseWhitespace: true
          }
        }
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    // }),
    new webpack.DefinePlugin(envKeys),
    new HtmlWebPackPlugin({
      template: "./public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:8].css"
    }),
    new CleanWebpackPlugin(["dist"])
  ]
};
