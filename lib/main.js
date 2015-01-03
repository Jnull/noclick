var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var Preferences = require("sdk/simple-prefs");
var windows = require("sdk/windows").browserWindows;
var {
    viewFor
} = require("sdk/view/core");
let aWindow = viewFor(windows.activeWindow);
//require("sdk/tabs").open(self.data.url("demo.html"));
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
            Preferences.prefs['saved_cursor_postion_on_type']
        )
    }
});

//noclicking tabs to switch 
aWindow.gBrowser.tabContainer.addEventListener("mouseover",
    function(e) { // this could be better, but passing the e parameter is giving me problems.
        if (Preferences.prefs['tab_focus_switching_enabled']) {
            if (aWindow.document.getElementById("toolbar-menubar").getAttribute("inactive")) {
                event = e.target;
                if (event != null) {
                    //focus new tab
                    aWindow.gBrowser.selectedTab = event;
                    //delete event
                    event = null;
                }
            }
        }
    }, false);

//noclicking url bar functions 
function nc_select_urlbar() {
    if (Preferences.prefs['url_focus_enabled']) {
        if (aWindow.document.getElementById("toolbar-menubar").getAttribute("inactive")) {
            aWindow.gURLBar.select();
            //aWindow.gURLBar.showHistoryPopup(); //next release this is buggie (Can't click it so pointless/clickless)
        }
    }
}

function nc_blur_urlbar() {
    if (Preferences.prefs['url_focus_enabled']) {
        if (aWindow.document.getElementById("toolbar-menubar").getAttribute("inactive")) {
            aWindow.gURLBar.blur()
        }
    }
}




function nc_blur_searchbar() {
    if (Preferences.prefs['search_focus_enabled']) {
        if (aWindow.document.getElementById("toolbar-menubar").getAttribute("inactive")) {
            aWindow.BrowserSearch.searchBar.textbox.open = false;
			aWindow.gURLBar.select();
            aWindow.gURLBar.blur();
        }
    }
}

function nc_select_searchbar() { //this function could be better, but whateva!!!
    if (Preferences.prefs['search_focus_enabled']) {
        if (aWindow.document.getElementById("toolbar-menubar").getAttribute("inactive")) {
            aWindow.gURLBar.select() //This is haxary: Stated Above..
            aWindow.BrowserSearch.searchBar.textbox.select()
        }
    }
}

function nc_deselect_searchbar() { //this function could be better, but whateva!!!
    if (Preferences.prefs['search_focus_enabled']) {
        if (aWindow.document.getElementById("toolbar-menubar").getAttribute("inactive")) {
			if(aWindow.BrowserSearch.searchBar.textbox.value === "") {
            aWindow.gURLBar.select() //This is haxary: Stated Above..
            aWindow.gURLBar.blur()
			}
			else  {
			aWindow.BrowserSearch.searchBar.textbox.open = true;
			}
        }
    }
}



//noclicking url bar main bootstrap kickoff 
aWindow.gURLBar.addEventListener("mouseover", nc_select_urlbar, false)
aWindow.gURLBar.addEventListener("mouseout", nc_blur_urlbar, false)

//noclicking search bar 
aWindow.BrowserSearch.searchBar.addEventListener("mouseout", nc_deselect_searchbar, false)
aWindow.BrowserSearch.searchBar.addEventListener("mouseenter", nc_select_searchbar, false)
aWindow.document.getElementById("mainPopupSet").addEventListener("mouseleave", nc_blur_searchbar, false);

//if mouseenter onto firefox then focus window 
aWindow.onmouseover = function() {
	    if (Preferences.prefs['lazy_focus_firefox_window_switching_enabled']) {
			
	        aWindow.focus()
		}

}


//log level 
/*
//require("sdk/preferences/service").set("extensions.sdk.console.logLevel", "all");
//require("sdk/preferences/service").set("extensions.jid1-qcmz2yMJ3oOBpA@jetpack.sdk.console.logLevel", "all");
all :Any console method
debug :debug(), error(), exception(), info(), log(), time(), timeEnd(), trace(), warn()
info :error(), exception(), info(), log(), time(), timeEnd(), trace(), warn()
warn :error(), exception(), warn()
error :error(), exception()
off :Nothing
*/