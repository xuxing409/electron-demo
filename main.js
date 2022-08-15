const { app, BrowserWindow } = require("electron");
const path = require("path");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
};
// whenReady 避免了on的监听问题，处理了边界问题
// 只有在 app 模组的 ready 事件被触发后才能创建 BrowserWindows 实例
app.whenReady().then(() => {
  createWindow();
  // 如果没有窗口打开则打开一个窗口 (macOS)
  // 与前二者相比，即使没有打开任何窗口，macOS 应用通常也会继续运行
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
// 关闭所有窗口时退出应用 (Windows & Linux)
// 在 Windows 和 Linux 上，我们通常希望在关闭一个应用的所有窗口后让它退出。
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
