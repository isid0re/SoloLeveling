/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function lowerkurast () {
	if (!Pather.accessToAct(3) || me.diff === 0) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting lower kurast');
	me.overhead("lower kurast");

	if (!Pather.checkWP(79)) {
		Pather.getWP(79);
	} else {
		Pather.useWaypoint(79);
	}

	Precast.doPrecast(true);
	Misc.openChestsInArea(79);

	return true;
};
