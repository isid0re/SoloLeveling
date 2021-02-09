/*
*	@filename	brain.js
*	@author		isid0re
*	@desc		get brain for khalims will
*/

function brain () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting brain');
	me.overhead("brain");

	let tick = getTickCount();
	if(shouldLog){
		Performance.updateStats("brain", "TotalAttempts");	
	}

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

	if(me.getItem(555) && shouldLog){
		Performance.updateStats("brain", "TotalTime");
		Performance.updateStats("brain", "checkTimes", getTickCount() - tick);
	}

	Quest.stashItem(555);

	return true;
}