/*
*	@filename	heart.js
*	@author		isid0re
*	@desc		get the heart for khalims will
*/

function heart () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting heart');
	me.overhead("heart");

	if (!Pather.checkWP(80)) {
		Pather.getWP(80, true);
	} else {
		Pather.useWaypoint(80);
	}

	Precast.doPrecast(true);

	Pather.clearToExit(80, 92, true); //Kurast Bazaar -> A3 Sewers lvl 1
	Pather.clearToExit(92, 93, true); //A3 Sewers lvl 1 -> A3 Sewers lvl 2

	if (!Pather.moveToPreset(me.area, 2, 405)) {
		print('ÿc9SoloLevelingÿc0: Failed to get the heart');
	}

	Attack.clear(0x7); // clear level
	Quest.collectItem(554, 405);
	Quest.stashItem(554);

	return true;
}
