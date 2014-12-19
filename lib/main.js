var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var Preferences = require("sdk/simple-prefs");
var {
    Hotkey
} = require("sdk/hotkeys");
var tabs = require("sdk/tabs");
var tabWorkers = [];

Preferences.on("", onPrefChange = function() {
    for each(var thisTabWorker in tabWorkers) {
        thisTabWorker.port.emit(
            "send_all_prefrences_to_user",
            Preferences.prefs['element_boarder_highlight_preference'],
            Preferences.prefs['element_boarder_highlight_color_preference'],
            Preferences.prefs['default_cursor_postion'],
            Preferences.prefs['mouseover_selected_text'],
            Preferences.prefs['all_text_select_mouseout'],
            Preferences.prefs['font_text_color'],
            Preferences.prefs['font_text_color_preference'],
            Preferences.prefs['element_background_color'],
            Preferences.prefs['element_background_color_preference'],
			Preferences.prefs['saved_cursor_postion_on_type'])
	
    }
});

tabs.on('ready', function(tab) {
    tabWorker = tabWorkers[tab.id] = tab.attach({
        contentScriptFile: self.data.url("noclick.js")
    });
    tabWorker.port.emit(
        "send_all_prefrences_to_user",
        Preferences.prefs['element_boarder_highlight_preference'],
        Preferences.prefs['element_boarder_highlight_color_preference'],
        Preferences.prefs['default_cursor_postion'],
        Preferences.prefs['mouseover_selected_text'],
        Preferences.prefs['all_text_select_mouseout'],
        Preferences.prefs['font_text_color'],
        Preferences.prefs['font_text_color_preference'],
        Preferences.prefs['element_background_color'],
        Preferences.prefs['element_background_color_preference'],
		Preferences.prefs['saved_cursor_postion_on_type'])
});

tabs.on('close', function(tab) {
    delete tabWorkers[tab.id];
});