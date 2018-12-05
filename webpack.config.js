const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CircularDependencyPlugin = require('circular-dependency-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const webpack = require('webpack')
const path = require('path')

const dev = process.env.NODE_ENV === 'development'
const prod = process.env.NODE_ENV === 'production'

const dirname = path.resolve('.', __dirname)

const plugins = [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: 'index.html',
    }),
    new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: true,
    }),
]

prod &&
    plugins.push(
        ...[
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|cs/),
            new MiniCssExtractPlugin({
                filename: dev ? '[name].css' : '[name].[hash].css',
                chunkFilename: dev ? '[id].css' : '[id].[hash].css',
            }),
            new HappyPack({
                id: 'ts',
                threads: 8,
                loaders: [{ path: 'babel-loader', options: { babelrc: true } }, { path: 'ts-loader', query: { happyPackMode: true } }],
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    context: dirname,
                },
            }),
        ],
    )

dev &&
    plugins.push(
        ...[
            new ForkTsCheckerWebpackPlugin({
                workers: 2,
                tslint: true,
                checkSyntacticErrors: true,
                async: true,
            }),
            new HardSourceWebpackPlugin({
                cacheDirectory: path.resolve(dirname, './node_modules/.cache/hard-source/[confighash]'),
                environmentHash: {
                    root: process.cwd(),
                    directories: [],
                    files: ['package-lock.json', 'yarn.lock'],
                },
            }),
            new HappyPack({
                id: 'ts',
                threads: 2,
                loaders: [{ path: 'ts-loader', query: { happyPackMode: true } }],
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
    )

module.exports = {
    cache: true,
    mode: dev ? 'development' : 'production',
    devtool: dev ? 'eval' : false,
    context: dirname,
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
        ],
        splitChunks: {
            chunks: 'all',
            name: true,
        },
    },
    entry: {
        js: dev ? ['webpack-hot-middleware/client', './src/index.tsx'] : ['@babel/polyfill', './src/index.tsx'],
    },

    output: {
        path: dev ? '/' : path.resolve(dirname, 'dist'),
        chunkFilename: '[name].bundle.js',
        filename: 'app-[name].[hash].js',
        publicPath: '',
    },

    watchOptions: {
        aggregateTimeout: 300,
        poll: 500,
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['happypack/loader?id=ts'],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /.(ico|jpg|jpeg|png|woff(2)?|eot|ttf|otf|svg|gif)(\?[a-z0-9=\.]+)?$/,
                loader: 'file-loader',
            },
        ],
    },

    resolve: {
        mainFields: ['browser', 'main', 'module'],
        extensions: ['.js', '.json', '.jsx', '.tsx', '.ts', '.html'],
        modules: [path.join(dirname, 'src'), 'node_modules'],
        alias: {
            '@ant-design/icons': 'purched-antd-icons',
        },
    },
    plugins,
}
