/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		get the amulet from viper temple
*/

function amulet () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting amulet');
	me.overhead("amulet");

	if (!Pather.checkWP(44)) {
		Pather.getWP(44);
	} else {
		Pather.useWaypoint(44);
	}

	Precast.doPrecast(true);
	Pather.clearToExit(44, 45, true); // Go to Valley Of Snakes.
	Pather.clearToExit(45, 58, true); // Go to Claw Viper Temple Level 1
	Pather.clearToExit(58, 61, true); // Go to Claw Viper Temple Level 2
	Precast.doPrecast(true);

	if (me.classid !== 1 || me.classid === 1 && me.charlvl <= respecOne) {
		Pather.moveTo(15065, 14047);
		Pather.moveTo(15063, 14066);
		Pather.moveTo(15051, 14066);
		Pather.moveTo(15045, 14051);
	} else {
		Pather.moveTo(15045, 14051, null, false);
	}

	Quest.collectItem(521, 149);
	Town.npcInteract("drognan");
	Quest.stashItem(521);

	return true;
}
