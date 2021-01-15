/*
*	@filename	pindle.js
*	@author		isid0re
*	@desc		pindle runs for MF and gold
*/

function pindle () {
	if (me.gametype === 0 || !Pather.accessToAct(5) || !Misc.checkQuest(37, 0) || me.diff !== 2 && goldCheck()) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting pindle');
	me.overhead("Pindle");

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

	return true;
}
