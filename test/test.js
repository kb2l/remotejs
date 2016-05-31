var robot = require('/home/kbelaid/remotejs/build/Release/robotjs');
try {
    robot.keyTap()
} catch (e) {
    console.log(e);
} finally {
    console.log("Finaly");
}
