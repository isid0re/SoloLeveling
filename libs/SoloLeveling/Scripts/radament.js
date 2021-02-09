/*
*	@filename	radament.js
*	@author		isid0re
*	@desc		radament quest for skillbook
*/

function radament () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting radament');
	me.overhead("radament");

	let tick = getTickCount();
	if(shouldLog){
		Performance.updateStats("radament", "TotalAttempts");
	}

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
	Town.npcInteract("atma");
	Town.unfinishedQuests();

	if(Misc.checkQuest(9,0) && shouldLog){
		Performance.updateStats("radament", "TotalTime");
		Performance.updateStats("radament", "checkTimes", getTickCount() - tick);
	}

	return true;
}