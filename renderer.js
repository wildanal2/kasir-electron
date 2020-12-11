const SerialPort = require('serialport')
const InterByteTimeout = require('@serialport/parser-inter-byte-timeout')


// var port = new SerialPort('/dev/tty.usbmodem14101', { baudRate: 9600 })
// const parser = port.pipe(new InterByteTimeout({ interval: 30 }))
// parser.on('data', function (data) {
//   console.log('Data:', data, data.toString('utf8'));
// });



const btnRefresh = document.getElementById("btnG");

btnRefresh.addEventListener('click', () => {
    SerialPort.list().then(ports => {
        ports.forEach(function (port) {
            console.log(port.path);
            console.log(port.pnpId);
            console.log(port.manufacturer);
        });
        // document.getElementById('ports').innerHTML = tableHTML
    });
})  