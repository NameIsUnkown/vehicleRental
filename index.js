const { app, BrowserWindow } = require('electron');
const VehicleModel = require("./dataModel");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.loadFile('./renderer/html/index.html')
}

app.whenReady().then(() => {
  createWindow()

  formWindow()
})

const formWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.loadFile('./renderer/html/form.html')
}
