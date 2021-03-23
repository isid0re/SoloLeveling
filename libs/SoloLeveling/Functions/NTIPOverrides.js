/*
*	@filename	NTIPOverrides.js
*	@author		isid0re
*	@desc		NTIPItemParser fixes to improve functionality and custom looping for performance
*/

if (!isIncluded("NTItemParser.dbl")) {
	include("NTItemParser.dbl");
}

var NTIP_CheckListNoTier = [];

NTIP.addLine = function (itemString) {
	let info = {
		line: 1,
		file: "SoloLeveling",
		string: line
	};

	let line = NTIP.ParseLineInt(itemString, info);

	if (line) {
		if (!itemString.toLowerCase().includes("tier")) {
			NTIP_CheckListNoTier.push(line);
		} else {
			NTIP_CheckListNoTier.push([false, false]);
		}

		NTIP_CheckList.push(line);
		stringArray.push(info);
	}

	return true;
};

NTIP.arrayLooping = function (arraytoloop) {
	for (let q = 0; q < arraytoloop.length; q += 1) {
		NTIP.addLine(arraytoloop[q]);
	}

	return true;
};

NTIP.CheckItem = function (item, entryList, verbose) {
	var i, list, identified, num,
		rval = {},
		result = 0;

	if (!entryList) {
		list = NTIP_CheckList;
	} else {
		list = entryList;
	}

	identified = item.getFlag(0x10);

	for (i = 0; i < list.length; i++) {
		try {
			// Get the values in separated variables (its faster)
			const [type, stat, wanted] = list[i];

			if (typeof type === 'function') {
				if (type(item)) {
					if (typeof stat === 'function') {
						if (stat(item)) {
							if (wanted && wanted.MaxQuantity && !isNaN(wanted.MaxQuantity)) {
								num = NTIP.CheckQuantityOwned(type, stat);

								if (num < wanted.MaxQuantity) {
									result = 1;

									break;
								} else {
									if (item.getParent() && item.getParent().name === me.name && item.mode === 0 && num === wanted.MaxQuantity) { // attempt at inv fix for maxquantity
										result = 1;

										break;
									}
								}
							} else {
								result = 1;

								break;
							}
						} else if (!identified && result === 0 || !identified && result === 1) {
							result = -1;

							if (verbose) {
								rval.line = stringArray[i].file + " #" + stringArray[i].line;
							}
						}
					} else {
						if (wanted && wanted.MaxQuantity && !isNaN(wanted.MaxQuantity)) {
							num = NTIP.CheckQuantityOwned(type, null);

							if (num < wanted.MaxQuantity) {
								result = 1;

								break;
							} else {
								if (item.getParent() && item.getParent().name === me.name && item.mode === 0 && num === wanted.MaxQuantity) { // attempt at inv fix for maxquantity
									result = 1;

									break;
								}
							}
						} else {
							result = 1;

							break;
						}
					}
				}
			} else if (typeof stat === 'function') {
				if (stat(item)) {
					if (wanted && wanted.MaxQuantity && !isNaN(wanted.MaxQuantity)) {
						num = NTIP.CheckQuantityOwned(null, stat);

						if (num < wanted.MaxQuantity) {
							result = 1;

							break;
						} else {
							if (item.getParent() && item.getParent().name === me.name && item.mode === 0 && num === wanted.MaxQuantity) { // attempt at inv fix for maxquantity
								result = 1;

								break;
							}
						}
					} else {
						result = 1;

						break;
					}
				} else if (!identified && result === 0 || !identified && result === 1) {
					result = -1;

					if (verbose) {
						rval.line = stringArray[i].file + " #" + stringArray[i].line;
					}
				}
			}
		} catch (pickError) {
			showConsole();

			if (!entryList) {
				Misc.errorReport("ÿc1Pickit error! Line # ÿc2" + stringArray[i].line + " ÿc1Entry: ÿc0" + stringArray[i].string + " (" + stringArray[i].file + ") Error message: " + pickError.message + " Trigger item: " + item.fname.split("\n").reverse().join(" "));

				NTIP_CheckList.splice(i, 1); // Remove the element from the list
			} else {
				Misc.errorReport("ÿc1Pickit error in runeword config!");
			}

			result = 0;
		}
	}

	if (verbose) {
		switch (result) {
		case -1:
			break;
		case 1:
			rval.line = stringArray[i].file + " #" + stringArray[i].line;

			break;
		default:
			rval.line = null;

			break;
		}

		rval.result = result;

		if (!identified && result === 1) {
			rval.result = -1;
		}

		return rval;
	}

	return result;
};

NTIP.OpenFile = function (filepath, notify) {
	if (!FileTools.exists(filepath)) {
		if (notify) {
			Misc.errorReport("ÿc1NIP file doesn't exist: ÿc0" + filepath);
		}

		return false;
	}

	var i, nipfile, line, lines, info, tick = getTickCount(), entries = 0,
		filename = filepath.substring(filepath.lastIndexOf("/") + 1, filepath.length);

	try {
		nipfile = File.open(filepath, 0);
	} catch (fileError) {
		if (notify) {
			Misc.errorReport("ÿc1Failed to load NIP: ÿc0" + filename);
		}
	}

	if (!nipfile) {
		return false;
	}

	lines = nipfile.readAllLines();

	nipfile.close();

	for (i = 0; i < lines.length; i += 1) {
		info = {
			line: i + 1,
			file: filename,
			string: lines[i]
		};

		line = NTIP.ParseLineInt(lines[i], info);

		if (line) {
			entries += 1;

			NTIP_CheckList.push(line);

			if (!lines[i].toLowerCase().match("tier")) {
				NTIP_CheckListNoTier.push(line);
			} else {
				NTIP_CheckListNoTier.push([false, false]);
			}

			stringArray.push(info);
		}
	}

	if (notify) {
		print("ÿc4Loaded NIP: ÿc2" + filename + "ÿc4. Lines: ÿc2" + lines.length + "ÿc4. Valid entries: ÿc2" + entries + ". ÿc4Time: ÿc2" + (getTickCount() - tick) + " ms");
	}

	return true;
};
