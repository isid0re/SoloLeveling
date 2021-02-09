/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		andariel quest.
*/

function andariel () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting andy');
	me.overhead("andy");

	if (me.diff === 0 && Misc.checkQuest(6, 1)) {
		Pather.changeAct();

		return true;
	}

	var forQuest = false;
	let tick = getTickCount();
	if(shouldLog){
		if(!Misc.checkQuest(7, 0)){
			forQuest = true;	
			Performance.updateStats("andariel", "TotalAttempts");
		}else{
			forQuest = false;
			Performance.updateStats("andarielMF", "TotalAttempts");
		}	
	}

	if (!Pather.checkWP(35)) {
		Pather.getWP(35);
	} else {
		Pather.useWaypoint(35);
	}

	Precast.doPrecast(true);
	Pather.moveToExit([36, 37], true);
	Town.doChores();
	Town.buyPots(10, "Antidote"); // antidote
	Town.drinkPots();
	Pather.usePortal(37, me.name);
	Precast.doPrecast(true);
	Pather.moveTo(22572, 9635);
	Pather.moveTo(22554, 9618);
	Pather.moveTo(22542, 9600);
	Pather.moveTo(22572, 9582);
	Pather.moveTo(22554, 9566);
	Pather.moveTo(22546, 9554);
	Config.MercWatch = false;
	Attack.killTarget("Andariel");
	delay(2000 + me.ping); // Wait for minions to die.
	Pickit.pickItems();
	Config.MercWatch = true;

	if (!Misc.checkQuest(7, 0)) {
		if(shouldLog){
			Performance.updateStats("andariel", "TotalTime");
			Performance.updateStats("andariel", "checkTimes", getTickCount() - tick);
		}
		Pather.changeAct();
	} else{
		if(shouldLog){
			Performance.updateStats("andarielMF", "nonquestavg", getTickCount() - tick);
			Performance.updateStats("andarielMF", "checkTimes", getTickCount() - tick);
		}
	}

	return true;
}