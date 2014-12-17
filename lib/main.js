var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var Preferences = require("sdk/simple-prefs");
var { Hotkey } = require("sdk/hotkeys");


// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
    include: "*",
	contentScriptWhen: "end",
    attachTo: ["top", "frame", "existing"],
    contentScriptFile: self.data.url("my-script.js"),
    onAttach: function(worker) {
        worker.port.emit('colorenabled', require('sdk/simple-prefs').prefs['colorenable']);
        worker.port.emit('changecolor', require('sdk/simple-prefs').prefs['inputboardercolor']);
		Hotkey({
			combo: "accel-shift-o",
			onPress: function() {
			worker.port.emit('xxx', "Kill Focus");
		}
		});
    }
});

// listens to all changes for all preferences 
// pass the preference object as a parameter to the onPrefChange() function.
Preferences.on("", onPrefChange);

// listens for all changes from a single preference change
Preferences.on("somePreference", onPrefChange);

// longhand declaration (same as using Preferences.on)
require("sdk/simple-prefs").on("someOtherPreference", onPrefChange);

function onPrefChange(prefName) {
  console.log("The preference " + 
              prefName + 
              " value has changed to: " +
              Preferences.prefs[prefName]);
}





/*
function onBoarderChange(prefName) {
    console.log("The " + prefName + " preference changed.");
	var prefs = require("sdk/simple-prefs").prefs;
	console.log(prefs.boardercolor);
}

function onBackGroundChange(prefName) {
    console.log("The " + prefName + " preference changed.");
	var prefs = require("sdk/simple-prefs").prefs;
	console.log(prefs.boardercolor);
}

function onTemplateChange(prefName) {
    console.log("The " + prefName + " preference changed.");
	var prefs = require("sdk/simple-prefs").prefs;
	console.log(prefs.boardercolor);
}

function onSafe(prefName) {
    console.log("The " + prefName + " preference changed.");
	var prefs = require("sdk/simple-prefs").prefs;
	console.log(prefs.boardercolor);
}
require("sdk/simple-prefs").on("somePreference", onPrefChange);
require("sdk/simple-prefs").on("someOtherPreference", onPrefChange);
require("sdk/simple-prefs").on("somePreference", onPrefChange);
require("sdk/simple-prefs").on("someOtherPreference", onPrefChange);
require("sdk/simple-prefs").on("somePreference", onPrefChange);
require("sdk/simple-prefs").on("someOtherPreference", onPrefChange);
*/