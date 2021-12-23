/*
*	@filename	radament.js
*	@author		isid0re
*	@desc		radament quest for skillbook
*/

function radament () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting radament');
	me.overhead("radament");

	if (!Pather.checkWP(48)) {
		Town.goToTown(2);
		Pather.moveToExit(47, true);
		Pather.getWP(48);
	} else {
		Pather.useWaypoint(48);
	}

	Precast.doPrecast(true);
	Pather.moveToExit(49, true);
	Pather.moveToPreset(me.area, 2, 355);

	try {
		Attack.kill("Radament");
		Pickit.pickItems();
	} catch (err) {
		print('ÿc9SoloLevelingÿc0: Failed to kill Radament');
	}

	Town.npcInteract("atma");
	Town.unfinishedQuests();

	return true;
}
