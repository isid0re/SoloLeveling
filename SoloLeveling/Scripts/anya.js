/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function anya () {
	if (me.gametype === 0 || !Pather.accessToAct(5) || Misc.checkQuest(37, 0)) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting anya');
	me.overhead("anya");

	if (!Pather.checkWP(113)) {
		Pather.getWP(113);
	} else {
		Pather.useWaypoint(113);
	}

	Precast.doPrecast(true);

	if (!Pather.moveToExit(114, true) || !Pather.moveToPreset(me.area, 2, 460)) {
		print("ÿc9SoloLevelingÿc0: Failed to move to Anya");
	}

	let frozenanya = getUnit(2, 558);

	if (frozenanya) {
		Pather.moveToUnit(frozenanya);
		sendPacket(1, 0x13, 4, 0x2, 4, frozenanya.gid);
		delay(1200 + me.ping);
		me.cancel();
	}

	Town.goToTown();
	Town.npcInteract("malah");
	Pather.usePortal(114, me.name);

	if (frozenanya) {
		while (!frozenanya.mode) {
			sendPacket(1, 0x13, 4, 0x2, 4, frozenanya.gid);
			delay(300 + me.ping);
		}
	}

	Town.goToTown();
	Town.clearJunk();
	Town.npcInteract("malah");
	Town.unfinishedQuests();
	Town.doChores();
	Town.npcInteract("anya");

	return true;
};