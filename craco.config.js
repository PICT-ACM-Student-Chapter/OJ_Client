const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
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
