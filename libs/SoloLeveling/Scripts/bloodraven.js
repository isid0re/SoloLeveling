/*
*	@filename	bloodraven.js
*	@author		isid0re
*	@desc		kill bloodraven for free merc normal a1 and maus MF hunting for endgame
*/

function bloodraven () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting blood raven');

	let tick = getTickCount();
	if(shouldLog){
		Performance.updateStats("bloodraven", "TotalAttempts");	
	}

	if (!Pather.checkWP(3)) {
		Pather.getWP(3);
	} else {
		Pather.useWaypoint(3);
	}

	Precast.doPrecast(true);

	if (me.diff === 0) {
		me.overhead("blood raven");
		Attack.clear(0x7);
		Pather.moveToExit(17, true);
		Pather.moveToPreset(17, 1, 805);
		Attack.killTarget("Blood Raven");
		Pickit.pickItems();
		Town.npcInteract("kashya");

		if(Misc.checkQuest(2,0) && shouldLog){
			Performance.updateStats("bloodraven", "TotalTime");
			Performance.updateStats("bloodraven", "checkTimes", getTickCount() - tick);
		}

		return true;
	}

	me.overhead("mausoleum");

	tick = getTickCount();
	if(shouldLog){
		Performance.updateStats("mausoleum", "TotalAttempts");
	}

	if (!Pather.moveToExit([17, 19], true)) {
		print("ÿc9SoloLevelingÿc0: Failed to move to Mausoleum");
	}

	Attack.clearLevel();

	if(shouldLog){
		Performance.updateStats("mausoleum", "nonquestavg", getTickCount() - tick);
		Performance.updateStats("mausoleum", "checkTimes", getTickCount() - tick);
	}

	return true;
}