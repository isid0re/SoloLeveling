/**
*	@filename	Playtime.js
*	@author		Adpist
*	@desc		Playtime recording
*	@credits	Adpist
*/

var Playtime = {
	lastTick: 0,
	updateFrequency: 1000,
	inGame: false,
	
	formatTime: function(time) {
		var sec = time/1000;
		sec = Math.floor(sec);
		var s = sec % 60; 
		sec = (sec-s)/60;
		var m = sec % 60;
		var h = (sec-m)/60;
		if (h == 0) {
			if (m == 0) {
				return "" + this.padStart(m, 2, '0') + "m " + this.padStart(s, 2, '0') + "s";
			}
			return "" + this.padStart(m, 2, '0') + "m " + this.padStart(s, 2, '0') + "s";
		}
		
		return "" + h + "h " + this.padStart(m, 2, '0') + "m " + this.padStart(s, 2, '0') + "s";
	},
	
	padStart : function(number, min, character) {
		var str = "" + number, checked = 1;
		
		for (var i = 1 ; i < min ; i+= 1) {
			checked = checked * 10;
			if (number < checked) {
				str = character + str;
			}
		}
		return str;
	},
	
	getInGameTime: function() {
		var playtime = 0;
		if (!!DataFile.getStats().playtime) {
			var recordedPlaytime = JSON.parse(DataFile.getStats().playtime);
			if (recordedPlaytime.hasOwnProperty("ingame") ){
				playtime = recordedPlaytime.ingame;
			}
		}
		return this.formatTime(playtime);
	},
	
	getOutOfGameTime: function() {
		var playtime = 0;
		if (!!DataFile.getStats().playtime){
			var recordedPlaytime = JSON.parse(DataFile.getStats().playtime);
			if (recordedPlaytime.hasOwnProperty("oog") ){
				playtime = recordedPlaytime.oog;
			}
		}
		return this.formatTime(playtime);
	},
	
	getTotalTime: function() {
		var playtime = 0;
		if (!!DataFile.getStats().playtime) {
			var recordedPlaytime = JSON.parse(DataFile.getStats().playtime);
			if (recordedPlaytime.hasOwnProperty("ingame") ){
				playtime += recordedPlaytime.ingame;
			}
		}
		if (!!DataFile.getStats().playtime){
			var recordedPlaytime = JSON.parse(DataFile.getStats().playtime);
			if (recordedPlaytime.hasOwnProperty("oog") ){
				playtime += recordedPlaytime.oog;
			}
		}
		return this.formatTime(playtime);
	},
	
	track: function(inGame) {
		this.lastTick = getTickCount();
		this.inGame = inGame;
	},
	
	recordPlaytime: function() {
		var newTick = getTickCount(), dt = newTick - this.lastTick, play = false;
		var oogPlaytime = 0, ingamePlaytime = 0;
		
		if (dt >= this.updateFrequency ) {
			if (!!DataFile.getStats().playtime) {
				var recordedPlaytime = JSON.parse(DataFile.getStats().playtime);
				if (recordedPlaytime.hasOwnProperty("oog")) {
					oogPlaytime = recordedPlaytime.oog;
				}
				if (recordedPlaytime.hasOwnProperty("ingame")) {
					ingamePlaytime = recordedPlaytime.ingame;
				}
			}
			
			if (this.inGame) {
				ingamePlaytime += dt;
			} else {
				oogPlaytime += dt;
			}
			
			this.lastTick = newTick;
			DataFile.updateStats("playtime", JSON.stringify({oog: oogPlaytime, ingame: ingamePlaytime}));
		}
	}
};