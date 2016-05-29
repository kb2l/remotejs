var net = require('net');
var robot = require('/home/kbelaid/remotejs/build/Release/robotjs');

var HOST = '192.168.1.86';
var PORT = 6969;

var mouse_clicked = false;
var key_pressed =  false;

var child_proc_mouse_detect = function() {
    var exec = require('child_process').exec;
    exec('node ./src/tcpIp/CatchMouseClickEvent.js', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        mouse_clicked = true;
        child_proc_mouse_detect();
    });
};

var child_proc_key_press_detect = function() {
    var exec = require('child_process').exec;
    exec('node ./src/tcpIp/CatchKeyPressEvent.js', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        key_pressed = true;
        //child_proc_key_press_detect();
    });
};

var client = new net.Socket();
client.connect(PORT, HOST, function() {
  client.write("Yo");var HOST = '192.168.1.86';
var PORT = 6969;
  child_proc_mouse_detect();
  child_proc_key_press_detect();
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    var mouse = robot.getMousePos();
    var to_send = mouse.x + "," + mouse.y + "," + mouse_clicked.toString();
    client.write(to_send);
    mouse_clicked=false;
    if(key_pressed)
      console.log("a key was pressed !!!");
    key_pressed=false;
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
