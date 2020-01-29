module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ["node-pty-prebuilt-multiarch"],
      builderOptions: {
        win: {
          target: "squirrel"
        }
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.node$/,
          use: "node-loader"
        }
      ]
    }
  }
};
