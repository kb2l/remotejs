var robot = require('/home/kbelaid/remotejs/build/Release/robotjs');
var Worker = require('webworker-threads').Worker;

var child_proc_mouse_detect = function() {
    var exec = require('child_process').exec;
    exec('node ./mouseClickDetect.js', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        child_proc_mouse_detect();
    });
};

child_proc_mouse_detect();

console.log("next");
//Speed up the mouse.
robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

for (var x = 0; x < width; x++) {
    y = height * Math.sin((twoPI * x) / width) + height;
    robot.moveMouse(x, y);
}
