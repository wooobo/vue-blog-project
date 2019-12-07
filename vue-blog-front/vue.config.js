// vue.config.js
const path = require('path')

module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
}

function addStyleResource (rule) {
  rule.use(['style-loader', 'css-loader', 'sass-loader'])
    .loader('style-resources-loader')
    .options({
      patterns: [
        './src/styles/*.scss',
      ]
    })
}