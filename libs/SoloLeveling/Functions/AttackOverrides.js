/*
*	@filename	AttackOverrides.js
*	@author		isid0re
*	@desc		Attack.js fixes to improve functionality
*	@credits	Mexxtexter monster count in range function
*/

if (!isIncluded("common/Attack.js")) {
	include("common/Attack.js");
}

Attack.clearLocations = function (list) {
	for (let x = 0; x < list.length; x++) {
		Attack.clear(20);
		Pather.moveTo(list[x][0], list[x][1]);
		Attack.clear(20);
		Pickit.pickItems();
	}

	return true;
};

Attack.getSkillElement = function (skillId) {
	this.elements = ["physical", "fire", "lightning", "magic", "cold", "poison", "none"];

	switch (skillId) {
	case 74: // Corpse Explosion
	case 139: // Stun
	case 144: // Concentrate
	case 147: // Frenzy
	case 273: // Minge Blast
	case 500: // Summoner
		return "physical";
	case 101: // Holy Bolt
		return "holybolt"; // no need to use this.elements array because it returns before going over the array
	}

	var eType = getBaseStat("skills", skillId, "etype");

	if (typeof (eType) === "number") {
		return this.elements[eType];
	}

	return false;
};

Attack.getNearestMonster = function (unit, range = 25) {
	var gid, distance, monster = getUnit(1);

	if (monster) {
		do {
			if (Attack.checkMonster(monster) && Attack.canAttack(monster)) {
				distance = getDistance(unit, monster);

				if (distance < range) {
					range = distance;
					gid = monster.gid;
				}
			}
		} while (monster.getNext());
	}

	if (gid) {
		monster = getUnit(1, -1, -1, gid);
	} else {
		monster = false;
	}

	return monster;
};

Attack.getMonstersInRange = function (unit, range = 25) {
	var count, monster = getUnit(1);
	count = 0;

	if (monster) {
		do {
			if (Attack.checkMonster(monster)) {
				if (getDistance(unit, monster) <= range) {
					count += 1;
				}
			}
		} while (monster.getNext());
	}

	return count;
};
