/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')

module.exports = {
  entry: ['./client/index.tsx', './client/styles/index.scss'],
  output: {
    path: path.join(__dirname, '..', 'server', 'public'),
    filename: 'bundle.js'
  },
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new Dotenv({
      path: './.env'
    }),
    new webpack.DefinePlugin({
      'process.env.apiKey': JSON.stringify(process.env.apiKey),
      'process.env.authDomain': JSON.stringify(process.env.authDomain),
      'process.env.projectId': JSON.stringify(process.env.projectId),
      'process.env.storageBucket': JSON.stringify(process.env.storageBucket),
      'process.env.messagingSenderId': JSON.stringify(process.env.messagingSenderId),
      'process.env.appId': JSON.stringify(process.env.appId)
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map'
}
