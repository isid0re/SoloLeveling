/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function staff () {
	if (!Pather.accessToAct(2) || me.getItem(91) || me.getItem(92) || Misc.checkQuest(10, 0)) {
		return true;
	}

	if (!me.getItem(521)) {
		this.amulet();
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting staff');
	me.overhead("staff");

	if (!Pather.checkWP(43)) {
		Pather.getWP(43);
	} else {
		Pather.useWaypoint(43);
	}

	Precast.doPrecast(true);

	if (!Pather.moveToExit([62, 63, 64], true) || !Pather.moveToPreset(me.area, 2, 356)) {
		return false;
	}

	Quest.collectItem(92, 356);
	Town.goToTown();
	Quest.stashItem(92);

	if (me.getItem(92) && me.getItem(521)) {
		Quest.cubeItems(91, 92, 521);
	}

	return true;
};
