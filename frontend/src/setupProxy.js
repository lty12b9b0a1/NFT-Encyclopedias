const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(createProxyMiddleware("/devApi",{
        target:"localhost:3000",
        changeOrigin: true,
        pathRewrite:{
            "^/devApi": "",
        }
    }))
};