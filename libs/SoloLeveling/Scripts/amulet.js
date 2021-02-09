/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		get the amulet from viper temple
*/

function amulet () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting amulet');
	me.overhead("amulet");

	let tick = getTickCount();
	if(shouldLog){
		Performance.updateStats("amulet", "TotalAttempts");
	}

	if (!Pather.checkWP(44)) {
		Pather.getWP(44);
	} else {
		Pather.useWaypoint(44);
	}

	Precast.doPrecast(true);
	Pather.moveToExit([45, 58, 61], true);
	Precast.doPrecast(true);

	if (me.classid !== 1 || me.classid === 1 && me.charlvl <= respecOne) {
		Pather.moveTo(15065, 14047);
		Pather.moveTo(15063, 14066);
		Pather.moveTo(15051, 14066);
	}

	Pather.moveTo(15045, 14051);
	Quest.collectItem(521, 149);
	Town.npcInteract("drognan");

	if(Misc.checkQuest(11,0) && shouldLog){
		Performance.updateStats("amulet", "TotalTime");
		Performance.updateStats("amulet", "checkTimes", getTickCount() - tick);
	}

	Quest.stashItem(521);

	return true;
}