/**
*	@filename	Playtime.js
*	@author		theBGuy
*	@desc		Playtime recording
*	@credits	Adpist
*/

if (!isIncluded("SoloLeveling/Functions/MiscOverrides.js")) {
	include("SoloLeveling/Functions/MiscOverrides.js");
}

if (!isIncluded("SoloLeveling/Tools/Performance.js")) {
	include("SoloLeveling/Tools/Performance.js");
}

const path = "libs/SoloLeveling/Data/" + me.profile + ".json";

var Playtime = {
	lastTick: 0,
	updateFrequency: 1000,
	inGame: false,

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

		for (var i = 1 ; i < min ; i += 1) {
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
			chickens: 0,
			script: "",
			tick: 0,
			oog: 0,
			ingame: 0,
		};

		string = JSON.stringify(obj, null, 2);

		Misc.fileAction(path, 1, string);

		return obj;
	},

	delete: function () {
		FileTools.copy("libs/SoloLeveling/Data/" + me.profile + ".json", "libs/SoloLeveling/Data/" + me.profile + "Corrupted" + ".json");
		delay(500 + me.ping);
		FileTools.remove("libs/SoloLeveling/Data/" + me.profile + ".json");
		delay(500 + me.ping);
		D2Bot.printToConsole("Playtime: Generating a new file, old one became corrupted");
	},

	getObj: function () {
		var obj, string;

		if (!FileTools.exists(path)) {
			this.create();
		}

		//string = FileTools.readText("data/" + me.profile + ".json");
		string = Misc.fileAction(path, 0);

		try {
			obj = JSON.parse(string);
		} catch (e) {
			// If we failed, file might be corrupted, so create a new one
			Misc.errorReport(e, "Playtime");
			this.delete();
			obj = this.create();
		}

		return obj;
	},

	getStats: function () {
		var obj = this.getObj();

		return Misc.clone(obj);
	},

	updateStats: function (arg, value) {
		/*while (me.ingame && !me.gameReady) {
			delay(100);
		}*/

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
			case "setvalues":
				obj.script = value;
				obj.tick = getTickCount();

				break;
			case "checkvalues":
				if (me.charlvl === 1 || obj.script === "") {

					break;
				}

				if (DataFile.getStats().chickens > obj.chickens) {
					obj.chickens = DataFile.getStats().chickens;
					Performance.updateStats(obj.script, "checkTimes", getTickCount() - obj.tick);
				}

				break;
			default:
				obj[statArr[i]] = value;

				break;
			}
		}

		string = JSON.stringify(obj, null, 2);

		//FileTools.writeText("data/" + me.profile + ".json", string);
		Misc.fileAction(path, 1, string);
	},

	getInGameTime: function () {
		var playtime = 0;

		let recordedPlaytime = this.getObj();

		if (recordedPlaytime) {
			if (recordedPlaytime.ingame) {
				playtime = recordedPlaytime.ingame;
			}
		}

		return this.formatTime(playtime);
	},

	getOutOfGameTime: function () {
		var playtime = 0;

		let recordedPlaytime = this.getObj();

		if (recordedPlaytime) {
			if (recordedPlaytime.oog) {
				playtime = recordedPlaytime.oog;
			}
		}

		return this.formatTime(playtime);
	},

	getTotalTime: function () {
		var playtime = 0;

		let recordedPlaytime = this.getObj();

		if (recordedPlaytime) {
			if (recordedPlaytime.ingame) {
				playtime += recordedPlaytime.ingame;
			}
		}

		if (recordedPlaytime) {
			if (recordedPlaytime.oog) {
				playtime += recordedPlaytime.oog;
			}
		}

		return this.formatTime(playtime);
	},

	track: function (inGame) {
		this.lastTick = getTickCount();
		this.inGame = inGame;
	},

	recordPlaytime: function () {
		var newTick = getTickCount(), dt = newTick - this.lastTick;
		var oogPlaytime = 0, ingamePlaytime = 0;

		if (dt >= this.updateFrequency ) {
			let recordedPlaytime = this.getObj();

			if (recordedPlaytime) {

				if (recordedPlaytime.oog) {
					oogPlaytime = recordedPlaytime.oog;
				}

				if (recordedPlaytime.ingame) {
					ingamePlaytime = recordedPlaytime.ingame;
				}
			}

			if (this.inGame) {
				ingamePlaytime += dt;
			} else {
				oogPlaytime += dt;
			}

			this.lastTick = newTick;

			this.updateStats("oog", oogPlaytime);
			this.updateStats("ingame", ingamePlaytime);
		}
	},

};