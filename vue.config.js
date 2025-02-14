const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false  //
})
module.exports = {
  publicPath: '/midmid-project/'  //  將 `<您的儲存庫名稱>` 替換成您的 GitHub 儲存庫名稱
}