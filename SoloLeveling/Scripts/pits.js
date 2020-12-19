/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function pits () {
	if (me.charlvl < respecTwo) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting pits');
	me.overhead("pits");

	if (!Pather.checkWP(6)) {
		Pather.getWP(6);
	} else {
		Pather.useWaypoint(6);
	}

	Precast.doPrecast(true);

	if (!Pather.moveToExit([7, 12], true)) {
		print("ÿc9SoloLevelingÿc0: Failed to move to Pit level 1");
	}

	Attack.clearLevel();

	if (!Pather.moveToExit(16, true)) {
		print("ÿc9SoloLevelingÿc0: Failed to move to Pit level 2");
	}

	Attack.clearLevel();
	Misc.openChestsInArea(16);

	return true;
};
