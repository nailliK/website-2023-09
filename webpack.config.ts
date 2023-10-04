import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import fs from 'fs'

const resume = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'src/json/resume.json')).toString()
)

const logo = fs
  .readFileSync(path.resolve(__dirname, 'src/svg/logo.svg'))
  .toString()

const config: Configuration = {
  devtool: 'source-map',
  entry: ['./src/index.ts'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[tj]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html|svg$/i,
        use: 'html-loader',
      },
      {
        test: /\.hbs$/i,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              helperDirs: path.resolve(__dirname, './src/hbs/helpers'),
              precompileOptions: {
                knownHelpersOnly: false,
              },
            },
          },
        ],
      },
      {
        test: /\.md$/i,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      cache: false,
      minify: true,
      template: './src/hbs/index.hbs',
      templateParameters: {
        resume,
        logo,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `index.css`,
    }),
  ],
}

export default config
