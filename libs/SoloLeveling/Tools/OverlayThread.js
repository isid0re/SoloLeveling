/**
*	@filename	OverlayThread.js
*	@author		theBGuy
*	@desc		SoloLeveling overlay system
*	@credits	Adpist, Noah
*/

if (!isIncluded("SoloLeveling/Tools/Playtime.js")) {
	include("SoloLeveling/Tools/Playtime.js");
}

var SoloLevelingHooks = {
	text: {
		hooks: [],
		quests: [],
		enabled: true,
		activeAction: false,

		getRes: function (res) {
			switch(res){
				case "fire":
					if(me.diff === 0){
						return me.getStat(39) + me.getStat(40);
					}else if(me.diff === 1){
						return me.getStat(39) + me.getStat(40) - me.gametype === 0 ? 20 : 40;
					}else{
						return me.getStat(39) + me.getStat(40) - me.gametype === 0 ? 50 : 100;
					}
					break;
				case "cold":
					if(me.diff === 0){
						return me.getStat(43) + me.getStat(44);
					}else if(me.diff === 1){
						return me.getStat(43) + me.getStat(44) - me.gametype === 0 ? 20 : 40;
					}else{
						return me.getStat(43) + me.getStat(44) - me.gametype === 0 ? 50 : 100;
					}
					break;
				case "light":
					if(me.diff === 0){
						return me.getStat(41) + me.getStat(42);
					}else if(me.diff === 1){
						return me.getStat(41) + me.getStat(42) - me.gametype === 0 ? 20 : 40;
					}else{
						return me.getStat(41) + me.getStat(42) - me.gametype === 0 ? 50 : 100;
					}
					break;
				case "poison":
					if(me.diff === 0){
						return me.getStat(45) + me.getStat(46);
					}else if(me.diff === 1){
						return me.getStat(45) + me.getStat(46) - me.gametype === 0 ? 20 : 40;
					}else{
						return me.getStat(45) + me.getStat(46) - me.gametype === 0 ? 50 : 100;
					}
					break;
				default:
					break;
			}
			return -1;
		},

		hookHandler: function (click, x, y) {
		// Get the hook closest to the clicked location
			function sortHooks(h1, h2) {
				return Math.abs(h1.y - y) - Math.abs(h2.y - y);
			}

			// Left click
			if (click === 0) {
				// Sort hooks
				this.hooks.sort(sortHooks);

				// Don't start new action until the current one finishes
				if (activeAction && activeAction !== this.hooks[0].text) {
					return true;
				}

				// Toggle current action on/off
				activeAction = activeAction ? false : this.hooks[0].text;

				this.hooks[0].color = this.hooks[0].color === 4 ? 1 : 4;

				// Block click
				return true;
			}

			return false; 
		},

		check: function () {
			if (!this.enabled) {
				this.flush();

				return;
			}

			if (!this.getHook("oogtime")) {
				this.add("oogtime");
			} else {
				this.getHook("oogtime").hook.text = "OOG : " + Playtime.getOutOfGameTime();
			}
				
			if (!this.getHook("ingametime")) {
				this.add("ingametime");
			} else {
				this.getHook("ingametime").hook.text = "IG : " + Playtime.getInGameTime();
			}
				
			if (!this.getHook("totaltime")) {
				this.add("totaltime");
			} else {
				this.getHook("totaltime").hook.text = "TOTAL : " + Playtime.getTotalTime();
			}

			if (!this.getHook("credits")) {
				this.add("credits");
			} else {
				this.getHook("credits").hook.text = "c";
			}

			if (!this.getHook("level")) {
				this.add("level");
			} else {
				this.getHook("level").hook.text = "Level : " + me.charlvl;
			}

			if (!this.getHook("fireres")) {
				this.add("fireres");
			} else {
				this.getHook("fireres").hook.text = "FireRes : " + this.getRes("fire");
			}

			if (!this.getHook("coldres")) {
				this.add("coldres");
			} else {
				this.getHook("coldres").hook.text = "ColdRes : " + this.getRes("cold");
			}

			if (!this.getHook("lightres")) {
				this.add("lightres");
			} else {
				this.getHook("lightres").hook.text = "LightRes : " + this.getRes("light");
			}

			if (!this.getHook("poisonres")) {
				this.add("poisonres");
			} else {
				this.getHook("poisonres").hook.text = "PoisonRes : " + this.getRes("poison");
			}

			switch(me.act){
				case 1:
					if(!this.getHook("Den")){
						this.add("Den");
					} else {
						this.getHook("Den").hook.text = "Den : " + (me.getQuest(1,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("BloodRaven")){
						this.add("BloodRaven");
					} else {
						this.getHook("BloodRaven").hook.text = "BloodRaven : " + (me.getQuest(2,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Cain")){
						this.add("Cain");
					} else {
						this.getHook("Cain").hook.text = "Cain : " + (me.getQuest(4,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Countess")){
						this.add("Countess");
					} else {
						this.getHook("Countess").hook.text = "Countess : " + (me.getQuest(5,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Smith")){
						this.add("Smith");
					} else {
						this.getHook("Smith").hook.text = "Smith : " + (me.getQuest(3,0) || me.getQuest(3,1) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Andariel")){
						this.add("Andariel");
					} else {
						this.getHook("Andariel").hook.text = "Andariel : " + (me.getQuest(6,0) ? "Completed" : "Incomplete") ;
					}
					break;
				case 2:
					if(!this.getHook("Radament")){
						this.add("Radament");
					} else {
						this.getHook("Radament").hook.text = "Radament : " + (me.getQuest(9,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("HoradricStaff")){
						this.add("HoradricStaff");
					} else {
						this.getHook("HoradricStaff").hook.text = "HoradricStaff : " + (me.getQuest(10,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Amulet")){
						this.add("Amulet");
					} else {
						this.getHook("Amulet").hook.text = "Amulet : " + (me.getQuest(11,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("TheArcaneSanctuary")){
						this.add("TheArcaneSanctuary");
					} else {
						this.getHook("TheArcaneSanctuary").hook.text = "TheArcaneSanctuary : " + (me.getQuest(12,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Summoner")){
						this.add("Summoner");
					} else {
						this.getHook("Summoner").hook.text = "Summoner : " + (me.getQuest(13,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Duriel")){
						this.add("Duriel");
					} else {
						this.getHook("Duriel").hook.text = "Duriel : " + (me.getQuest(14,0) ? "Completed" : "Incomplete") ;
					}
					break;
				case 3:
					if(!this.getHook("GoldenBird")){
						this.add("GoldenBird");
					} else {
						this.getHook("GoldenBird").hook.text = "GoldenBird : " + (me.getQuest(20,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Gidbin")){
						this.add("Gidbin");
					} else {
						this.getHook("Gidbin").hook.text = "Gidbin : " + (me.getQuest(19,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Khalim'sWill")){
						this.add("Khalim'sWill");
					} else {
						this.getHook("Khalim'sWill").hook.text = "Khalim'sWill : " + (me.getQuest(18,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("LamEsen")){
						this.add("LamEsen");
					} else {
						this.getHook("LamEsen").hook.text = "LamEsen : " + (me.getQuest(17,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Travincal")){
						this.add("Travincal");
					} else {
						this.getHook("Travincal").hook.text = "Travincal : " + (me.getQuest(21,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Mephisto")){
						this.add("Mephisto");
					} else {
						this.getHook("Mephisto").hook.text = "Mephisto : " + (me.getQuest(22,0) ? "Completed" : "Incomplete") ;
					}
					break;
				case 4:
					if(!this.getHook("Izual")){
						this.add("Izual");
					} else {
						this.getHook("Izual").hook.text = "Izual : " + (me.getQuest(25,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("HellForge")){
						this.add("HellForge");
					} else {
						this.getHook("HellForge").hook.text = "HellForge : " + (me.getQuest(27,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Diablo")){
						this.add("Diablo");
					} else {
						this.getHook("Diablo").hook.text = "Diablo : " + (me.getQuest(26,0) ? "Completed" : "Incomplete") ;
					}
					break;
				case 5:
					if(!this.getHook("Shenk")){
						this.add("Shenk");
					} else {
						this.getHook("Shenk").hook.text = "Shenk : " + ((me.getQuest(35,0) || me.getQuest(35,1)) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Barbies")){
						this.add("Barbies");
					} else {
						this.getHook("Barbies").hook.text = "Barbies : " + (me.getQuest(36,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Anya")){
						this.add("Anya");
					} else {
						this.getHook("Anya").hook.text = "Anya : " + (me.getQuest(37,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Nith")){
						this.add("Nith");
					} else {
						this.getHook("Nith").hook.text = "Nith : " + ((me.getQuest(38,0) || me.getQuest(38,1)) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Ancients")){
						this.add("Ancients");
					} else {
						this.getHook("Ancients").hook.text = "Ancients : " + (me.getQuest(39,0) ? "Completed" : "Incomplete") ;
					}

					if(!this.getHook("Baal")){
						this.add("Baal");
					} else {
						this.getHook("Baal").hook.text = "Baal : " + (me.getQuest(40,0) ? "Completed" : "Incomplete") ;
					}
					break;
			}
			
		},

		/*	Color Codes;
			0: White
			1: Red
			2: Green
			3: Blue
			4: Gold
			5: Grey
			6: Black
			7: Gold
			8: Orange?
			9: Yellow
			10: Dark Green
			11: Darker Red
			12: Mild Green
		
		*/

		add: function (name) {
			switch (name) {
			
			case "level":
				this.hooks.push({
					name: "level",
					hook: new Text("Level : " + me.charlvl, 10, 200, 0/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;

			case "oogtime":
				this.hooks.push({
					name: "oogtime",
					hook: new Text("OOG : " + Playtime.getOutOfGameTime(), 10, 230, 0/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;

			case "ingametime":
				this.hooks.push({
					name: "ingametime",
					hook: new Text("IG : " + Playtime.getInGameTime(), 10, 245, 0/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
				
			case "totaltime":
				this.hooks.push({
					name: "totaltime",
					hook: new Text("Total : " + Playtime.getTotalTime(), 10, 260, 0/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;

			case "credits":
				this.hooks.push({
					name: "credits",
					hook: new Text("credits", 615, 577, 5/*color*/, 1/*font*/, 1/*align*/, false/*automap*/, this.hookHandler()),
				});
				
				break;

			case "fireres":
				this.hooks.push({
					name: "fireres",
					hook: new Text("FR : " + this.getRes("fire"), 10, 290, 1/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
				
			case "coldres":
				this.hooks.push({
					name: "coldres",
					hook: new Text("CR : " + this.getRes("cold"), 10, 305, 3/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;

			case "lightres":
				this.hooks.push({
					name: "lightres",
					hook: new Text("LR : " + this.getRes("light"), 10, 320, 9/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;

			case "poisonres":
				this.hooks.push({
					name: "poisonres",
					hook: new Text("PR : " + this.getRes("poison"), 10, 335, 2/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Den":
				this.hooks.push({
					name: "Den",
					hook: new Text("Den : " + me.getQuest(1,0) ? "Completed" : "Incomplete", 10, 365, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "BloodRaven":
				this.hooks.push({
					name: "BloodRaven",
					hook: new Text("BloodRaven : " + me.getQuest(2,0) ? "Completed" : "Incomplete", 10, 380, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Cain":
				this.hooks.push({
					name: "Cain",
					hook: new Text("Cain : " + me.getQuest(4,0) ? "Completed" : "Incomplete", 10, 395, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Countess":
				this.hooks.push({
					name: "Countess",
					hook: new Text("Countess : " + me.getQuest(5,0) ? "Completed" : "Incomplete", 10, 410, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Smith":
				this.hooks.push({
					name: "Smith",
					hook: new Text("Smith : " + me.getQuest(3,0) || me.getQuest(3,1) ? "Completed" : "Incomplete", 10, 425, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Andariel":
				this.hooks.push({
					name: "Andariel",
					hook: new Text("Andariel : " + me.getQuest(6,0) ? "Completed" : "Incomplete", 10, 440, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Radament":
				this.hooks.push({
					name: "Radament",
					hook: new Text("Radament : " + me.getQuest(9,0) ? "Completed" : "Incomplete", 10, 365, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "HoradricStaff":
				this.hooks.push({
					name: "HoradricStaff",
					hook: new Text("HoradricStaff : " + me.getQuest(10,0) ? "Completed" : "Incomplete", 10, 380, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Amulet":
				this.hooks.push({
					name: "Amulet",
					hook: new Text("Amulet : " + me.getQuest(11,0) ? "Completed" : "Incomplete", 10, 395, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "TheArcaneSanctuary":
				this.hooks.push({
					name: "TheArcaneSanctuary",
					hook: new Text("TheArcaneSanctuary : " + me.getQuest(12,0) ? "Completed" : "Incomplete", 10, 410, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Summoner":
				this.hooks.push({
					name: "Summoner",
					hook: new Text("Summoner : " + me.getQuest(13,0) ? "Completed" : "Incomplete", 10, 425, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Duriel":
				this.hooks.push({
					name: "Duriel",
					hook: new Text("Duriel : " + me.getQuest(14,0) ? "Completed" : "Incomplete", 10, 440, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "GoldenBird":
				this.hooks.push({
					name: "GoldenBird",
					hook: new Text("GoldenBird : " + me.getQuest(20,0) ? "Completed" : "Incomplete", 10, 365, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Gidbin":
				this.hooks.push({
					name: "Gidbin",
					hook: new Text("Gidbin : " + me.getQuest(19,0) ? "Completed" : "Incomplete", 10, 380, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Khalim'sWill":
				this.hooks.push({
					name: "Khalim'sWill",
					hook: new Text("Khalim'sWill : " + me.getQuest(18,0) ? "Completed" : "Incomplete", 10, 395, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "LamEsen":
				this.hooks.push({
					name: "LamEsen",
					hook: new Text("LamEsen : " + me.getQuest(17,0) ? "Completed" : "Incomplete", 10, 410, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Travincal":
				this.hooks.push({
					name: "Travincal",
					hook: new Text("Travincal : " + me.getQuest(21,0) ? "Completed" : "Incomplete", 10, 425, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Mephisto":
				this.hooks.push({
					name: "Mephisto",
					hook: new Text("Mephisto : " + me.getQuest(22,0) ? "Completed" : "Incomplete", 10, 440, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Izual":
				this.hooks.push({
					name: "Izual",
					hook: new Text("Izual : " + me.getQuest(25,0) ? "Completed" : "Incomplete", 10, 365, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "HellForge":
				this.hooks.push({
					name: "HellForge",
					hook: new Text("HellForge : " + me.getQuest(27,0) ? "Completed" : "Incomplete", 10, 380, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Diablo":
				this.hooks.push({
					name: "Diablo",
					hook: new Text("Diablo : " + me.getQuest(26,0) ? "Completed" : "Incomplete", 10, 395, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Shenk":
				this.hooks.push({
					name: "Shenk",
					hook: new Text("Shenk : " + (me.getQuest(35,0) || me.getQuest(35,1)) ? "Completed" : "Incomplete", 10, 365, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Barbies":
				this.hooks.push({
					name: "Barbies",
					hook: new Text("Barbies : " + me.getQuest(36,0) ? "Completed" : "Incomplete", 10, 380, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Anya":
				this.hooks.push({
					name: "Anya",
					hook: new Text("Anya : " + me.getQuest(37,0) ? "Completed" : "Incomplete", 10, 395, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Nith":
				this.hooks.push({
					name: "Nith",
					hook: new Text("Nith : " + (me.getQuest(38,0) || me.getQuest(38,1)) ? "Completed" : "Incomplete", 10, 410, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Ancients":
				this.hooks.push({
					name: "Ancients",
					hook: new Text("Ancients : " + me.getQuest(39,0) ? "Completed" : "Incomplete", 10, 425, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			case "Baal":
				this.hooks.push({
					name: "Baal",
					hook: new Text("Baal : " + me.getQuest(26,0) ? "Completed" : "Incomplete", 10, 440, 7/*color*/, 1/*font*/, 0/*align*/)
				});
				
				break;
			}

			
			
		},

		getHook: function (name) {
			var i;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (this.hooks[i].name === name) {
					return this.hooks[i];
				}
			}

			return false;
		},

		flush: function () {
			if (getUIFlag(0x0D)) {
				return;
			}

			while (this.hooks.length) {
				this.hooks.shift().hook.remove();
			}
		}
	},
	
	update: function () {
		/*while (!me.gameReady) {
			delay(100);
		}*/

		this.text.check();
	},

	flush: function () {
		this.text.flush();
		return true;
	},
	
};

function main() {
	/*include("json2.js");
	include("NTItemParser.dbl");
	include("OOG.js");
	include("AutoMule.js");
	include("Gambling.js");
	include("TorchSystem.js");
	include("MuleLogger.js");
	include("common/Attack.js");
	include("common/Cubing.js");
	include("common/CollMap.js");
	include("common/Config.js");
	include("common/Loader.js");
	include("common/misc.js");
	include("common/util.js");
	include("common/Pickit.js");
	include("common/Pather.js");
	include("common/Precast.js");
	include("common/Prototypes.js");
	include("common/Runewords.js");
	include("common/Storage.js");
	include("common/Town.js");*/
	//print("load overlay helper");
	//load("libs/SoloLeveling/Tools/OverlayHelper.js");
	print("SoloLeveling Overlay Thread Loaded.");

	this.ee = [];

	this.clear = function () {
		while(this.ee.length > 0){
			this.ee.shift().remove();
		}
	};

	this.keyEvent = function (key){
		switch(key){
			case 219:
				this.ee.push(new Text("SoloLeveling by Isid0re", 394, 525, 1, 0, 2));
				this.ee.push(new Text("Overlay by theBGuy", 394, 535, 1, 0, 2));
				break;
			case 221:
				this.clear();
				break;
		}
	};

	addEventListener("keyup", this.keyEvent);
	
	var i,
		hideFlags = [0x09, 0x0C, 0x0D, 0x01, 0x02, 0x0F, 0x18, 0x19, 0x1A, 0x21];

	this.myAct = me.act;

	//Config.init(true);

	/*while (true) {
		SoloLevelingHooks.update();
		if(me.act !== myAct){
			SoloLevelingHooks.flush();
			myAct = me.act;
		}
		
		delay(200);
	}*/
}