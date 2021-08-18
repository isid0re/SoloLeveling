/*
*	@filename	templeruns.js
*	@author		isid0re
*	@desc		temple runs for exp.
*	@credits	Xcon
*/

function templeruns () {
	print('ÿc9SoloLevelingÿc0: starting temple runs');
	me.overhead("temple runs");

	let temples = [[83, 82, 99], [78, 79], [80, 94], [80, 95], [81, 96], [81, 97], [83, 82, 98]];
	Town.townTasks();

	for (let run = 0; run < temples.length; run++) {
		if (!Pather.checkWP(temples[run][0])) {
			Pather.getWP(temples[run][0]);
		} else {
			Pather.useWaypoint(temples[run][0]);
		}

		Precast.doPrecast(true);

		if (Pather.moveToExit(temples[run], true, true)) {
			switch (me.area) {
			case 79: // Lower kurast
				Misc.openChestsInArea(79);
				break;
			case 94: // Ruined Temple
				if (!me.lamessen) {
					me.overhead("lamessen");
					Pather.moveToPreset(94, 2, 193);
					Quest.collectItem(548, 193);
					Town.unfinishedQuests();
				} else if (me.hell && me.paladin && me.lamessen) {
					print('ÿc9SoloLevelingÿc0: cannot run temple. (Magic Immunes)');
					break;
				} else {
					Attack.clearLevel(0xF);
				}

				break;
			case 95: // Disused Fane
			case 96: // Forgotten Reliquary
				if (me.hell && me.paladin) { // magic immunes
					print('ÿc9SoloLevelingÿc0: cannot run temple. (Magic Immunes)');
					break;
				}

				Attack.clearLevel(0xF);
				break;
			case 97: // Forgotten Temple
			case 98: // Ruined Fane
			case 99: // Disused Reliquary
				if (me.hell && me.amazon) { // lightning immunes
					print('ÿc9SoloLevelingÿc0: cannot run temple. (Lightning Immunes)');
					break;
				}

				Attack.clearLevel(0xF);
				break;
			default:
				Attack.clearLevel(0xF);
				break;
			}
		}

		Town.goToTown();
	}

	return true;
}
