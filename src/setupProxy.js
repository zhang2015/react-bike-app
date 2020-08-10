const {createProxyMiddleware}  = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    createProxyMiddleware ('/goods', {  //`api`是需要转发的请求 
      target: 'http://localhost:3000',  // 这里是接口服务器地址
      changeOrigin: true,
    })
  ),
  app.use(
    createProxyMiddleware ('/delete', {  //`api`是需要转发的请求 
      target: 'http://localhost:3000',  // 这里是接口服务器地址
      changeOrigin: true,
    })
  ),
  app.use(
    createProxyMiddleware ('/players', {  //`api`是需要转发的请求 
      target: 'http://localhost:3000',  // 这里是接口服务器地址
      changeOrigin: true,
    })
  )
}