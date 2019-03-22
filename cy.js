
/**
 * 文档: http://cli.caiyi.com/cy/index.html
 */

export default {
  scene: [
    ["cy-scene-react", {
      antd: true,
    }]
  ],
  entry: {
    app: './src/index.js'
  },
  html: {
    filename: './index.html',
    template : 'index.ejs',
    inject   : true,
    chunks: ['app']
  },
  outputPath: 'dist',//打包之后的目录
  chainWebpack(config, webpack) {
    
    
  },
  disableCSSModules: false,//默认false
  proxy: {
    '/ops': {target: 'http://test.lb.gs.youyuwo.com:50040', changeOrigin: true},
  },
  hash: true,
  dll: {
    switch: true,
    dllName: 'caiyi',
    pkg: ['react', 'react-dom', 'react-router-dom', 'react-loadable']
  },
  mock: true
}