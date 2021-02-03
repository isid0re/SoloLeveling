# SoloLeveling

An automated leveling script for all Diablo 2 softcore expansion characters using Kolbot from level 1 to 99. After the initial setup, the bot will operate without user involvement. This is a hobby project that I'm doing in my spare time. So if you enjoy using SoloLeveling consider supporting me at [buymeacoffee.com/isid0re](https://www.buymeacoffee.com/isid0re).

### Features
- Operates in Hell difficulty within 24 hours
- Includes character build options for final respec
- Plays and finishes the game through Act 5 Hell
- Hires class/build specific mercenary
- Fully configured Autoequip for bot and mercenary
- Makes and equips CTA and spirit shield on swap

### Installation

This script is designed to be plug and play with [blizzhackers/kolbot](https://github.com/blizzhackers/kolbot) after you've installed Kolbot per it's installation instructions. If you are downloading Kolbot from the discord link use the "New Development" link.

1. Download SoloLeveling.zip
2. Extract and copy both the `libs` folder and `D2BotSoloLevelingEntry.dbj` into the `kolbot` folder.
3. A proper installation will have the following folders and files added to the `libs` directory.
```	
	bots\				sololeveling.js
	SoloLeveling\Scripts\ 		[multiple scripts used for bot sequences]
	SoloLeveling\Functions\ 	[the various overrides and globals used by this script]
	SoloLeveling\BuildFiles\ 	[the various build files for the bots]
	configs\Builds\ 		[the autobuild templates for the bot builds]
	configs\ 			[the various class config files for the bots]
```
4. A proper installation will have the `D2BotSoloLevelingEntry.dbj` in the same location as the `D2BotLead.dbj` entry script.

### Usage
1. After installation create your profile in the Kolbot D2Bot profile manager. The profile name will decide on the type of character to be made.
1a. The profile needs to adhere to the following format PREFIX-SUFFIX: (for example, a hardcore classic ladder sorceress will be `HCCL-SORC` or a softcore expansion nonladder hammerdin will be `SCNL-PAL`).
```
Prefix		Description		Suffix						Description
HC/SC		Hardcore/SoftCore	ZON, SORC, NECRO, PAL, BARB, DRUID, SIN		Abbreviated character class names
C		Classic	
NL/L		NonLadder/Ladder
```
1b. The profile Info Tag box will need to have the final build selection for the character type chosen. Please refer to the respective Class.Sololeveling.js config file for build options.
2. Ensure the Difficulty is set to HIGHEST.
3. Use the D2BotSoloLevelingEntry.dbj entry script.
4. Click apply.
5. Run the Bot. 

### Contributing

This is a hobby project that I'm doing in my spare time. So if you enjoy using SoloLeveling consider supporting me at [buymeacoffee.com/isid0re](https://www.buymeacoffee.com/isid0re).

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
