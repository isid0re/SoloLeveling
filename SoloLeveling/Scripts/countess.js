/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function countess () {
	if (me.diff === 0 && haveItem("shield", "runeword", "Ancients' Pledge") && haveItem("armor", "runeword", "Stealth") || me.diff === 2 && me.charlvl < respecTwo || me.diff === 2 && me.classid === 1) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting countess');
	me.overhead("countess");

	if (!Pather.checkWP(6)) {
		Pather.getWP(6);
	} else {
		Pather.useWaypoint(6);
	}

	Precast.doPrecast(true);

	try {
		Pather.moveToExit([20, 21, 22, 23, 24, 25], true);
		Pather.moveToPreset(me.area, 2, 580);
		Attack.clear(20, 0, getLocaleString(2875));
	} catch (err) {
		print('ÿc9SoloLevelingÿc0: Failed to kill Countess');
	}

	Pickit.pickItems();

	return true;
};
