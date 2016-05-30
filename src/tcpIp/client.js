var net = require('net');
var robot = require('/home/kbelaid/remotejs/build/Release/robotjs');

var HOST = '192.168.1.86';
var PORT = 6969;

var is_click_event = false;
var mouse_event = new Object();
mouse_event.clicked = false;
mouse_event.button = "left";
mouse_event.x = -1;
mouse_event.y = -1;


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

var key_queue = [];
var escape = false;

var child_proc_key_press_detect = function() {
    var exec = require('child_process').exec;
    exec('node ./src/tcpIp/CatchKeyPressEvent.js', function(error, event, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        } else {
            event = event.split(',');
            if (event.length === 2) {
                var key_event = new Object();
                key_event.keySym = parseInt(event[0]);
                key_event.state = parseInt(event[1]); // just for debug : I will probably need this later
                key_queue.push(key_event);
                if (key_event.keySym != 65307) // escape
                    escape = true;
            }
        }

        if (!escape)
            child_proc_key_press_detect();
    });
};

var client = new net.Socket();
client.connect(PORT, HOST, function() {
    client.write("Hi");
    child_proc_mouse_detect();
    child_proc_key_press_detect();
});

client.on('data', function(data) {
    var mouse = robot.getMousePos();
    var msg = mouse.x + "," + mouse.y + "," + is_click_event.toString();
    is_click_event = false;

    while (key_queue.length > 0) {
        var key_event = key_queue.shift();
        msg += "," + String.fromCharCode(key_event.keySym);
        is_key_event = false;
        console.log(msg);
    }

    client.write(msg);
});

client.on('close', function() {
    console.log('Connection closed');
});
