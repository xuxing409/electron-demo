// 预加载模块
const { contextBridge } = require('electron')


// 不能直接在主进程中编辑DOM，因为它无法访问渲染器 文档 上下文。 它们存在于完全不同的进程！
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
})
