/*
*	@filename	Tristam.js
*	@author		isid0re
*	@desc		rescue cain quest sequence
*/

function tristam () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting tristam');
	me.overhead("tristam");

	if (!Misc.checkQuest(4, 4) && !me.getItem(525)) {
		if (!me.getItem(524)) {
			if (!Pather.checkWP(5)) {
				Pather.getWP(5);
			} else {
				Pather.useWaypoint(5);
			}

			Precast.doPrecast(true);

			if (!Pather.moveToPreset(5, 2, 30, 5, 5)) {
				print("ÿc9SoloLevelingÿc0: Failed to move to Tree of Inifuss");
			}

			Quest.collectItem(524, 30);
			Pickit.pickItems();
		}

		if (me.getItem(524)) {
			Town.goToTown();
			Town.npcInteract("akara");
		}
	}

	if (me.getItem(525)) {
		if (!Pather.checkWP(4)) {
			Pather.getWP(4);
		} else {
			Pather.useWaypoint(4);
		}

		Precast.doPrecast(true);
		Pather.moveToPreset(4, 2, 17, 0, 0, false, true);
		Attack.clear(15, 0x7);
		Pather.moveToPreset(4, 2, 17, 0, 0, false, true);
		let stone;

		for (let touch = 0; touch < 5; touch += 1) {
			for (let piece = 17; piece < 22; piece += 1) {
				stone = getUnit(2, piece);

				if (stone) {
					Misc.openChest(stone);
					Attack.clear(10);
				}
			}
		}

		while (!Pather.usePortal(38)) {
			Attack.securePosition(me.x, me.y, 10, 1000);
		}

		Pather.moveTo(me.x, me.y + 6);
		let gibbet = getUnit(2, 26);

		if (!gibbet.mode) {
			if (!Pather.moveToPreset(38, 2, 26, 0, 0, true, true)) {
				print("ÿc9SoloLevelingÿc0: Failed to move to Cain's Gibbet");
			}

			for (let x = 0; x < 5; x++) {
				Misc.openChest(gibbet);
			}
		}
	}

	return true;
}
