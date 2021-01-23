/*
*	@filename	shenk.js
*	@author		isid0re
*	@desc		shenk quest for sockets, wp's, and mf
*/

function shenk () {
	if (me.gametype === 0 || !Pather.accessToAct(5) || farmCheck(35)) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting shenk');
	me.overhead("shenk");

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

	return true;
}
