const path = require('path');
const glob = require('glob');
const dotenv = require('dotenv');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

dotenv.load();

module.exports.jsConfig = {
    mode: process.env.NODE_ENV || 'production',

    watch: process.env.NODE_ENV === 'development',

    entry: toObject(glob.sync('app/assets/js/*.js')),

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/js'),
        publicPath: '/public'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};

module.exports.cssConfig = {
    mode: process.env.NODE_ENV || 'production',

    watch: process.env.NODE_ENV === 'development',

    entry: toObject(glob.sync('app/assets/scss/*.scss')),

    output: {
        filename: 'app.css',
        path: path.resolve(__dirname, 'public/css'),
        publicPath: '/public'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['ie >= 8', 'last 4 version']
                                    }),
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("app.css"),
    ]
};

function toObject(paths) {
    let data = {};

    paths.forEach(function (pathItem) {
        // you can define entry names mapped to [name] here
        data[pathItem.split('/').slice(-1)[0]] = path.resolve(__dirname, pathItem);
    });

    return data;
}