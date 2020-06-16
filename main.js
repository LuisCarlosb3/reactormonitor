const { app, BrowserWindow, Menu, ipcMain } = require('electron')
let configWindow
let win
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 730,
    title: 'Reactor monitor',
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true
    }
  })
  // and load the index.html of the app.
  win.loadFile('index.html')
  win.setResizable(false)
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  // Insert menu
  Menu.setApplicationMenu(mainMenu)
  win.on('closed', function () {
    app.quit()
  })
}
// Catch item:add
ipcMain.on('item:add', function (e, item) {
  win.webContents.send('item:add', item)
  configWindow.close()
  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
  // addWindow = null;
})
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click () {
          app.quit()
        }
      }
    ]
  }
]
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
        click (item, focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      }
    ]
  })
}
app.whenReady().then(createWindow)
