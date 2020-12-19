/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function shenk () {
	if (me.gametype === 0 || !Pather.accessToAct(5) || me.diff === 0 && Misc.checkQuest(35, 1) || me.diff === 1 && Misc.checkQuest(35, 1)) {
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
};