const electron = require('electron')
const ipc = electron.ipcRenderer
const remote = electron.remote
window = remote.getCurrentWindow()
var dt = require('datatables.net')()

const back = document.getElementById("btnBac")
const kulakan = document.getElementById("btnTambahKulakan")

// click btn
back.addEventListener('click', () => {
    ipc.send('btn-back')
})
kulakan.addEventListener('click', () => {
    ipc.send('newkulakan')
})


$(document).ready(function () {
    $('#example').DataTable();

    console.log('ini log jquery')
});