"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const fs = require("node:fs");
const path$1 = require("node:path");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path$1);
const icon = path.join(__dirname, "../../resources/icon.png");
function getAppDownloadsPath() {
  const appPath = electron.app.isPackaged ? path.join(electron.app.getPath("exe")) : electron.app.getAppPath();
  const downloadsPath = path.join(appPath, "downloads");
  if (!fs__namespace.existsSync(downloadsPath)) {
    fs__namespace.mkdirSync(downloadsPath, { recursive: true });
  }
  return downloadsPath;
}
const appDownloadsPath = getAppDownloadsPath();
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs__namespace.createWriteStream(filePath);
    const protocol = url.startsWith("https") ? require("https") : require("http");
    protocol.get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve({
          success: true,
          path: filePath,
          fileName: path__namespace.basename(filePath)
        });
      });
    }).on("error", (error) => {
      fs__namespace.unlink(filePath, () => {
      });
      reject(error);
    });
  });
}
const Store = require("electron-store");
const store = new Store();
console.log("配置文件路径:", store.path);
let full = false;
const gotTheLock = electron.app.requestSingleInstanceLock();
if (!gotTheLock) {
  electron.app.quit();
} else {
  electron.app.on("second-instance", () => {
    const windows = electron.BrowserWindow.getAllWindows();
    if (windows.length > 0) {
      const mainWindow = windows[0];
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
function createHomeWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 961,
    height: 643,
    minWidth: 961,
    minHeight: 643,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    webviewTag: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL("http://localhost:5173/#/home");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"), {
      hash: "#/home"
    });
  }
  electron.ipcMain.on("open-search-window", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      createSearchWindow();
    }
  });
  electron.ipcMain.on("open-login-window", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      window.close();
      store.delete("user");
      store.delete("user_token");
      console.log("token已删除", store.get("user_token"));
      console.log("user已删除", store.get("user"));
      createLoginWindow();
    }
  });
  electron.ipcMain.on("open-webRTCWindow", (event, selectedUserUid) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      createWebRTCWindow(selectedUserUid);
    }
  });
  electron.ipcMain.on("open-appSet-window", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      createAppSetWindow();
    }
  });
}
let searchWindow = null;
const createSearchWindow = () => {
  if (searchWindow) {
    searchWindow.focus();
    return;
  }
  searchWindow = new electron.BrowserWindow({
    width: 680,
    height: 719,
    resizable: false,
    // 禁止调整窗口大小
    modal: false,
    // 设置为模态窗口
    frame: false,
    // 无边框窗口
    show: false,
    // 初始不显示
    autoHideMenuBar: true,
    // 自动隐藏菜单栏
    webviewTag: true,
    // 允许使用 webview 标签
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  searchWindow.on("ready-to-show", () => {
    searchWindow.show();
  });
  searchWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    searchWindow.loadURL("http://localhost:5173/#/search");
  } else {
    searchWindow.loadFile(path.join(__dirname, "../renderer/index.html"), {
      hash: "#/search"
    });
  }
  searchWindow.on("closed", () => {
    searchWindow = null;
  });
};
function createLoginWindow() {
  const loginWindow = new electron.BrowserWindow({
    width: 322,
    height: 450,
    frame: false,
    show: false,
    maximizable: false,
    autoHideMenuBar: true,
    resizable: false,
    webviewTag: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  loginWindow.on("ready-to-show", () => {
    loginWindow.show();
  });
  loginWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    loginWindow.loadURL(`http://localhost:5173/#/login`);
  } else {
    loginWindow.loadFile(path.join(__dirname, "../renderer/index.html"), {
      hash: "#/login"
    });
  }
}
let webRTCWindow = null;
const createWebRTCWindow = (selectedUserUid) => {
  if (webRTCWindow) {
    webRTCWindow.focus();
    return;
  }
  webRTCWindow = new electron.BrowserWindow({
    width: 820,
    height: 600,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    resizable: true,
    webviewTag: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  webRTCWindow.on("ready-to-show", () => {
    webRTCWindow.show();
  });
  webRTCWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    webRTCWindow.loadURL(`http://localhost:5173/#/webRTC`);
  } else {
    webRTCWindow.loadFile(path.join(__dirname, "../renderer/index.html"), {
      hash: "#/webRTC"
    });
  }
  webRTCWindow.on("closed", () => {
    webRTCWindow = null;
  });
  webRTCWindow.webContents.on("did-finish-load", () => {
    webRTCWindow.webContents.send("selectedUserUid", selectedUserUid);
  });
};
let appSetWindow = null;
const createAppSetWindow = () => {
  if (appSetWindow) {
    appSetWindow.focus();
    return;
  }
  appSetWindow = new electron.BrowserWindow({
    width: 840,
    height: 780,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    webviewTag: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  appSetWindow.on("ready-to-show", () => {
    appSetWindow.show();
  });
  appSetWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    appSetWindow.loadURL(`http://localhost:5173/#/appSet`);
  } else {
    appSetWindow.loadFile(path.join(__dirname, "../renderer/index.html"), {
      hash: "#/appSet"
    });
  }
  appSetWindow.on("closed", () => {
    appSetWindow = null;
  });
};
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("minimize-window", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      window.minimize();
    }
  });
  electron.ipcMain.on("setFull-screen", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      if (full === false) {
        window.setFullScreen(true);
        full = true;
      } else {
        window.setFullScreen(false);
        full = false;
      }
    }
  });
  electron.ipcMain.on("close-window", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      window.close();
    }
  });
  let fixed = false;
  electron.ipcMain.handle("fixed-window", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window && fixed === false) {
      fixed = true;
      window.setAlwaysOnTop(true);
      return true;
    } else {
      fixed = false;
      window.setAlwaysOnTop(false);
      return false;
    }
  });
  electron.ipcMain.on("open-home-window", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      window.close();
      createHomeWindow();
    }
  });
  electron.ipcMain.on("local-user", (event, user) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      store.set("user", user);
      console.log("存储用户", store.get("user"));
    }
  });
  electron.ipcMain.on("local-token", (event, userToken) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      store.set("user_token", userToken);
      console.log("储存token", store.get("user_token"));
    }
  });
  electron.ipcMain.handle("search-user", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      console.log("读取用户", store.get("user"));
      return store.get("user");
    }
  });
  electron.ipcMain.handle("search-token", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      console.log("读取token", store.get("user_token"));
      return store.get("user_token");
    }
  });
  electron.ipcMain.handle("delete-user-token", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      store.delete("user_token");
      store.delete("user");
      console.log("token已删除", store.get("user_token"));
      console.log("user已删除", store.get("user"));
    }
  });
  electron.ipcMain.on("update-friend-list", () => {
    const windows = electron.BrowserWindow.getAllWindows();
    windows.forEach((window) => {
      if (window.webContents.getURL().includes("/home")) {
        window.webContents.send("update-friend-list");
        console.log("发送朋友消息给home");
      }
    });
  });
  electron.ipcMain.on("update-window-style", () => {
    const windows = electron.BrowserWindow.getAllWindows();
    windows.forEach((window) => {
      if (window.webContents.getURL().includes("/home")) {
        window.webContents.send("update-window-style");
        console.log("发送样式消息给home");
      }
    });
  });
  electron.ipcMain.handle("local-color-style", (event, color) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      store.set("color", color);
      console.log("储存颜色", store.get("color"));
      return true;
    }
  });
  electron.ipcMain.handle("search-color-style", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      console.log("查询颜色", store.get("color"));
      return store.get("color");
    }
  });
  electron.ipcMain.handle("save-background-image", (event, color, imageData) => {
    const userDataPath = electron.app.getPath("userData");
    const imagePath = path.join(userDataPath, "background_image.png");
    try {
      fs__namespace.writeFileSync(imagePath, Buffer.from(imageData));
      color.background_image = imagePath;
      store.set("color", color);
      console.log("背景图片保存成功", color);
      return true;
    } catch (error) {
      console.error("保存背景图片失败:", error);
      return false;
    }
  });
  electron.ipcMain.handle("get-background-image", (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      const userDataPath = electron.app.getPath("userData");
      const imagePath = path.join(userDataPath, "background_image.png");
      const getColor = store.get("color");
      try {
        if (fs__namespace.existsSync(imagePath) && getColor.background_image) {
          return fs__namespace.readFileSync(imagePath);
        }
        return null;
      } catch (error) {
        console.error("读取背景图片失败:", error);
        return null;
      }
    }
  });
  electron.ipcMain.on("send-url", (event, url) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      electron.shell.openExternal(url).then();
    }
  });
  electron.ipcMain.handle("download-file", async (event, fileUrl) => {
    try {
      const fileName = path__namespace.basename(fileUrl);
      const filePath = path__namespace.join(appDownloadsPath, fileName);
      if (fs__namespace.existsSync(filePath)) {
        return {
          success: true,
          path: filePath,
          message: "文件已存在，直接返回"
        };
      } else {
        return await downloadFile(fileUrl, filePath);
      }
    } catch (error) {
      console.error("下载失败:", error);
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("open-file-location", (event, filePath) => {
    try {
      path__namespace.dirname(filePath);
      electron.shell.showItemInFolder(path__namespace.normalize(filePath));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("get-downloads-path", async (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    if (window) {
      if (!store.get("downloads-path")) {
        store.set("downloads-path", appDownloadsPath);
        return appDownloadsPath;
      } else {
        return store.get("downloads-path");
      }
    }
  });
  electron.ipcMain.handle("set-downloads-path", async (event, newPath) => {
    try {
      if (!fs__namespace.existsSync(newPath)) {
        fs__namespace.mkdirSync(newPath, { recursive: true });
      }
      store.set("downloads-path", newPath);
      return { success: true, path: store.get("downloads-path") };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("open-directory-dialog", async (event) => {
    const window = electron.BrowserWindow.fromWebContents(event.sender);
    const result = await electron.dialog.showOpenDialog(window, {
      properties: ["openDirectory"],
      title: "选择下载目录"
    });
    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0];
    }
    return null;
  });
  createLoginWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createHomeWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
