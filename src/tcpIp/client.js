var net = require('net');
var robot = require('/home/kbelaid/remotejs/build/Release/robotjs');

var HOST = '192.168.1.86';
var PORT = 6969;

var is_click_event = false;
var is_key_event = false;

var mouse_event = new Object();
mouse_event.clicked = false;
mouse_event.button = "left";
mouse_event.x = -1;
mouse_event.y = -1;

var key_event = new Object();
key_event.keySym = -1;
key_event.state = -1;

var child_proc_mouse_detect = function() {
    var exec = require('child_process').exec;
    exec('node ./src/tcpIp/CatchMouseClickEvent.js', function(error, event, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        } else {
            event = event.split(',');
            mouse_event.button = event[0];
            mouse_event.x = event[1];
            mouse_event.y = event[2];
            is_click_event = true;
        }

        child_proc_mouse_detect();
    });
};

var child_proc_key_press_detect = function() {
    var exec = require('child_process').exec;
    exec('node ./src/tcpIp/CatchKeyPressEvent.js', function(error, event, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        } else {
            event = event.split(',');
            if (event.length === 2) {
                key_event.keySym = parseInt(event[0]);
                key_event.state = parseInt(event[1]);
                is_key_event = true;
            }
        }

        if (key_event.keySym != 65307) // escape
            child_proc_key_press_detect();
    });
};

var client = new net.Socket();
client.connect(PORT, HOST, function() {
    client.write("Yo");
    var HOST = '192.168.1.86';
    var PORT = 6969;
    child_proc_mouse_detect();
    child_proc_key_press_detect();
});

client.on('data', function(data) {
    var mouse = robot.getMousePos();
    var msg = mouse.x + "," + mouse.y + "," + is_click_event.toString();
    is_click_event = false;

    if (is_key_event) {
            msg += "," + String.fromCharCode(key_event.keySym) + "," + key_event.state;
            is_key_event = false;
            //console.log(msg);
    }

    client.write(msg);
});

client.on('close', function() {
    console.log('Connection closed');
});
