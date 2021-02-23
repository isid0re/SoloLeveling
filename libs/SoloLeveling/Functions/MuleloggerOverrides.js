/*
*	@filename	MuleloggerOverrides.js
*	@author		theBguy
*	@desc		Mulelogger.js fixes for QOL
*/

if (!isIncluded("MuleLogger.js")) {
	include("MuleLogger.js");
}

if (!isIncluded("SoloLeveling/Functions/NTIPOverrides.js")) {
	include("SoloLeveling/Functions/NTIPOverrides.js");
}

if (!isIncluded("SoloLeveling/Functions/MiscOverrides.js")) {
	include("SoloLeveling/Functions/MiscOverrides.js");
}

MuleLogger.getItemDesc = function (unit, logIlvl) {
	var i, desc, index,
		stringColor = "";

	if (logIlvl === undefined) {
		logIlvl = this.LogItemLevel;
	}

	try {
		//Try a few times, sometimes it fails
		for (let u = 0; u < 5; u++) {
			desc = unit.description.split("\n");

			if (desc) {
				break;
			}

			delay(250 + me.ping * 2);
		}
	} catch (e) {
		print("Failed to get description of " + unit.fname);	//This isn't a fatal error just log and move on

		return false;
	}

	// Lines are normally in reverse. Add color tags if needed and reverse order.
	for (i = 0; i < desc.length; i += 1) {
		if (desc[i].indexOf(getLocaleString(3331)) > -1) { // Remove sell value
			desc.splice(i, 1);

			i -= 1;
		} else {
			// Add color info
			if (!desc[i].match(/^(y|ÿ)c/)) {
				desc[i] = stringColor + desc[i];
			}

			// Find and store new color info
			index = desc[i].lastIndexOf("ÿc");

			if (index > -1) {
				stringColor = desc[i].substring(index, index + "ÿ".length + 2);
			}
		}

		desc[i] = desc[i].replace(/(y|ÿ)c([0-9!"+<:;.*])/g, "\\xffc$2").replace("ÿ", "\\xff", "g");
	}

	if (logIlvl && desc[desc.length - 1]) {
		desc[desc.length - 1] = desc[desc.length - 1].trim() + " (" + unit.ilvl + ")";
	}

	desc = desc.reverse().join("\\n");

	return desc;
};

MuleLogger.logEquippedItems = function () {
	while (!me.gameReady) {
		delay(100);
	}

	var i, folder, string, parsedItem,
		items = me.getItems(),
		realm = me.realm || "Single Player",
		merc, charClass,
		finalString = "";

	if (!FileTools.exists("mules/" + realm)) {
		folder = dopen("mules");

		folder.create(realm);
	}

	if (!FileTools.exists("mules/" + realm + "/" + "SoloLeveling")) {
		folder = dopen("mules/" + realm);

		folder.create("SoloLeveling");
	}

	if (!FileTools.exists("mules/" + realm + "/" + "SoloLeveling/" + me.account)) {
		folder = dopen("mules/" + realm + "/SoloLeveling");

		folder.create(me.account);
	}

	if (!items || !items.length) {
		return;
	}

	function itemSort (a, b) {
		return b.itemType - a.itemType;
	}

	items.sort(itemSort);

	for (i = 0; i < items.length; i += 1) {
		if ((items[i].mode === 1 && (items[i].quality !== 2 || !Misc.skipItem(items[i].classid))) || (items[i].mode === 0 && items[i].itemType === 74) ) {
			parsedItem = this.logItem(items[i], true);

			// Always put name on Char Viewer items
			if (!parsedItem.header) {
				parsedItem.header = (me.account || "Single Player") + " / " + me.name;
			}

			// Remove itemtype_ prefix from the name
			parsedItem.title = parsedItem.title.substr(parsedItem.title.indexOf("_") + 1);

			if (items[i].mode === 1 && (items[i].location !== 11 && items[i].location !== 12)) {
				parsedItem.title += " (equipped)";
			}

			if (NTIP.GetTier(items[i]) > 0) {
				parsedItem.header += "\n(Tier: " + NTIP.GetTier(items[i]) + ")";
			}

			if (items[i].mode === 1 && (items[i].location === 11 || items[i].location === 12)) {
				parsedItem.title += " (secondary equipped)";
			}

			if (items[i].mode === 0) {
				parsedItem.title += " (in stash)";
			}

			string = JSON.stringify(parsedItem);
			finalString += (string + "\n");
		}

	}

	if (Config.UseMerc) {
		for (i = 0; i < 3; i += 1) {
			merc = getMercFix();

			if (merc) {
				break;
			}

			delay(50);
		}

		if (merc) {
			items = merc.getItems();

			for (i = 0; i < items.length; i += 1) {
				parsedItem = this.logItem(items[i]);
				parsedItem.title += " (merc)";

				if (NTIP.GetMercTier(items[i]) > 0) {
					parsedItem.header += "(MercTier: " + NTIP.GetMercTier(items[i]) + ")\n";
				}

				string = JSON.stringify(parsedItem);
				finalString += (string + "\n");
			}
		}

	}

	charClass = ["amazon.", "sorceress.", "necromancer.", "paladin.", "barbarian.", "druid.", "assassin."][me.classid];

	// hcl = hardcore class ladder
	// sen = softcore expan nonladder
	FileTools.writeText("mules/" + realm + "/" + "SoloLeveling/" + me.account + "/" + charClass + me.name + "." + ( me.playertype ? "h" : "s" ) + (me.gametype ? "e" : "c" ) + ( me.ladder > 0 ? "l" : "n" ) + ".txt", finalString);
	print("Item logging done.");
};
