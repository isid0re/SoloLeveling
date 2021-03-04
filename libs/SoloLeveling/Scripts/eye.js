/*
*	@filename	eye.js
*	@author		isid0re
*	@desc		get the eye for khalims will
*/

function eye () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting eye');
	me.overhead("eye");

	if (!Pather.checkWP(76)) {
		Pather.getWP(76, true);
	} else {
		Pather.useWaypoint(76);
	}

	Precast.doPrecast(true);

	Pather.clearToExit(76, 85, true); //Spider Forest -> Spider Cavern

	Town.doChores();
	Town.buyPots(10, "Antidote"); // antidote
	Town.drinkPots();
	Pather.usePortal(85, me.name);
	Pather.moveToPreset(me.area, 2, 407);
	Attack.clear(0x7);
	Quest.collectItem(553, 407);
	Quest.stashItem(553);

	return true;
}
