/*
*	@filename	Settings.js
*	@author		theBGuy
*	@desc		Configurable settings for Sololeveling
*/

/* To use this feature uncomment this function and change the value of the return to true/false for whichever class you'd like to perform logging with.
	In example, to use logging with paladin class I would first need to remove // from in front of
		//shouldLog: logBasedOnClass(),	//Default should be false for people who aren't interested in performance statistics
		//useOverlay: logBasedOnClass(),	//Default should be false for people who aren't interested in having the overlay
	and add // in front of 
		shouldLog: false,	//Default should be false for people who aren't interested in performance statistics
		useOverlay: false,	//Default should be false for people who aren't interested in having the overlay
	then I would need to remove the /* from before and after the following function and then if the return value was not true for case "PAL" I would need to change it to true.
	If I didn't wish for any other class to have logging their return values must be set to false.
*/

/*var logBasedOnClass = function () {
	let buildCheck = me.profile.toUpperCase();
		buildCheck = me.profile.split("-"); 
		buildCheck[1] = buildCheck[1].toString().substring(0, 3); // removes numbers ZON for switch
		buildCheck[1] = buildCheck[1].toUpperCase();

	switch (buildCheck[1]) {
	case "ZON":
		return true;
	case "SOR":
		return true;
	case "NEC":
		return true;
	case "PAL":
		return false;
	case "BAR":
		return true;
	case "DRU":
		return true;
	case "SIN":
		return true;
	default:
		D2Bot.printToConsole("Settings: Failed to get charClass. Please check that your profile was entered correctly.", 6);
		return false;
	}
};*/

const SoloSettings = {
	//shouldLog: logBasedOnClass(),	//Default should be false for people who aren't interested in performance statistics
	//useOverlay: logBasedOnClass(),	//Default should be false for people who aren't interested in having the overlay
	shouldLog: false,	//Default should be false for people who aren't interested in performance statistics
	useOverlay: false,	//Default should be false for people who aren't interested in having the overlay
	logEquipped: false,	//Default should be false for people who arne't interested in having equipped items viewable from D2Bot# charviewer tab

	debugging: {
		verbose: false,
		logItems: false,
		logExperience: false,
		debugScripts: false,
	}

};