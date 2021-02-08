/*
*	@filename	OOGOverrides.js
*	@author		theBGuy
*	@desc		OOG.js fixes to improve functionality for TCP/IP and singleplayer games
*/

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
