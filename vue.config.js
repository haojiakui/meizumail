module.exports = {
  devServer: {
    proxy: { //设置代理服务器的配置
      '/api':{ //凡是以api开头的都以代理方式请求
        target:'http://localhost:8888' ,  //请求的目标地址
        changeOrigin :true , //?跨域吗？ 默认不跨域(false)
        pathRewrite:{   //重写配置
          '/api':'/'
        }
      }
    }
  }
}