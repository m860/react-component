var webpack = require("webpack");
var path=require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index:"./src/index.jsx",
        vendor:["react","react-dom"]
    },
    output: {
        path: path.join(__dirname,"dist"),
        filename: "bundle.js"
        //publicPath:path.join(__dirname,"dist")
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                //loader: "style/url!file"
                loader:ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.jsx?$/, 
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve:{
        //设置别名
        alias:{
            bower:path.join(__dirname,"bower_components")
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        //全局module
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDom: "react-dom"
        }),
        //把所有的css打包到style.css
        new ExtractTextPlugin("style.css",{
            allChunks:true
        }),
        //清除发布目录
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        //html
        new HtmlWebpackPlugin({
            filename:"index.html",
            template: './src/index.html',
            hash:true,
            inject:false,
            files:{
                css:["style.css"],
                js:["vendor.bundle.js","bundle.js"],
                // chunks:{
                //     vendor:{
                //         entry:"dist/vendor.bundle.js",
                //         css:[]
                //     },
                //     index:{
                //         entry:"dist/bundle.js",
                //         css:["dist/style.css"]
                //     }
                // }
            }
        })
    ]
};