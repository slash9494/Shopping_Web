// import {createProxyMiddleware} from 'http-proxy-middleware'

// // const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app:any) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:5000',  
//       changeOrigin: true,
//     })
//   );
// };


// const { createProxyMiddleware } = require('http-proxy-middleware');
// export const express = require('express')

// const app = express();
// app.use('/api',createProxyMiddleware({
//   target: 'http://localhost:5000',
//   changeOrigin: true
// }))

// app.listen(3000);

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  )};