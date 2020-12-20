/*
*	@filename	AttackOverrides.js
*	@author		isid0re
*	@desc		Attack.js fixes to improve functionality
*/

Attack.killTarget = function (name) {
	let target;

	for (let i = 0; i < 3; i += 1) {
		target = getUnit(1, name);

		if (target) {
			break;
		}

		delay(300 + me.ping);
	}

	if (!target) {
		print("ÿc9SoloLevelingÿc0: Target not found. Performing Attack.Clear(25)");
		Attack.clear(25);
		Pickit.pickItems();

		return true;
	}

	if (target && !Attack.canAttack(target)) { // exit if target is immune
		print("ÿc9SoloLevelingÿc0: Attack failed. " + target.name + " is immune.");

		return true;
	}

	for (let h = 0; h < Config.MaxAttackCount; h += 1) {
		ClassAttack.doAttack(target);

		if (target.dead) {

			break;
		}

		if (me.classid === 1 && me.getSkill(54, 0) && getDistance(me, target) <= 10) {
			Pather.moveTo(target.x, me.y < target.y ? target.y + 15 : target.y - 15);
		}
	}

	Pickit.pickItems();

	return target.dead;
};

if (me.classid === 2) { // Necromancer
	if (!isIncluded("common/Attacks/Necromancer.js")) {
		include("common/Attacks/Necromancer.js");
	}

	ClassAttack.isCursable = function (unit) {
		if (copyUnit(unit).name === undefined || unit.name.indexOf(getLocaleString(11086)) > -1) { // "Possessed"
			return false;
		}

		if (unit.getState(57)) { // attract can't be overridden
			return false;
		}

		switch (unit.classid) {
		case 206: // Foul Crow Nest
		case 207: // BloodHawkNest
		case 208: // BlackVultureNest
		case 258: // Water Watcher
		case 261: // Water Watcher
		case 266: // Flavie
		case 348: // Turret
		case 349: // Turret
		case 350: // Turret
		case 371: // lightning spire
		case 372: // firetower
		case 432: // Barricade Door
		case 433: // Barricade Door
		case 434: // Prison Door
		case 435: // Barricade Tower
		case 524: // Barricade Wall Right
		case 525: // Barricade Wall Left
		case 528: // Evil Demon Hut
			return false;
		}

		return true;
	};
}
