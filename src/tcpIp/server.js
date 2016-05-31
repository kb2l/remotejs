var net = require('net');
var robot = require('/home/kbelaid/remotejs/build/Release/robotjs')

var HOST = '192.168.1.86';
var PORT = 6969;

var mouse = new Object();
mouse.x = -1;
mouse.y = -1;
mouse.clicked = "False";

net.createServer(function(sock) {

    sock.on('data', function(data) {
        try {

        } catch (e) {

        } finally {

        }
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
            var chars = arr[3].split('');
            for (var x in chars) {
                try {
                    robot.keyTap(key_value);
                } catch (e) {
                    console.log("key " + key_value + " is not handled yet!!");
                }
            }
        }
        sock.write('ok');
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
