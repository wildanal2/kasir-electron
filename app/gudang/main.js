const electron = require('electron')
const url = require('url')
const path = require('path')
const ipc = electron.ipcRenderer
const remote = electron.remote
window = remote.getCurrentWindow()
var dt = require('datatables.net')()

const back = document.getElementById("btnBac")
const kulakan = document.getElementById("btnTambahKulakan")

// click btn
back.addEventListener('click', () => {
    // ipc.send('btn-back')
    // ipc.send('btn-ping')
})
kulakan.addEventListener('click', () => {
    ipc.send('newkulakan')
    // childWindow = new remote.BrowserWindow({
    //     show: false,
    //     alwaysOnTop: true,
    //     parent: remote.getCurrentWindow(),
    //     width: 1280,
    //     height: 768
    // });
    // childWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, 'kulakan.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }))
    // childWindow.once('ready-to-show', () => {
    //     childWindow.show()
    // });
})


$(document).ready(function () {
    $('#example').DataTable();

    console.log('ini log jquery')
});