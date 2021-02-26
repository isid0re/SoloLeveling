/*
*	@filename	Performance.js
*	@author		theBGuy
*	@desc		Track performance of bot throughout the game
*/

if (!isIncluded("SoloLeveling/Functions/MiscOverrides.js")) {
	include("SoloLeveling/Functions/MiscOverrides.js");
}

if (!isIncluded("SoloLeveling/Tools/Playtime.js")) {
	include("SoloLeveling/Tools/Playtime.js");
}

const Path = "libs/SoloLeveling/Performance/" + me.profile + ".json";

var Performance = {
	formatTime: function (time) {
		var sec = time / 1000;
		sec = Math.floor(sec);
		var s = sec % 60;
		sec = (sec - s) / 60;
		var m = sec % 60;
		var h = (sec - m) / 60;

		if (h === 0) {
			if (m === 0) {
				return "" + this.padStart(m, 2, '0') + "m " + this.padStart(s, 2, '0') + "s";
			}

			return "" + this.padStart(m, 2, '0') + "m " + this.padStart(s, 2, '0') + "s";
		}

		return "" + h + "h " + this.padStart(m, 2, '0') + "m " + this.padStart(s, 2, '0') + "s";
	},

	padStart: function (number, min, character) {
		var str = "" + number, checked = 1;

		for (let i = 1 ; i < min ; i += 1) {
			checked = checked * 10;

			if (number < checked) {
				str = character + str;
			}
		}

		return str;
	},

	create: function () {
		var obj, string;

		obj = {
			build: finalBuild,
		};

		string = JSON.stringify(obj, null, 2);

		Misc.fileAction(Path, 1, string);

		return obj;
	},

	set: function () {
		this.create();
		var files;

		if (me.gametype === 0) {
			files = ["den", "bloodraven", "bloodravenMF", "tristam", "countess", "countessMF", "pits", "andariel", "andarielMF",
				"radament", "cube", "amulet", "staff", "ancienttunnels", "summoner", "tombs", "duriel",
				"eye", "tome", "heart", "brain", "lowerkurast", "travincal", "travincalMF", "mephisto", "mephistoMF",
				"izual", "hellforge", "diablo", "diabloMF", "cows"];
		} else {
			files = ["den", "bloodraven", "bloodravenMF", "tristam", "countess", "countessMF", "pits", "andariel", "andarielMF",
				"radament", "cube", "amulet", "staff", "ancienttunnels", "summoner", "tombs", "duriel",
				"eye", "tome", "heart", "brain", "lowerkurast", "travincal", "travincalMF", "mephisto", "mephistoMF",
				"izual", "hellforge", "diablo", "diabloMF",
				"shenk", "shenkMF", "saveBarby", "anya", "pindle", "ancients", "baal", "baalMF", "cows"];
		}

		var diffs = ["Normal", "Nightmare", "Hell"];
		var obj = this.getObj();

		for (let i = 0; i < diffs.length; i++) {
			obj[diffs[i]] = {};

			for (let j = 0; j < files.length; j++) {
				obj[diffs[i]][files[j]] = {QuestCompleted: 0, TotalTime: 0, TotalAttempts: 0, ShortestAttempt: 0, LongestAttempt: 0, Average: 0, lvl: 0, TT: 0, SA: 0, LA: 0, AVG: 0};
			}

		}

		let string = JSON.stringify(obj, null, 2);

		Misc.fileAction(Path, 1, string);
	},

	delete: function () {
		FileTools.copy("libs/SoloLeveling/Performance/" + me.profile + ".json", "libs/SoloLeveling/Performance/" + me.profile + "Corrupted" + ".json");
		delay(100 + me.ping);
		FileTools.remove("libs/SoloLeveling/Performance/" + me.profile + ".json");
		delay(500 + me.ping);
		D2Bot.printToConsole("Performance: Generating a new file, old one became corrupted");
		this.set();
	},

	getObj: function () {
		var obj, string;

		if (!FileTools.exists(Path)) {
			this.create();
		}

		//string = FileTools.readText("data/" + me.profile + ".json");
		string = Misc.fileAction(Path, 0);

		try {
			obj = JSON.parse(string);
		} catch (e) {
			// If we failed, file might be corrupted, so create a new one
			Misc.errorReport(e, "Performance");
			this.delete();
			string = Misc.fileAction(Path, 0);
			obj = JSON.parse(string);
		}

		return obj;
	},

	getStats: function () {
		var obj = this.getObj();

		return Misc.clone(obj);
	},

	updateStats: function (name, arg, value) {
		while (me.ingame && !me.gameReady) {
			delay(100);
		}

		if (name === undefined) {
			return;
		}

		var diff, i, obj, string,
			statArr = [];
		var tt, uftt;

		if (typeof arg === "object") {
			statArr = arg.slice();
		}

		if (typeof arg === "string") {
			statArr.push(arg);
		}

		obj = this.getObj();

		switch (me.diff) {
		case 0:
			diff = "Normal";
			break;
		case 1:
			diff = "Nightmare";
			break;
		case 2:
			diff = "Hell";
			break;
		default:
			return;
		}

		for (i = 0; i < statArr.length; i += 1) {
			switch (statArr[i]) {
			case "QuestCompleted":

				if (!!Playtime.getStats().playtime) {
					var recordedPlaytime = JSON.parse(Playtime.getStats().playtime);

					if (recordedPlaytime.hasOwnProperty("ingame")) {
						tt = recordedPlaytime.ingame;
						uftt = tt;
					}

					tt = this.formatTime(tt);
				}

				obj[diff][name].QuestCompleted = tt;
				obj[diff][name].TT = uftt;
				obj[diff][name].lvl = me.charlvl; //Want to know the charlvl that the bot accomplished a task.

				break;
			case "TotalAttempts":
				obj[diff][name].TotalAttempts++;

				break;
			case "checkTimes":
				if (obj[diff][name].TotalAttempts === 1) {
					obj[diff][name].SA = value;
					obj[diff][name].LA = value;
					obj[diff][name].ShortestAttempt = this.formatTime(obj[diff][name].SA);
					obj[diff][name].LongestAttempt = this.formatTime(obj[diff][name].LA);
				} else {
					if (obj[diff][name].SA > value || obj[diff][name].SA === 0) {
						obj[diff][name].SA = value;
						obj[diff][name].ShortestAttempt = this.formatTime(obj[diff][name].SA);
					}

					if (obj[diff][name].LA < value) {
						obj[diff][name].LA = value;
						obj[diff][name].LongestAttempt = this.formatTime(obj[diff][name].LA);
					}
				}

				obj[diff][name].AVG += value; //Want to know average time
				obj[diff][name].Average = this.formatTime((obj[diff][name].AVG) / obj[diff][name].TotalAttempts);	//Format it so its easily readable
				obj[diff][name].TotalTime = this.formatTime(obj[diff][name].AVG);	//Format it so its easily readable

				break;
			default:
				obj[statArr[i]] = value;

				break;
			}

		}

		string = JSON.stringify(obj, null, 2);

		Misc.fileAction(Path, 1, string);
	},

};
