const tableify = require('tableify')  
const SerialPort = require('serialport') 
const InterByteTimeout = require('@serialport/parser-inter-byte-timeout')


var port = new SerialPort('/dev/tty.usbmodem14341', { baudRate: 9600}) 

const parser = port.pipe(new InterByteTimeout({interval: 30})) 

parser.on('data', function (data) {
  console.log('Data:', data,data.toString('utf8'));
}); 



const btnRefresh = document.getElementById("btnref")
// const btntes = document.getElementById("btntes")

btnRefresh.addEventListener('click',()=>{ 
  SerialPort.list((err, ports) => {
    console.log('ports', ports);
    if (err) {
      document.getElementById('error').textContent = err.message
      return
    } else {
      document.getElementById('error').textContent = ''
    }
  
    if (ports.length === 0) {
      document.getElementById('error').textContent = 'No ports discovered'
    }
  
    tableHTML = tableify(ports)
    document.getElementById('ports').innerHTML = tableHTML
  }) 
})  