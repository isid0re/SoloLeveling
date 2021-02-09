/*
*	@filename	countess.js
*	@author		isid0re
*	@desc		countess runs for rune based gear.
*/

function countess () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting countess');
	me.overhead("countess");

	var forQuest = false;
	let tick = getTickCount();
	if(!Misc.checkQuest(5, 0)){
		forQuest = true;
		Performance.updateStats("countess", "TotalAttempts");
	}else{
		forQuest = false;
		Performance.updateStats("countessMF", "TotalAttempts");
	}

	if (!Pather.checkWP(6)) {
		Pather.getWP(6);
	} else {
		Pather.useWaypoint(6);
	}

	Precast.doPrecast(true);
	let floors = [20, 21, 22, 23, 24, 25];

	try {
		if (me.charlvl < 12) {
			for (let i = 0; i < floors.length; i += 1) {
				Pather.moveToExit(floors[i], true);
				Attack.clear(0x7);
			}
		} else {
			Pather.moveToExit(floors, true);
		}

		Pather.moveToPreset(me.area, 2, 580);
		Attack.clear(20, 0, getLocaleString(2875));
	} catch (err) {
		print('ÿc9SoloLevelingÿc0: Failed to kill Countess');
	}

	Pickit.pickItems();

	if(shouldLog){
		if(!forQuest){
			Performance.updateStats("countessMF", "nonquestavg", getTickCount() - tick);
			Performance.updateStats("countessMF", "checkTimes", getTickCount() - tick);
		}	
	}

	return true;
}
