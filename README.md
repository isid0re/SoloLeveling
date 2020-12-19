# SoloLeveling

An automated leveling script for all Diablo 2 softcore expansion characters using Kolbot from level 1 to 99. After the initial setup, the bot will operate without user involvement.

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
2. Extract and copy all files into the ```libs``` folder.
3. A proper installation will have the following folders and files added to the `libs` directory.
```	bots\				sololeveling.js
	SoloLeveling\Scripts\ 		[multiple scripts used for bot sequences]
	SoloLeveling\Functions\ 	[the various overrides and globals used by this script]
	SoloLeveling\BuildFiles\ 	[the various build files for the bots]
	configs\Builds\ 		[the autobuild templates for the bot builds]
	configs\ 			[the various class config files for the bots]
```

### Usage
1. Select the character config file for the class you want to build.
2. Save a copy of this config file with your new characters name. For example,
```
Paladin.SoloLeveling.js >> Paladin.YourCharacterNameGoesHere.js
```
3. Select the finalbuild you want to have by removing the // lines. The following example shows the finalbuild selected will be a Hammerdin:  
```
Scripts.SoloLeveling = true; // *** Leveling Script  ***
	var finalBuild = "Hammerdin";
	//var finalBuild = "Smiter";
	//var finalBuild = "Zealot";
``` 
4. Add a profile in D2Bot as you normally would using the character name as spelled in the selected config file.
5. Ensure the Difficulty is set to HIGHEST.
6. Use the D2BotLead.dbj entry script.
7. Click apply.
8. Run the Bot. 

### Contributing

This is a hobby project that I'm doing in my spare time. So if you enjoy using SoloLeveling consider supporting me at [buymeacoffee.com/isid0re](https://www.buymeacoffee.com/isid0re).

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
