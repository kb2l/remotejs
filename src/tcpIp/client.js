var net = require('net');
var robot = require('/home/kbelaid/remotejs/build/Release/robotjs');
var HOST = '192.168.1.86';
var PORT = 6969;

var mouse_clicked = false;

var child_proc_mouse_detect = function() {
    var exec = require('child_process').exec;
    exec('node ./mouseClickDetect.js', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        mouse_clicked = true;
        child_proc_mouse_detect();
    });
};



var client = new net.Socket();
client.connect(PORT, HOST, function() {
  client.write("Yo");
  child_proc_mouse_detect();
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    //console.log('DATA: ' + data);
    // Close the client socket completely
    var mouse = robot.getMousePos();
    var to_send = mouse.x + "," + mouse.y + "," + mouse_clicked.toString();

    //console.log(to_send);
    client.write(to_send);
    mouse_clicked=false;
    //client.destroy();
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
