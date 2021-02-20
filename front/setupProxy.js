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


// import { createProxyMiddleware } from 'http-proxy-middleware';
// import * as express from 'express';

// const app = express.default();
// app.use('/api',createProxyMiddleware({
//   target: 'http://localhost:5000',
//   changeOrigin: true
// }))

// app.listen(3000);


// // include dependencies
// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// // proxy middleware options
// const options = {
//   target: 'http://www.example.org', // target host
//   changeOrigin: true, // needed for virtual hosted sites
//   ws: true, // proxy websockets
//   pathRewrite: {
//     '^/api/old-path': '/api/new-path', // rewrite path
//     '^/api/remove/path': '/path', // remove base path
//   },
//   router: {
//     // when request.headers.host == 'dev.localhost:3000',
//     // override target 'http://www.example.org' to 'http://localhost:8000'
//     'dev.localhost:3000': 'http://localhost:8000',
//   },
// };

// // create the proxy (without context)
// const exampleProxy = createProxyMiddleware(options);

// // mount `exampleProxy` in web server
// const app = express();
// app.use('/api', exampleProxy);
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