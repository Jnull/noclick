var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var Preferences = require("sdk/simple-prefs");
var windows = require("sdk/windows").browserWindows;
var {viewFor} = require("sdk/view/core");

require("sdk/tabs").open(self.data.url("demo.html"));

pageMod.PageMod({
    include: "*",
    attachTo: ["existing", "top", "frame"],
    contentScriptFile: self.data.url("noclick.js"),
    onAttach: function(worker) {
//inbrowser features	
let aWindow = viewFor(windows.activeWindow);
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
            Preferences.prefs['saved_cursor_postion_on_type'],
			
			Preferences.prefs['tab_focus_switching_enabled'],
			Preferences.prefs['url_focus_enabled'],
			Preferences.prefs['search_focus_enabled']
			
			
			)
    }
});
//noclicking url bar functions 
function nc_select_urlbar() {aWindow.gURLBar.select()}
function nc_blur_urlbar() {aWindow.gURLBar.blur()}
function nc_select_searchbar() {aWindow.BrowserSearch.searchBar.select()}
function nc_blur_searchbar() {
	//if stupid search popup for YAHOO..eh not open then blue that bee-zee.
	if(!aWindow.BrowserSearch.searchBar._textbox.open) {
	aWindow.BrowserSearch.searchBar._textbox.blur()
	}
}
//noclicking url bar main bootstrap kickoff 	
let aWindow = viewFor(windows.activeWindow);
aWindow.gURLBar.addEventListener("mouseover",nc_select_urlbar, false)
aWindow.gURLBar.addEventListener("mouseout",nc_blur_urlbar, false)
aWindow.BrowserSearch.searchBar.addEventListener("mouseover",nc_select_searchbar, false)
aWindow.BrowserSearch.searchBar.addEventListener("mouseout",nc_blur_searchbar, true, true)

//noclicking tabs to switch 
aWindow.gBrowser.tabContainer.addEventListener("mouseover", 
function(e) { 
if (Preferences.prefs['tab_focus_switching_enabled']) {
	event=e.target;
	if(event!=null)
		{
			//focus new tab
			aWindow.gBrowser.selectedTab=event;
			//delete event
			event=null;
		}
	}
 }, false);
 
 
 //log level 
 /*
all :Any console method
debug :debug(), error(), exception(), info(), log(), time(), timeEnd(), trace(), warn()
info :error(), exception(), info(), log(), time(), timeEnd(), trace(), warn()
warn :error(), exception(), warn()
error :error(), exception()
off :Nothing
*/

//var nc_debug_logging = require("sdk/preferences/service");
//nc_debug_logging.set("extensions.sdk.console.logLevel", "all");
require("sdk/preferences/service").set("extensions.sdk.console.logLevel", "all");
//require("sdk/preferences/service").set("extensions.jid1-qcmz2yMJ3oOBpA@jetpack.sdk.console.logLevel", "all");
//nc_debug_logging.set("extensions.jid1-qcmz2yMJ3oOBpA@jetpack.sdk.console.logLevel", false);


//https://developer.mozilla.org/en-US/docs/Tools/Browser_Console