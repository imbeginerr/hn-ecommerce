module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('#', resolve(__dirname, 'src'))
  }
}

// Helper function to resolve paths
function resolve(dir) {
  return path.join(__dirname, dir)
}

const path = require('path')
