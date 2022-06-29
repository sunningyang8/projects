const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('@koa/cors');
const jwt = require('koa-jwt');
const { jwtSecret } = require('./config');
const index = require('./routes/index')
const users = require('./routes/users')
const homes = require('./routes/home')
const commdity = require('./routes/commdity')
const search = require('./routes/search')
const cart = require('./routes/cart')
// error handler
onerror(app)
app.use(cors());



// 使用koa-jwt中间件  来拦截 客户端在调用服务端接口时，如果请求头中没有设置token  返回401 
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {

      
      throw err;
    }
  });
});

// 设置哪些接口需要在token   
// jwt(加密信息)  加密信息一定要跟token生成使用加密字符串保持一致
// unless 排除哪些不需要在请求带token
// app.use(jwt({ secret: jwtSecret }).unless({ path: [/^\/users\/mobile/,/^\/users\/user/,/^\/users\/login/] }));



// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(homes.routes(), homes.allowedMethods())
app.use(commdity.routes(), commdity.allowedMethods())
app.use(search.routes(), search.allowedMethods())
app.use(cart.routes(), cart.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
