/*
*	@filename	OOGOverrides.js
*	@author		theBGuy
*	@desc		OOG.js fixes to improve functionality
*/

if (!isIncluded("OOG.js")) {
	include("OOG.js");
}

DataFile.create = function () {
	var obj, string;

	obj = {
		runs: 0,
		experience: 0,
		deaths: 0,
		lastArea: "",
		gold: 0,
		level: 0,
		name: "",
		gameName: "",
		ingameTick: 0,
		handle: 0,
		nextGame: "",
		chickens: 0
	};

	string = JSON.stringify(obj);

	//FileTools.writeText("data/" + me.profile + ".json", string);
	Misc.fileAction("data/" + me.profile + ".json", 1, string);

	return obj;
};

DataFile.getObj = function () {
	var obj, string;

	if (!FileTools.exists("data/" + me.profile + ".json")) {
		DataFile.create();
	}

	//string = FileTools.readText("data/" + me.profile + ".json");
	string = Misc.fileAction("data/" + me.profile + ".json", 0);

	try {
		obj = JSON.parse(string);
	} catch (e) {
		// If we failed, file might be corrupted, so create a new one
		obj = this.create();
	}

	if (obj) {
		return obj;
	}

	print("Error reading DataFile. Using null values.");

	return {runs: 0, experience: 0, lastArea: "", gold: 0, level: 0, name: "", gameName: "", ingameTick: 0, handle: 0, nextGame: "", chickens: 0};
};

DataFile.updateStats = function (arg, value) {
	while (me.ingame && !me.gameReady) {
		delay(100);
	}

	var i, obj, string,
		statArr = [];

	if (typeof arg === "object") {
		statArr = arg.slice();
	}

	if (typeof arg === "string") {
		statArr.push(arg);
	}

	obj = this.getObj();

	for (i = 0; i < statArr.length; i += 1) {
		switch (statArr[i]) {
		case "experience":
			obj.experience = me.getStat(13);
			obj.level = me.getStat(12);

			break;
		case "lastArea":
			if (obj.lastArea === Pather.getAreaName(me.area)) {
				return;
			}

			obj.lastArea = Pather.getAreaName(me.area);

			break;
		case "gold":
			if (!me.gameReady) {
				break;
			}

			obj.gold = me.getStat(14) + me.getStat(15);

			break;
		case "name":
			obj.name = me.name;

			break;
		case "ingameTick":
			obj.ingameTick = getTickCount();

			break;
		case "deaths":
			obj.deaths = (obj.deaths || 0) + 1;

			break;
		case "chickens":
			obj.chickens += 1;

			break;
		default:
			obj[statArr[i]] = value;

			break;
		}
	}

	string = JSON.stringify(obj);

	//FileTools.writeText("data/" + me.profile + ".json", string);
	Misc.fileAction("data/" + me.profile + ".json", 1, string);
};

