/*
*	@filename	duriel.js
*	@author		isid0re
*	@desc		duriel quest
*/

function duriel () {
	Quest.preReqs();
	Quest.cubeItems(91, 92, 521);
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting duriel');
	me.overhead("duriel");

	let tick = getTickCount();
	if(shouldLog){
		Performance.updateStats("duriel", "TotalAttempts");	
	}

	if (!Pather.checkWP(46)) {
		Pather.getWP(46);
	} else {
		Pather.useWaypoint(46);
	}

	Precast.doPrecast(true);
	Pather.moveToExit(getRoom().correcttomb, true);
	Pather.moveToPreset(me.area, 2, 152);
	Attack.securePosition(me.x, me.y, 30, 3000, true, me.diff === 2);
	Quest.placeStaff();
	Town.doChores();
	Town.buyPots(10, "Thawing"); // thawing
	Town.drinkPots();
	Config.MercWatch = false;
	Pather.usePortal(null, me.name);
	delay(1000 + me.ping);
	Pather.useUnit(2, 100, 73);
	Attack.killTarget("Duriel");
	Pickit.pickItems();

	if (!Misc.checkQuest(15, 0) && !Misc.checkQuest(14, 3)) {
		Quest.tyraelTomb();
	}

	if (!Misc.checkQuest(15, 0) && !Misc.checkQuest(14, 4)) {
		Town.move("palace");
		Town.npcInteract("jerhyn");
		Pather.moveToExit(50, true);
	}

	Pather.changeAct();
	Config.MercWatch = true;

	if(Misc.checkQuest(15,0) && shouldLog){
		Performance.updateStats("duriel", "TotalTime");
		Performance.updateStats("duriel", "checkTimes", getTickCount() - tick);
	}

	return true;
}