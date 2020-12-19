/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function tome () {
	if (!Pather.accessToAct(3) || Misc.checkQuest(17, 0)) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting tome');
	me.overhead("tome");

	if (!Pather.checkWP(80)) {
		Pather.getWP(80);
	} else {
		Pather.useWaypoint(80);
	}

	Precast.doPrecast(true);

	if (!Pather.moveToExit(94, true) || !Pather.moveToPreset(me.area, 2, 193)) {
		print('ÿc9SoloLevelingÿc0: Failed to get LamEssen Tome');
	}

	Quest.collectItem(548, 193);
	Town.goToTown();
	Town.unfinishedQuests();

	return true;
};