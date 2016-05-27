var net = require('net');
var robot = require('robotjs')

var HOST = '192.168.1.86';
var PORT = 6969;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    //console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {

        //console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('ok');
        //console.log ("accuse reception: " + data);
        data = data + "";
        var arr = data.split(",");
        var x= arr[0];
        var y=arr[1];
        robot.moveMouse(x,y);


	if("true"==arr[2])
	{
	  console.log("Left mouse is clicked");
	  robot.mouseClick("left");
  	}
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
