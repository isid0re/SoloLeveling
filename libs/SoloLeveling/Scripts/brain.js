/*
*	@filename	brain.js
*	@author		isid0re
*	@desc		get brain for khalims will
*/

function brain () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting brain');
	me.overhead("brain");

	if (!Pather.checkWP(78)) {
		Pather.getWP(78, true);
	} else {
		Pather.useWaypoint(78);
	}

	Precast.doPrecast(true);

	Pather.clearToExit(78, 88, true);	//Setting this to true to clear path but I think there should be a teleport check because if a sorc can teleport then why clear her path?
	Pather.clearToExit(88, 89, true);	
	Pather.clearToExit(89, 91, true);

	if (!Pather.moveToPreset(me.area, 2, 406)) {
		print('ÿc9SoloLevelingÿc0: Failed to get the Brain');
	}

	Attack.clear(0x7);
	Quest.collectItem(555, 406);
	Quest.stashItem(555);

	return true;
}
