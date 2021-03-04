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
		Pather.getWP(48, true);
	} else {
		Pather.useWaypoint(48);
	}

	Precast.doPrecast(true);
	Pather.clearToExit(48, 49, true); //Sewers 2 -> Sewers 3
	Pather.moveToPreset(me.area, 2, 355);
	Attack.killTarget("Radament");
	Pickit.pickItems();
	Town.npcInteract("atma");
	Town.unfinishedQuests();

	return true;
}
