module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ["node-pty"],
      builderOptions: {
        win: {
          target: "squirrel"
        }
      }
    }
  }
};
