/*
*	@filename	shenk.js
*	@author		isid0re
*	@desc		shenk quest for sockets, wp's, and mf
*/

function shenk () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting shenk');
	me.overhead("shenk");

	var forQuest;
	let tick = getTickCount();
	if(shouldLog){
		if(!Misc.checkQuest(35,1)){
			forQuest = true;		
			Performance.updateStats("shenk", "TotalAttempts");
		}else{
			Performance.updateStats("shenkMF", "TotalAttempts");
			forQuest = false;
		}	
	}

	if (!Pather.checkWP(111)) {
		Pather.getWP(111);
	} else {
		Pather.useWaypoint(111);
	}

	Precast.doPrecast(true);

	if (!Misc.checkQuest(35, 1)) {
		Pather.moveTo(3883, 5113);
		Attack.killTarget(getLocaleString(22435));
	}

	Pickit.pickItems();

	if(forQuest && shouldLog){
		if(Misc.checkQuest(35,13)){	//13 is just killed shenk
			Performance.updateStats("shenk", "TotalTime");
			Performance.updateStats("shenk", "checkTimes", getTickCount() - tick);
		}	
	} else {
		if(shouldLog){
			Performance.updateStats("shenkMF", "checkTimes", getTickCount() - tick);
			Performance.updateStats("shenkMF", "nonquestavg", getTickCount() - tick);
		}
	}

	return true;
}