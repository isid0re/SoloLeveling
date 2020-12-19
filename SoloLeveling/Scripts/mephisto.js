/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function mephisto () {
	if (!Pather.accessToAct(3) || me.diff === 0 && Misc.checkQuest(23, 0)) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting mephisto');
	me.overhead("mephisto");

	if (!Pather.checkWP(101)) {
		Pather.getWP(101);
	} else {
		Pather.useWaypoint(101);
	}

	Precast.doPrecast(true);
	Pather.moveToExit(102, true);
	Town.goToTown();
	Town.doChores();
	Town.buyPots(10, "Thawing"); // thawing
	Town.drinkPots();
	Town.buyPots(10, "Antidote"); // antidote
	Town.drinkPots();
	Pather.usePortal(102, me.name);
	Precast.doPrecast(true);
	Pather.moveTo(17692, 8048);
	Pather.moveTo(17563, 8072);
	Config.MercWatch = false;
	Attack.killTarget("Mephisto");
	Config.MercWatch = true;
	Pickit.pickItems();
	Pather.moveTo(17581, 8070);
	delay(250 + me.ping * 2);
	Pather.usePortal(null);

	return true;
};