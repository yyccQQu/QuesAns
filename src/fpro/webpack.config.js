const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    mode: 'development',
    entry: {
        app: './src/main.js'
        // print: './src/print.js'
    },
    // devtool: 'inline-source-map',
    devServer: {
        // contentBase: path.join(__dirname, "dist"),//对外提供的访问内容的路径
        compress: true,//是否启用gzip压缩
        hot: true,
        host: '127.0.0.1',
        port: 9000//提供访问的端口
    },
    
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            "@": path.resolve(__dirname, "./src/"),
            'common': path.resolve(__dirname, './src/common/'),
            'assets': path.resolve(__dirname, './src/assets/'),
            'base': resolve('src/base/')
        }
    },
    module: {
        rules: [
            
            {
                test: /\.vue$/,
                loader: 'vue-loader'
                // options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!'
            },
            
            // {
            //     test: /\.(ttf|eot|woff|woff2)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: 'fonts/[name].[ext]',
            //     }
            // },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('fonts/[name].[ext]')
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            // title: 'Output Management', //只写title会新建一个html文件
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),

        //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
        // new webpack.NamedModulesPlugin(),
        //永远不要在生产环境(production)下启用 HMR
        // new webpack.HotModuleReplacementPlugin()
    ]


}