ControlAction.makeCharacter = function (info) {
	me.blockMouse = true;

	if (!info.charClass) {
		info.charClass = "barbarian";
	}

	var control,
		clickCoords = [];

	while (getLocation() !== 1) { // cycle until in lobby
		switch (getLocation()) {
		case 12: // character select
		case 23: // connecting
		case 42: // empty character select
			control = getControl(6, 33, 528, 168, 60);

			if (control && control.disabled === 4) { // Create Character greyed out
				me.blockMouse = false;

				return false;
			}

			this.click(6, 33, 528, 168, 60);

			break;
		case 29: // select character
			switch (info.charClass) {
			case "barbarian":
				clickCoords = [400, 280];

				break;
			case "amazon":
				clickCoords = [100, 280];

				break;
			case "necromancer":
				clickCoords = [300, 290];

				break;
			case "sorceress":
				clickCoords = [620, 270];

				break;
			case "assassin":
				clickCoords = [200, 280];

				break;
			case "druid":
				clickCoords = [700, 280];

				break;
			case "paladin":
				clickCoords = [521, 260];

				break;
			}

			// coords:
			// zon: 100, 280
			// barb: 400, 280
			// necro: 300, 290
			// sin: 200, 280
			// paladin: 521 260
			// sorc: 620, 270
			// druid: 700, 280

			getControl().click(clickCoords[0], clickCoords[1]);
			delay(500);

			break;
		case 15: // new character
			if (getControl(6, 421, 337, 96, 32)) { // hardcore char warning
				this.click(6, 421, 337, 96, 32);
			} else {
				this.setText(1, 318, 510, 157, 16, info.charName);

				if (!info.expansion) {
					this.click(6, 319, 540, 15, 16);
				}

				if (!info.ladder) {
					this.click(6, 319, 580, 15, 16);
				}

				if (info.hardcore) {
					this.click(6, 319, 560, 15, 16);
				}

				this.click(6, 627, 572, 128, 35);
			}

			break;
		case 30: // char name exists (text box 4, 268, 320, 264, 120)
			ControlAction.click(6, 351, 337, 96, 32);
			ControlAction.click(6, 33, 572, 128, 35);

			me.blockMouse = false;

			return false;
		default:
			break;
		}

		if (me.ingame) { // Singleplayer loop break fix.
			break;
		}

		delay(500);
	}

	me.blockMouse = false;

	return true;
};

ControlAction.findCharacter = function (info) {
	var control, text, tick;

	tick = getTickCount();

	while (getLocation() !== 12) {
		if (getTickCount() - tick >= 5000) {
			break;
		}

		delay(25);
	}

	if (getLocation() === 23) {
		D2Bot.restart();
	}

	if (getLocation() === 12) {
		control = getControl(4, 37, 178, 200, 92);

		if (control) {
			do {
				text = control.getText();

				if (text instanceof Array && typeof text[1] === "string" && text[1] === info.charName) {
					return true;
				}
			} while (control.getNext());
		}
	}

	return false;
};

ControlAction.makeAccount = function (info) {
	me.blockMouse = true;

	var tick,
		realms = {
			"uswest": 0,
			"useast": 1,
			"asia": 2,
			"europe": 3
		};

	while (getLocation() !== 42) {// cycle until in empty char screen
		switch (getLocation()) {
		case 8: // main menu
			ControlAction.clickRealm(realms[info.realm]);
			this.click(6, 264, 366, 272, 35);

			break;
		case 9: // login screen
			this.click(6, 264, 572, 272, 35);

			break;
		case 10:
		case 11:
			return false;
		case 18: // splash
			this.click(2, 0, 599, 800, 600);

			break;
		case 21: // Main Menu - Connecting
			tick = getTickCount();

			while (getLocation() === 21) {
				if (getTickCount() - tick > 10000) {
					ControlAction.click(6, 330, 416, 128, 35);
				}

				delay(500);
			}

			break;
		case 29: // Char create
			this.click(6, 33, 572, 128, 35);

			break;
		case 30: // bnet disconnected
			info.account = "";
			info.password = "";
			D2Bot.setProfile(info.account, info.password);
			D2Bot.restart(true);

			break;
		case 31: // ToU
			this.click(6, 525, 513, 128, 35);

			break;
		case 32: // new account
			this.setText(1, 322, 342, 162, 19, info.account);
			this.setText(1, 322, 396, 162, 19, info.password);
			this.setText(1, 322, 450, 162, 19, info.password);
			this.click(6, 627, 572, 128, 35);

			break;
		case 33: // please read
			this.click(6, 525, 513, 128, 35);

			break;
		case 34: // e-mail
			if (getControl(6, 415, 412, 128, 35)) {
				this.click(6, 415, 412, 128, 35);
			} else {
				this.click(6, 265, 572, 272, 35);
			}

			break;
		default:
			break;
		}

		delay(100);
	}

	me.blockMouse = false;

	return true;
};
