var robot = require("robotjs");
var net = require('net');

var HOST = '192.168.1.86';
var PORT = 6969;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
  client.write("Yo");
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

    //console.log('DATA: ' + data);
    // Close the client socket completely

    var mouse = robot.getMousePos();
    var to_send = mouse.x + ", " + mouse.y;
    client.write(to_send);

    //client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
