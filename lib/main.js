var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var Preferences = require("sdk/simple-prefs");
var windows = require("sdk/windows").browserWindows;
var {viewFor} = require("sdk/view/core");
let aWindow = viewFor(windows.activeWindow);
//require("sdk/tabs").open(self.data.url("demo.html"));
pageMod.PageMod({
    include: "*",
    attachTo: ["existing", "top", "frame"],
    contentScriptFile: self.data.url("noclick.js"),
    onAttach: function (worker) {
        //inbrowser features	
        let aWindow = viewFor(windows.activeWindow);
        Preferences.on("", onPrefChange = function () {
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
            Preferences.prefs['mouseover_selected_text'],
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
aWindow.gBrowser.tabContainer.addEventListener("mouseover",
    function (e) { // this could be better, but passing the e parameter is giving me problems.
        if (Preferences.prefs['tab_focus_switching_enabled']) {
            event = e.target;
            if (event != null) {
                //focus new tab
                aWindow.gBrowser.selectedTab = event;
                //delete event
                event = null;
            }
        }
    }, false);

//select all text in url bar
function nc_select_urlbar() {
    if (Preferences.prefs['url_focus_enabled']) {
        aWindow.gURLBar.click();
        aWindow.gURLBar.popup.openPopup(aWindow.document.getElementById("urlbar"), "after_start", 0, 0, false, false);
        aWindow.gURLBar.popup.width = aWindow.gURLBar.clientWidth
        //    gURLBar.popup.openPopup(document.getElementById("urlbar"), "after_start", 0, 0, false, false);
    }
}

//only blur if history popup not open
function nc_blur_urlbar() {
    if (Preferences.prefs['url_focus_enabled']) {
        if (!aWindow.gURLBar.popup.popupOpen) {
            aWindow.gURLBar.click();
            aWindow.gURLBar.blur();
        }
    }
}

function nc_mouseleave_search_popup() {
    if (Preferences.prefs['search_focus_enabled']) {
        aWindow.BrowserSearch.searchBar.textbox.open = false;
        aWindow.gURLBar.select();
        aWindow.gURLBar.blur();
    }
}

function nc_mouseenter_searchbar() { //this function could be better, but whateva!!!
    if (Preferences.prefs['search_focus_enabled']) {
        if (aWindow.document.getElementById("toolbar-menubar").getAttribute("inactive")) {
            aWindow.gURLBar.click(); //This is haxary: Stated Above..
            aWindow.BrowserSearch.searchBar.textbox.select()
        }
    }
}

function nc_mouseout_searchbar() { //this function could be better, but whateva!!!
    if (Preferences.prefs['search_focus_enabled']) {
        if (aWindow.document.getElementById("toolbar-menubar").getAttribute("inactive")) {
            if (aWindow.BrowserSearch.searchBar.textbox.value === "") {
                aWindow.gURLBar.select(); //This is haxary: Stated Above..
                aWindow.gURLBar.blur()
            }
            else {
                //aWindow.BrowserSearch.searchBar.textbox.open = true;
            }
        }
    }
}

//close history popup when not mousing over history popup
function nc_mouseover_close_history_popup_urlbar() {
    console.log(666);
    aWindowg.URLBar.popupOpen = false;
    aWindow.gURLBar.click();
    aWindow.gURLBar.blur();

}

//noclicking url bar
aWindow.gURLBar.addEventListener("mouseover", nc_select_urlbar, false);
aWindow.gURLBar.addEventListener("mouseout", nc_blur_urlbar, false);

//noclicking search bar
aWindow.document.getElementById("mainPopupSet").addEventListener("mouseleave", nc_mouseleave_search_popup, false);
aWindow.BrowserSearch.searchBar.addEventListener("mouseenter", nc_mouseenter_searchbar, false);
aWindow.BrowserSearch.searchBar.addEventListener("mouseout", nc_mouseout_searchbar, false);