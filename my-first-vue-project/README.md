# my-first-vue-project

> this is my first vue project  基于vue+webpack搭建

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

#插件：
    axios
    vue-router
    vue-lazyload
    vue-infinite-scroll
    vue-awesome
    vuex
    express
      安装       cnpm i -g express-generator
      创建服务    express server

#数据库
    启动数据库    mongod --config /usr/local/etc/mongod.conf
    客户端        mongoHub
#node
    pm2
    安装        cnpm i -g pm2
    启动服务     pm2 start server/bin/www
    停止服务     pm2 stop all
#配置
    config index.js proxyTable
#启动项目
    启动数据库      mongod --config /usr/local/etc/mongod.conf
    启动后台服务    pm2 start server/bin/www
    启动前端服务    npm start
# server/app.js
    可以在请求接口时拦截（比如未登陆请求加入购物车）
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
