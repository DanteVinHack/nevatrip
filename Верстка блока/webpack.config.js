const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        main: './js/app.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.join(__dirname, 'dist'),
        assetModuleFilename: 'assets/img/[hash][ext]'
    },
    devServer: {
        port: 3000,
        static: './src',
        open: true,
        liveReload: true,
        bonjour: false,
        client: {
            overlay: {
                errors: true,
                warnings: true,
            }
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html',
        }),
        new miniCss({
            filename: 'css/style.css'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [miniCss.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg|ico)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
        ]
    }
}
