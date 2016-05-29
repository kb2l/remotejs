var net = require('net');
var robot = require('robotjs')

var HOST = '192.168.1.86';
var PORT = 6969;

var mouse = new Object();
mouse.x = -1;
mouse.y = -1;
mouse.clicked = "False";

net.createServer(function(sock) {

    sock.on('data', function(data) {
        data = data + "";
        var arr = data.split(",");
        // handle mouse
        mouse.x = arr[0];
        mouse.y = arr[1];
        robot.moveMouse(mouse.x, mouse.y);

        mouse.clicked = arr[2];
        if (mouse.clicked === "true") {
            robot.mouseClick("left");
        }

        // handle keyboard
        if (arr.length > 4) {
            var key_value = arr[3];
            if (key_value != ";") {
                console.log(key_value);
                robot.keyTap(key_value);
            }
        }
        sock.write('ok');
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
