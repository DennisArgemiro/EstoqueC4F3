const { app, BrowserWindow, screen } = require("electron")
require("./server")



const createWindow = () => {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize

    const win = new BrowserWindow({
        width,
        height,
        titleBarOverlay: true,
        icon: "./public/images/icon.png",
        webPreferences:{
            
        }
    })
    win.maximize()
    win.loadURL('http://localhost:8080')
}

app.whenReady().then(() => {
    createWindow()
})