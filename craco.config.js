const TerserPlugin = require('terser-webpack-plugin');
const CracoAntDesignPlugin = require("craco-antd");
module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    "@primary-color": "#019183",
                    "@menu-highlight-color":"#FFFFFF",
                }
            }
        }
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: false, // Must be set to true if using source-maps in production
                terserOptions: {
                    compress: {
                        drop_console: true, // << this needs only to remove console.log //
                    },
                },
            }),
        ],
    },
};
