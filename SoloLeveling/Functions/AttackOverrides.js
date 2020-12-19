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
		print("ÿc9SoloLevelingÿc0: Attack failed. " + target.name + " not found.");
		Attack.clear(20);
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
