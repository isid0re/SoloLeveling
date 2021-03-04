/*
*	@filename	anya.js
*	@author		isid0re
*	@desc		Anya rescue from frozen river
*/

function anya () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting anya');
	me.overhead("anya");

	if (!Pather.checkWP(113)) {
		Pather.getWP(113, true);
	} else {
		Pather.useWaypoint(113);
	}

	Precast.doPrecast(true);

	Pather.clearToExit(113, 114, true); //Crytsaline Passage -> Frozen River

	if (!Pather.moveToPreset(me.area, 2, 460)) {
		print("ÿc9SoloLevelingÿc0: Failed to move to Anya");
	}

	let frozenanya = getUnit(2, 558);

	if (frozenanya) {
		Pather.moveToUnit(frozenanya);
		sendPacket(1, 0x13, 4, 0x2, 4, frozenanya.gid);
		delay(1200 + me.ping);
		me.cancel();
	}

	Town.npcInteract("malah");
	Town.doChores();
	Pather.usePortal(114, me.name);

	if (frozenanya) {
		while (!frozenanya.mode) {
			sendPacket(1, 0x13, 4, 0x2, 4, frozenanya.gid);
			delay(300 + me.ping);
		}
	}

	Town.npcInteract("malah");
	Town.unfinishedQuests();
	Town.doChores();
	Town.npcInteract("anya");

	return true;
}
