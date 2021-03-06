var test = require('tape');
var robot = require('/home/kbelaid/remotejs/build/Release/robotjs');

//TODO: Need tests for keyToggle, typeString, typeStringDelayed, and setKeyboardDelay.

test('Tap a key.', function(t)
{
	t.plan(4);
	t.ok(robot.keyTap("a") === 1, 'successfully tapped "a".');
	t.ok(robot.keyTap("a", "control") === 1, 'successfully tapped "ctrl+a".');

	t.throws(function()
	{
		robot.keyTap();
	}, /Invalid number/, 'tap nothing.');

	t.throws(function()
	{
		robot.keyTap();
	}, /Invalid number/, 'tap "ctrl+a" with an extra argument.');
});

// This test won't fail if there's an issue, but it will help you identify an issue if ran locally.
test('Tap all keys', function(t)
{
	var chars = 'abcdefghijklmnopqrstuvwxyz1234567890,./;\'[]\\'.split('');

	for (var x in chars)
	{
		t.ok(robot.keyTap(chars[x]), 'tap ' + chars[x] + '.');
	}

	t.end();
});
