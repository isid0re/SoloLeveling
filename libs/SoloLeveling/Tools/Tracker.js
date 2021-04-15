/*
*	@filename	Tracker.js
*	@author		isid0re
*	@desc		Track bot game performance and sends to CSV file
*/

if (!isIncluded("SoloLeveling/Tools/Developer.js")) {
	include("SoloLeveling/Tools/Developer.js");
}

if (!isIncluded("SoloLeveling/Functions/Quest.js")) {
	include("SoloLeveling/Functions/Quest.js");
}

if (!isIncluded("common/Misc.js")) {
	include("common/Misc.js");
}

var Tracker = {
	GTPath: "libs/SoloLeveling/Data/" + me.profile + ".GameTime.json",
	LPPath: "libs/SoloLeveling/Data/" + me.profile + ".LevelingPerformance.csv",
	SPPath: "libs/SoloLeveling/Data/" + me.profile + ".ScriptPerformance.csv",
	CurrScript: "",

	initialize: function () {
		//File Structure
		var LPHeader = "Total Time,Split Time,Sequence,Difficulty,Area,Character Level,Current Build" + "\n"; //Leveling Performance
		var SPHeader = "Total Time,Sequence Time,Sequence,Quest Complete,Difficulty,EXP%,Character Level,Current Build" + "\n"; //Script Performance
		let FirstSave = getTickCount();
		var GameTracker = {
			"Total": 0,
			"InGame": 0,
			"OOG": 0,
			"LastLevel": 0,
			"LastSave": FirstSave
		};

		// Create Files
		if (!FileTools.exists("libs/SoloLeveling/Data/" + me.profile + ".GameTime.json")) {
			Developer.writeObj(GameTracker, Tracker.GTPath);
		}

		if (!FileTools.exists("libs/SoloLeveling/Data/" + me.profile + ".LevelingPerformance.csv")) {
			Misc.fileAction(Tracker.LPPath, 1, LPHeader);
		}

		if (!FileTools.exists("libs/SoloLeveling/Data/" + me.profile + ".ScriptPerformance.csv")) {
			Misc.fileAction(Tracker.SPPath, 1, SPHeader);
		}

		return true;
	},

	logLeveling: function (obj) {
		if (typeof obj === "object" && obj.hasOwnProperty("event") && obj["event"] === "level up") {
			Tracker.Leveling(Tracker.CurrScript);
		}
	},

	Script: function (starttime, subscript) {
		var GameTracker = Developer.readObj(Tracker.GTPath),
			newTick = me.gamestarttime > GameTracker.LastSave ? me.gamestarttime : GameTracker.LastSave,
			totalTick = GameTracker.LastSave,
			newIG = GameTracker.InGame + Developer.Timer(newTick),
			newTotal = GameTracker.Total + Developer.Timer(totalTick),
			scriptTime = Developer.Timer(starttime),
			questComplete = Quest.Status(subscript),
			diffString = Difficulty[me.diff],
			gainPCT = Experience.gainPercent() / 100,
			currentBuild = SetUp.getBuild(),
			newSave = getTickCount(),
			string = Developer.formatTime(newTotal) + "," + Developer.formatTime(scriptTime) + "," + subscript + "," + questComplete + "," + diffString + "," + gainPCT + "," + me.charlvl + "," + currentBuild + "\n";

		GameTracker.Total = newTotal;
		GameTracker.InGame = newIG;
		GameTracker.LastSave = newSave;
		Developer.writeObj(GameTracker, Tracker.GTPath);
		Misc.fileAction(Tracker.SPPath, 2, string);

		return true;
	},

	Leveling: function (subscript) {
		var GameTracker = Developer.readObj(Tracker.GTPath),
			newTick = me.gamestarttime > GameTracker.LastSave ? me.gamestarttime : GameTracker.LastSave,
			totalTick = GameTracker.LastSave,
			newIG = GameTracker.InGame + Developer.Timer(newTick),
			newTotal = GameTracker.Total + Developer.Timer(totalTick),
			newOOG = newTotal - newIG,
			splitTime = Developer.Timer(GameTracker.LastLevel),
			diffString = Difficulty[me.diff],
			areaName = Pather.getAreaName(me.area),
			currentBuild = SetUp.getBuild(),
			newSave = getTickCount(),
			string = Developer.formatTime(newTotal) + "," + Developer.formatTime(splitTime) + "," + subscript + "," + diffString + "," + areaName + "," + me.charlvl + "," + currentBuild + "\n";

		GameTracker.Total = newTotal;
		GameTracker.InGame = newIG;
		GameTracker.OOG = newOOG;
		GameTracker.LastLevel = newSave;
		GameTracker.LastSave = newSave;
		Developer.writeObj(GameTracker, Tracker.GTPath);
		Misc.fileAction(Tracker.LPPath, 2, string);

		return true;
	},

	Update: function () {
		var GameTracker = Developer.readObj(Tracker.GTPath),
			newTick = me.gamestarttime > GameTracker.LastSave ? me.gamestarttime : GameTracker.LastSave,
			totalTick = GameTracker.LastSave,
			newIG = GameTracker.InGame + Developer.Timer(newTick),
			newTotal = GameTracker.Total + Developer.Timer(totalTick),
			newOOG = newTotal - newIG,
			newSave = getTickCount();

		GameTracker.Total = newTotal;
		GameTracker.InGame = newIG;
		GameTracker.OOG = newOOG;
		GameTracker.LastSave = newSave;
		Developer.writeObj(GameTracker, Tracker.GTPath);
	},

	Interval: function () {
		let minutes = 3; // interval for timeout in minutes;
		Tracker.Update();
		setTimeout(Tracker.Interval, minutes * 60000);
	},
};
