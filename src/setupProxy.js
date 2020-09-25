// @ts-ignore: isolated modules error
const { useExpressDevPack } = require('@midwayjs/faas-dev-pack')
const { resolve } = require('path')

module.exports = function (app) {
  app.use(
    useExpressDevPack({
      functionDir: resolve(__dirname, '../'),
      sourceDir: resolve(__dirname, 'apis'),
      // 忽略渲染函数
      ignoreWildcardFunctions: ['render'],
      // 忽略静态文件地址
      ignorePattern: (req) => {
        return /\.(js|css|map|json|png|jpg|jpeg|gif|svg|eot|woff2|ttf)$/.test(req.url)
      },
    })
  )
}
