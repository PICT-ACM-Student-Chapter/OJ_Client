const CracoAntDesignPlugin = require("craco-antd");
const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin
        },
        { plugin: CracoLessPlugin }
    ]
};
