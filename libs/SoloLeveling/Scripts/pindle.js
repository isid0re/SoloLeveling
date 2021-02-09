/*
*	@filename	pindle.js
*	@author		isid0re
*	@desc		pindle runs for MF and gold
*/

function pindle () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting pindle');
	me.overhead("Pindle");

	let tick = getTickCount();
	if(shouldLog){
		Performance.updateStats("pindle", "TotalAttempts");	
	}

	if (!Pather.getPortal(121)) {
		Town.npcInteract("anya");
	}

	if (!Pather.usePortal(121)) {
		return true;
	}

	Precast.doPrecast(true);
	Pather.moveTo(10058, 13234);
	Attack.killTarget(getLocaleString(22497)); // pindleskin
	Pickit.pickItems();

	if(shouldLog){
		Performance.updateStats("pindle", "checkTimes", getTickCount() - tick);
		Performance.updateStats("pindle", "nonquestavg", getTickCount() - tick);	
	}

	return true;
}
