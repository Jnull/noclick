var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var Preferences = require("sdk/simple-prefs");
pageMod.PageMod({
    include: "*",
    attachTo: ["existing", "top", "frame"],
    contentScriptFile: self.data.url("noclick.js"),
    onAttach: function(worker) {
        Preferences.on("", onPrefChange = function() {
            worker.port.emit(
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
        worker.port.emit(
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