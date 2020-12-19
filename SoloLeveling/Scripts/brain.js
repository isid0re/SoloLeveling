/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function brain () {
	if (!Pather.accessToAct(3) || me.getItem(555) || me.getItem(174) || Misc.checkQuest(18, 0)) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting brain');
	me.overhead("brain");

	if (!Pather.checkWP(78)) {
		Pather.getWP(78);
	} else {
		Pather.useWaypoint(78);
	}

	Precast.doPrecast(true);

	if (!Pather.moveToExit([88, 89, 91], true) || !Pather.moveToPreset(me.area, 2, 406)) {
		print('ÿc9SoloLevelingÿc0: Failed to get the Brain');
	}

	Attack.clear(0x7);
	Quest.collectItem(555, 406);
	Town.goToTown();
	Quest.stashItem(555);

	return true;
};