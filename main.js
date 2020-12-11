const electron = require('electron')
// Module to control application life.
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const ipc = electron.ipcMain
const Store = require('electron-store')
const { event } = require('jquery')

// require('electron-reload')(__dirname + '/index.html', {
require('electron-reload')(__dirname + '/app/gudang/kulakan.html', {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

let mainWindow, secondchildWindow, thirdchildwindow;

function createWindow() {
    // Create the browser window.
    // let { width, height } = store.get('windowBounds');
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        // pathname: path.join(__dirname, '/app/gudang/kulakan.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    process.env.NODE_ENV !== 'production';

    const store = new Store();

    store.set('unicorn', '🦄');
    console.log(store.get('unicorn'));

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', () => {
    createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// ===== IPC MOMenT ====
ipc.on('btn-back', (event) => {
    mainWindow.webContents.goBack()
})

ipc.on('btn-close-third', (event) => {
    // secondchildWindow.webContents.goBack();
    // thirdchildwindow.
})

ipc.on('newkulakan', (event) => {
    secondchildWindow = new BrowserWindow({
        width: 1300,
        height: 900,
        alwaysOnTop: true,
        parent: mainWindow,
        title: 'child',
        webPreferences: {
            nodeIntegration: true
        }
    });
    secondchildWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/app/gudang/kulakan.html'),
        protocol: 'file:',
        slashes: true
    }))
    secondchildWindow.webContents.openDevTools();
    // secondchildWindow.setAlwaysOnTop(true, "pop-up-menu")
    secondchildWindow.once('ready-to-show', () => {
        secondchildWindow.show()
    });
})

ipc.on('third-fixserialport', (event) => {
    thirdchildwindow = new BrowserWindow({
        parent: secondchildWindow,
        modal: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    thirdchildwindow.webContents.openDevTools()
    thirdchildwindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/fixserialusb.html'),
        protocol: 'file:',
        slashes: true
    }))
})


// == IPC - Parsing Data TEMp == \\
var dataSKU = ""
ipc.on('send-tosave-sku', (event, data) => {
    dataSKU = data
    console.log("data sku saved :" + dataSKU)
})
ipc.on('send-toget-sku', (event, data) => {
    console.log("get data sku :" + dataSKU)
    event.returnValue = dataSKU;
})
