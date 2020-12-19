/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function cube () {
	if (!Pather.accessToAct(2) || me.getItem(549)) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting cube');
	me.overhead("cube");

	if (!Pather.checkWP(57)) {
		Pather.getWP(57);
	} else {
		Pather.useWaypoint(57);
	}

	Precast.doPrecast(true);
	Pather.moveToExit(60, true);
	Pather.moveToPreset(me.area, 2, 354);
	Attack.securePosition(me.x, me.y, 30, 3000, true);
	Quest.collectItem(549, 354);
	Town.goToTown();
	Quest.stashItem(549);

	return true;
};
