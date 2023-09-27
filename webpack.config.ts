import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import fs from 'fs'
import { marked } from 'marked'

// Override function
const renderer = {
  heading: (text: string, level: number) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
    return `<h${level} id="${escapedText}">${text}</h${level}>`
  },
}

marked.use({
  renderer,
  async: false,
  pedantic: false,
  gfm: true,
})

const resume = marked.parse(
  fs.readFileSync(path.resolve(__dirname, 'src/md/resume.md')).toString()
)

const logo = fs
  .readFileSync(path.resolve(__dirname, 'src/svg/logo.svg'))
  .toString()

const config: Configuration = {
  devtool: 'source-map',
  entry: './src/index.ts',
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
      template: './src/ejs/index.ejs',
      templateParameters: {
        resume: marked.parse(resume),
        logo,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `index.css`,
    }),
  ],
}

export default config
