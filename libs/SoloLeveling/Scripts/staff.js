/*
*	@filename	staff.js
*	@author		isid0re
*	@desc		maggot lair for staff needed for act2 quests
*/

function staff () {
	if (!me.getItem(521)) {
		this.amulet();
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting staff');
	me.overhead("staff");

	let tick = getTickCount();
	if(shouldLog){
		Performance.updateStats("staff", "TotalAttempts");	
	}

	if (!Pather.checkWP(43)) {
		Pather.getWP(43);
	} else {
		Pather.useWaypoint(43);
	}

	Precast.doPrecast(true);

	if (!Pather.moveToExit([62, 63, 64], true) || !Pather.moveToPreset(me.area, 2, 356)) {
		return false;
	}

	Quest.collectItem(92, 356);

	if(me.getItem(92) && shouldLog){
		Performance.updateStats("staff", "TotalTime");
		Performance.updateStats("staff", "checkTimes", getTickCount() - tick);
	}

	Quest.stashItem(92);

	return true;
}