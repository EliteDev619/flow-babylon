module.exports = function override(config, env) {
    console.log("React app rewired works!")
    config.resolve.fallback = {
    fs: false,
    http: false,
    https: false,
    url: false,
    path: false
    };
    return config;
};
