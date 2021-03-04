/*
*	@filename	shenk.js
*	@author		isid0re, theBGuy
*	@desc		shenk quest for sockets, wp's, and mf
*/

function shenk () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting shenk');
	me.overhead("shenk/eldritch");

	if (!Pather.checkWP(111)) {
		Pather.getWP(111, true);
	} else {
		Pather.useWaypoint(111);
	}

	Precast.doPrecast(true);

	Pather.moveTo(3745, 5084);
	Attack.killTarget(getLocaleString(22500)); // Eldritch the Rectifier
	Pather.clearToExit(111, 110, true);
	
	Pather.moveTo(3883, 5113);
	Attack.killTarget(getLocaleString(22435)); // Shenk the Overseer

	Pickit.pickItems();

	return true;
}
