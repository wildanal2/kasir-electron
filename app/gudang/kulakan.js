//
const electron = require('electron')
const ipc = electron.ipcRenderer
const remote = electron.remote
const path = require('path')
const url = require('url')
const SerialPort = require('serialport')
const InterByteTimeout = require('@serialport/parser-inter-byte-timeout')
var dt = require('datatables.net')()
const Store = require('electron-store')

// const
const store = new Store()
var port = new SerialPort(store.get('scanner_port'), { autoOpen: false });

function connectPort() {
    port = new SerialPort(store.get('scanner_port'), {
        baudRate: store.get('scanner_bus')
    })
    parser = port.pipe(new InterByteTimeout({ interval: 30 }))
    port.on('open', function () {
        portwaiting()
    })
    parser.on('data', function (data) {
        console.log('Data:', data, data.toString('utf8'));
        skutxt.innerHTML = data.toString('utf8');
    })
    port.on('error', function (err) {
        console.log('Error: ', err.message)
        porterrorordc()
        // reconnectPortNew()
    })
    port.on('close', function (error) {
        if (error.disconnected === true) {
            console.log("disconnected")
            porterrorordc()
            // reconnectPortNew()
        }
    })
}

connectPort()
port.isopen // iki kt ngecek is open opo ngak

// check for connection errors or drops and reconnect
var reconnectPortNew = function () {
    if (!port.isOpen) {
        console.log('INITIATING RECONNECT');
        port.close()
        setTimeout(function () {
            console.log('RECONNECTING TO PORT');
            connectPort();
        }, 2000);
    }
};

// element
const skutxt = document.getElementById("skuid")
const btntes = document.getElementById("btnref")
const fixbtnscanner = document.getElementById("fixbtnscanner")
const fixbtndatabase = document.getElementById("fixbtndatabase")

//btn addev
btntes.addEventListener('click', () => {
    ipc.send("send-tosave-sku", "999999999")

    var pop = new remote.BrowserWindow({
        modal: true,
        parent: remote.getCurrentWindow(),
        width: 1280,
        height: 768,
        transparent: false, frame: true, taskbar: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    pop.webContents.openDevTools()
    pop.loadURL(url.format({
        pathname: path.join(__dirname, '/barangBaru.html'),
        protocol: 'file:',
        slashes: true
    }))
})
fixbtnscanner.addEventListener('click', () => {
    ipc.send('third-fixserialport')
})

// fun
function porterrorordc() {
    document.getElementById("infoportarea").classList.remove("alert-success");
    document.getElementById("infoportarea").classList.add("alert-danger");
    skutxt.innerHTML = "Scanner tidak terhubung"
    // layanan
    document.getElementById("lbscanner").innerHTML = "Scanner - tidak tersambung"
    document.getElementById("lbscanner").style.color = 'red'
    $("#chklbscanner").prop('checked', false);
    fixbtnscanner.style.display = "inline"
}
function portwaiting() {
    document.getElementById("infoportarea").classList.remove("alert-danger");
    document.getElementById("infoportarea").classList.add("alert-success");
    skutxt.innerHTML = "menuggu scanner..."
    // layanan
    document.getElementById("lbscanner").innerHTML = "Scanner - ok"
    document.getElementById("lbscanner").style.color = 'green'
    $("#chklbscanner").prop('checked', true);
    fixbtnscanner.style.display = "none"
}

$(document).ready(function () {
    $('#example').DataTable();
    $('#myTab li:last-child a').tab('show')


    function getDateTime() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length == 1) {
            month = '0' + month;
        }
        if (day.toString().length == 1) {
            day = '0' + day;
        }
        if (hour.toString().length == 1) {
            hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            second = '0' + second;
        }
        var dateTime = day + '-' + month + '-' + year + ',   ' + hour + ':' + minute + ':' + second;
        return dateTime;
    }

    // example usage: realtime clock
    setInterval(function () {
        currentTime = getDateTime();
        document.getElementById("digital-clock").value = currentTime;
    }, 1000);
});

remote.getCurrentWindow().on("focus", () => {
    console.log("window is Focuiss")
    reconnectPortNew()
})
remote.getCurrentWindow().on("hide", () => {
    console.log("window is hidee")
})

