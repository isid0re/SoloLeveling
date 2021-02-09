/*
*	@filename	travincal.js
*	@author		isid0re
*	@desc		travincal sequence for flail
*/

function travincal () {
	Quest.preReqs();
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting travincal');
	me.overhead("travincal");

	var forQuest = false;
	let tick = getTickCount();
	if(shouldLog){
		if(!Misc.checkQuest(21, 0)){
			forQuest = true;	
			Performance.updateStats("travincal", "TotalAttempts");
		}else{
			forQuest = false;
			Performance.updateStats("travincalMF", "TotalAttempts");
		}	
	}

	if (!Pather.checkWP(83)) {
		Pather.getWP(83);
	} else {
		Pather.useWaypoint(83);
	}

	Precast.doPrecast(true);
	let council = {
		x: me.x + 76,
		y: me.y - 67
	};

	Pather.moveToUnit(council);
	Attack.killTarget("Ismail Vilehand");
	Pickit.pickItems();

	if (!Pather.moveToPreset(83, 2, 404)) { // go to orb
		print('ÿc9SoloLevelingÿc0: Failed to move to compelling orb');
	}

	Attack.clear(10); // clear area around orb

	if (!Misc.checkQuest(18, 0)) { // khalim's will quest not complete
		if (!me.getItem(174) && me.getItem(173)) { // cube flail to will
			Quest.cubeItems(174, 553, 554, 555, 173);
			delay(250 + me.ping);
		}

		Quest.equipItem(174, 4);
		delay(250 + me.ping);

		if (!Pather.usePortal(83, me.name)) { // return to Trav
			print("ÿc9SoloLevelingÿc0: Failed to go back to Travincal and smash orb");
		}

		if(Quest.smashSomething(404)){	// smash orb. Ties logging to just if the orb is smashed
			if(forQuest && shouldLog){
				Performance.updateStats("travincal", "TotalTime");
				Performance.updateStats("travincal", "checkTimes", getTickCount() - tick);	
			}
		}
		Item.autoEquip(); // equip previous weapon
		Town.doChores();

		if (!Pather.usePortal(83, me.name)) { // return to Trav
			print("ÿc9SoloLevelingÿc0: Failed to go back to Travincal and take entrance");
		}

		if (!Pather.moveToExit(100, true)) {
			delay(250 + me.ping * 2);
			Pather.moveToExit(100, true);
		}

		if (!Pather.checkWP(101)) {
			Pather.getWP(101);
		}
	}

	if(!forQuest && shouldLog){
		Performance.updateStats("travincalMF", "checkTimes", getTickCount() - tick);	
		Performance.updateStats("travincalMF", "nonquestavg", getTickCount() - tick);	
	}

	return true;
}