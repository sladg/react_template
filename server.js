const slash = require('slash')
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.js')

const dirname = process.platform === 'win32' ? slash(__dirname) : __dirname

console.log('Working context: ' + dirname)

const app = express()
const compiler = webpack(config)

/** Can be set over ENV variable */
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3001

app.use(
    webpackDevMiddleware(compiler, {
        noInfo: false,
        publicPath: config.output.publicPath,
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: true,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: false,
            warnings: false,
            publicPath: false,
            entrypoints: false,
        },
        historyApiFallback: true,
        hot: true,
        inline: true,
        watchOptions: config.watchOptions,
    }),
)

app.use(webpackHotMiddleware(compiler, { log: console.log }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('*', (req, res) => {
    res.redirect('/#' + req.originalUrl)
})

app.listen(port, host, (err) => {
    if (err) return console.error(err)

    console.log(`🚧  App (env: ${process.env.NODE_ENV}) is listening at http://%s:%s`, host, port)
})
