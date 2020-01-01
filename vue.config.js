const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false,
    chainWebpack:(config)=>{
      config.resolve.alias
        .set('@',resolve('src'))
        .set('assets',resolve('src/assets'))
        .set('cmp',resolve('src/components'))
        .set('static',resolve('src/static'))
        .set('views',resolve('src/views'))
        .set('admin',resolve('src/admin'))
    },
    devServer: {
      port:9000,
      proxy: {
        '/api':{
          target:'http://localhost:8360',
          changeOrigin:true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }