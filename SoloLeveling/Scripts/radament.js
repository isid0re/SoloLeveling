/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function radament () {
	if (!Pather.accessToAct(2) || Misc.checkQuest(9, 0)) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting radament');
	me.overhead("radament");

	if (!Pather.checkWP(48)) {
		Pather.getWP(48);
	} else {
		Pather.useWaypoint(48);
	}

	Precast.doPrecast(true);

	Pather.moveToExit(49, true);
	Pather.moveToPreset(me.area, 2, 355);
	Attack.killTarget("Radament");
	Pickit.pickItems();
	Town.goToTown();
	Town.unfinishedQuests();
	Town.npcInteract("atma");

	return true;
};
