/*
*	@filename	Smith.js
*	@author		theBGuy
*	@desc		get the Smith quest to imbue an item for gear.
*/

function smith () {
	if (!Misc.checkQuest(4, 0)) {	//Cain must be completed first
		return false;
	}

	NTIP.addLine("[name] == horadricmalus");
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting smith');
	me.overhead("smith");
	
	if (!Pather.checkWP(27)) {
		Pather.getWP(27, true);
	} else {
		Pather.useWaypoint(27);
	}

	Precast.doPrecast(true);

	Pather.clearToExit(27, 28, true); // Outer Cloister - > Barracks

	if (!Pather.moveToPreset(28, 2, 108)) {
		throw new Error("ÿc9SoloLevelingÿc0: Failed to move to the Smith");
	}

	try {
		Attack.clear(20, 0, getLocaleString(2889)); // The Smith
	} catch (err) {
		print('ÿc9SoloLevelingÿc0: Failed to kill Smith');
	}

	Quest.collectItem(89, 30);
	Pickit.pickItems();
	Town.goToTown();

	Town.npcInteract("charsi");


	return true;
}