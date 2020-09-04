# SoloLeveling

A script for BlizzHackers / Kolbot to level D2LOD characters from 0 to 99

## Installation

This script is designed to be plug and play with [blizzhackers/kolbot](https://github.com/blizzhackers/kolbot) after you've installed Kolbot per it's installation instructions. 

1. Download SoloLeveling 
2. Copy ```SoloLeveling.js``` from ```SoloLeveling\bots\``` to ```Kolbot\d2bs\kolbot\libs\bots\```
3. Copy the folder and its contents ```\SoloLeveling\``` from ```SoloLeveling\config\Builds``` to ```Kolbot\d2bs\kolbot\libs\config\Builds\```
4. Copy the class.config files from ```SoloLeveling\config``` to ```Kolbot\d2bs\kolbot\libs\config\```

## Usage
1. Select the character config file for the class you want to build.
2. Save a copy of this config file with your new characters name. For example,
```
Paladin.config.js >> Paladin.PutYourCharacterNameHere.js
```
3. Select the finalbuild you want to have by removing the // lines. The following example shows the finalbuild selected will be a Hammerdin:  
```
Scripts.SoloLeveling = true; // *** Leveling Script  ***
	//const finalBuild = "Auradin";
	const finalBuild = "Hammerdin";
	//const finalBuild = "Smiter";
	//const finalBuild = "Zealot";
``` 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
