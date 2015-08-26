var { setTimeout, clearTimeout } = require("sdk/timers");
var pageMod = require("sdk/page-mod");
var Preferences = require("sdk/simple-prefs");
var data = require("sdk/self").data;
var windows = require("sdk/windows").browserWindows;
var {viewFor} = require("sdk/view/core");
let aWindow = viewFor(windows.activeWindow);


pageMod.PageMod({
    include: /.*/,
    attachTo: ["existing", "top", "frame"],
    contentScriptFile: data.url("noclick.js"),
    onAttach: function (worker) {
      //  let aWindow = viewFor(windows.activeWindow);
        Preferences.on("", onPrefChange = function () {
            worker.port.emit(
                "send_all_prefrences_to_user",
                Preferences.prefs['element_boarder_highlight_preference'],
                Preferences.prefs['element_boarder_highlight_color_preference'],
                Preferences.prefs['default_cursor_postion'],
                Preferences.prefs['mouse-over_selected_text'],
                Preferences.prefs['all_text_select_mouseout'],
                Preferences.prefs['font_text_color'],
                Preferences.prefs['font_text_color_preference'],
                Preferences.prefs['element_background_color'],
                Preferences.prefs['element_background_color_preference'],
                Preferences.prefs['saved_cursor_postion_on_type'],
                Preferences.prefs['checkbox_autochecking_enabled'],
                Preferences.prefs['radiobutton_autoselecting_enabled'],
                Preferences.prefs['dropdown_autoshow_enabled']
            )
        });
        worker.port.emit(
            "send_all_prefrences_to_user",
            Preferences.prefs['element_boarder_highlight_preference'],
            Preferences.prefs['element_boarder_highlight_color_preference'],
            Preferences.prefs['default_cursor_postion'],
            Preferences.prefs['mouse-over_selected_text'],
            Preferences.prefs['all_text_select_mouseout'],
            Preferences.prefs['font_text_color'],
            Preferences.prefs['font_text_color_preference'],
            Preferences.prefs['element_background_color'],
            Preferences.prefs['element_background_color_preference'],
            Preferences.prefs['saved_cursor_postion_on_type'],
            Preferences.prefs['checkbox_autochecking_enabled'],
            Preferences.prefs['radiobutton_autoselecting_enabled'],
            Preferences.prefs['dropdown_autoshow_enabled']
        )
    }
});


//noclicking tabs to switch
var timeoutID;
aWindow.gBrowser.tabContainer.addEventListener("mouseover",
    function (e) {
        aWindow.DownloadsPanel.hidePanel();
        if (Preferences.prefs['tab_focus_switching_enabled']) {
            function slowAlert() {
                event = e.target;
                if (event != null) {
                    //focus new tab
                    aWindow.gBrowser.selectedTab = event;
                    //delete event
                    event = null;
                }
            }
            clearTimeout(timeoutID);
           timeoutID = setTimeout(slowAlert, Preferences.prefs['tab_focus_switching_delay']);
        }
    }, false);

aWindow.gBrowser.tabContainer.addEventListener("mouseout",
    function (e) {

            clearTimeout(timeoutID);

    }, false);
