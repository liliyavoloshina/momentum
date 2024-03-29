const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const srcPath = path.resolve(__dirname, 'src')

const devServer = isDev =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          port: 8080,
          static: {
            directory: srcPath,
            watch: true
          }
        }
      }

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: {
    critical: './critical.js',
    main: './index.js'
  },
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[file]'
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, './src/scss/'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[chunkhash].css',
      chunkFilename: '[name]-[chunkhash].chunk.js'
    }),
    new HtmlWebpackPlugin({ title: 'momentum', template: './index.html', inject: false }),
    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, './src'),
          globOptions: {
            ignore: ['**/*.js', '**/*.ts', '**/*.scss', '**/*.sass', '**/*.html']
          },
          noErrorOnMissing: true,
          force: true
        },
        { from: 'background.js', to: 'background.js' },
        { from: 'data/playlist.js', to: 'data/playlist.js' }
      ]
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ['.js']
  },
  ...devServer(development)
})
