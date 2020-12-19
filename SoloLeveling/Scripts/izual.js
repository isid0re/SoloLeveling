/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function izual () {
	if (Misc.checkQuest(25, 0) || !Pather.accessToAct(4)) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting izual');
	me.overhead("izual");

	if (!Pather.checkWP(106)) {
		Pather.getWP(106);
	} else {
		Pather.useWaypoint(106);
	}

	Precast.doPrecast(true);

	if (!Misc.checkQuest(25, 1)) {
		Pather.moveToPreset(105, 1, 256);
		Attack.killTarget("Izual");
	}

	Town.goToTown();
	Town.npcInteract("tyrael");

	return true;
};
