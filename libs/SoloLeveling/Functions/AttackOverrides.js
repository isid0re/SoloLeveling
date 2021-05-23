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

Attack.openChests = function () { // don't open chests when attacking
	return true;
};

Attack.replenishArrows = function () {
	let equippedProjectile, inventoryProjectile, equippedPercent = 100,
		equippedWeapon = me.getItems()
			.filter(item =>
				[1].indexOf(item.location) > -1 // Needs to be equipped
				&& [4].indexOf(item.bodylocation) > -1 // Needs to be weapon
			)
			.first();

	if (equippedWeapon) {
		switch (equippedWeapon.itemType) {
		case 27: // bow
		case 85: // amazon bow
			equippedProjectile = me.getItems()
				.filter(item =>
					item.classid === 526
				&& [1].indexOf(item.location) > -1 // Needs to be equipped
				)
				.first();

			inventoryProjectile = me.getItems()
				.filter(item =>
					item.classid === 526
				&& [3].indexOf(item.location) > -1 // Needs to be in the inventory
				)
				.first();

			break;
		case 35: // crossbow
			equippedProjectile = me.getItems()
				.filter(item =>
					item.classid === 528
				&& [1].indexOf(item.location) > -1 // Needs to be equipped
				)
				.first();

			inventoryProjectile = me.getItems()
				.filter(item =>
					item.classid === 528
				&& [3].indexOf(item.location) > -1 // Needs to be in the inventory
				)
				.first();

			break;
		default:
			return false;
		}

		if (equippedProjectile) {
			equippedPercent = equippedProjectile.getStat(70) * 100 / (getBaseStat("items", equippedProjectile.classid, "maxstack") + equippedProjectile.getStat(254));
		}

		if (inventoryProjectile && equippedPercent <= Config.RepairPercent) {
			Item.equip(inventoryProjectile, 5);

			return true;
		}
	}

	return false;
};
