/*
*	@filename	AttackOverrides.js
*	@author		isid0re
*	@desc		Attack.js fixes to improve functionality
*/

if (!isIncluded("common/Attack.js")) {
	include("common/Attack.js");
}

Attack.killTarget = function (name) {
	var target,	attackCount = 0;

	for (let i = 0; !target && i < 5; i += 1) {
		target = getUnit(1, name);

		if (target) {
			break;
		}

		delay(200);
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

	while (attackCount < Config.MaxAttackCount) {
		if (Misc.townCheck()) {
			for (let i = 0; !target && i < 5; i += 1) {
				target = getUnit(1, name);

				if (target) {
					break;
				}

				delay(200);
			}
		}

		if (!target || !copyUnit(target).x) { // Check if unit got invalidated, happens if necro raises a skeleton from the boss's corpse.
			target = getUnit(1, name);

			if (!target) {
				break;
			}
		}

		if (Config.Dodge && me.hp * 100 / me.hpmax <= Config.DodgeHP) {
			this.deploy(target, Config.DodgeRange, 5, 9);
		}

		if (attackCount > 0 && attackCount % 15 === 0 && Skill.getRange(Config.AttackSkill[1]) < 4) {
			Packet.flash(me.gid);
		}

		if (!ClassAttack.doAttack(target, attackCount % 15 === 0)) {
			Packet.flash(me.gid);
		}

		attackCount += 1;
		ClassAttack.afterAttack();

		if ( !target || !copyUnit(target).x || target.dead) {
			break;
		}
	}

	if ( !target || !copyUnit(target).x || target.dead) {
		Pickit.pickItems();
	}

	return true;
};

Attack.clearLocations = function (list) {
	for (let x = 0; x < list.length; x++) {
		Attack.clear(20);
		Pather.moveTo(list[x][0], list[x][1]);
		Attack.clear(20);
		Pickit.pickItems();
	}

	return true;
};