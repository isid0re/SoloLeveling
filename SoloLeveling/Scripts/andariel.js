/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function andariel () {
	if (me.diff === 0 && Misc.checkQuest(7, 0)) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting andy');
	me.overhead("andy");

	if (me.diff === 0 && Misc.checkQuest(6, 1)) {
		Pather.changeAct();

		return true;
	}

	if (!Pather.checkWP(35)) {
		Pather.getWP(35);
	} else {
		Pather.useWaypoint(35);
	}

	Precast.doPrecast(true);
	Pather.moveToExit([36, 37], true);
	Town.goToTown();
	Town.doChores();
	Town.buyPots(10, "Antidote"); // antidote
	Town.drinkPots();
	Pather.usePortal(37, me.name);
	Precast.doPrecast(true);
	Pather.moveTo(22572, 9635);
	Pather.moveTo(22554, 9618);
	Pather.moveTo(22542, 9600);
	Pather.moveTo(22572, 9582);
	Pather.moveTo(22554, 9566);
	Pather.moveTo(22546, 9554);
	Config.MercWatch = false;
	Attack.killTarget("Andariel");
	delay(2000 + me.ping); // Wait for minions to die.
	Pickit.pickItems();
	Config.MercWatch = true;

	if (!Misc.checkQuest(7, 0)) {
		Pather.changeAct();
	}

	return true;
};
