/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function pindle () {
	if (me.gametype === 0 || !Pather.accessToAct(5) || !Misc.checkQuest(37, 0) || !Misc.checkQuest(37, 1)) {
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
};
