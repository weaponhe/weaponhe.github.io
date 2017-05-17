const {app, BrowserWindow, ipcMain, globalShortcut} = require('electron');
const path = require('path')
const url = require('url')
const configuration = require('./configuration');

var mainWindow = null
var settingsWindow = null
app.on('ready', function () {
  if (!configuration.readSettings('shortcutKeys')) {
    configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
  }
  setGlobalShortcuts();
  mainWindow = new BrowserWindow({
    height: 700,
    width: 368,
    resizable: false,
    frame: false
  })
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // let ret1 = globalShortcut.register('CommandOrControl+shift+1', function () {
  //   console.log("press CommandOrControl+shift+1")
  //   mainWindow.webContents.send('global-shortcut', 0);
  // });
  //
  // if (!ret1) {
  //   console.log(`registration 'ctrl+shift+1' failed`)
  // }
  //
  // let ret2 = globalShortcut.register('CommandOrControl+shift+2', function () {
  //   console.log("press CommandOrControl+shift+2")
  //   mainWindow.webContents.send('global-shortcut', 1);
  // });
  // if (!ret2) {
  //   console.log(`registration 'ctrl+shift+2' failed`)
  // }
})

ipcMain.on('close-main-window', function () {
  app.quit();
});
ipcMain.on('close-settings-window', function () {
  settingsWindow.close()
});

ipcMain.on('open-settings-window', function () {
  if (settingsWindow) {
    return
  }
  settingsWindow = new BrowserWindow({
    height: 200,
    width: 200,
    resizable: false,
    frame: false
  })

  settingsWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/settings.html'),
    protocol: 'file:',
    slashes: true
  }))
  settingsWindow.on('closed', function () {
    settingsWindow = null
  })
})

ipcMain.on('set-global-shortcuts', function () {
  setGlobalShortcuts();
});

function setGlobalShortcuts() {
  globalShortcut.unregisterAll();

  var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
  var shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

  globalShortcut.register(shortcutPrefix + '1', function () {
    mainWindow.webContents.send('global-shortcut', 0);
  });
  globalShortcut.register(shortcutPrefix + '2', function () {
    mainWindow.webContents.send('global-shortcut', 1);
  });
}