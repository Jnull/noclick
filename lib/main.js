var pageMod = require("sdk/page-mod");
var Preferences = require("sdk/simple-prefs");
var windows = require("sdk/windows").browserWindows;
var {viewFor} = require("sdk/view/core");
let aWindow = viewFor(windows.activeWindow);
pageMod.PageMod({
    include: /.*/,
    attachTo: ["existing", "top", "frame"],
    contentScriptFile: "./noclick.js",
    onAttach: function (worker) {
        let aWindow = viewFor(windows.activeWindow);
        Preferences.on("", onPrefChange = function () {
            worker.port.emit(
                "send_all_prefrences_to_user",
                Preferences.prefs['element_boarder_highlight_preference'],
                Preferences.prefs['element_boarder_highlight_color_preference'],
                Preferences.prefs['default_cursor_postion'],
                Preferences.prefs['mouse-over_selected_text'],
                Preferences.prefs['all_text_select_mouse-out'],
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
            Preferences.prefs['all_text_select_mouse-out'],
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
    function (e) {
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
aWindow.gURLBar.addEventListener("contextmenu", nc_context_menu_urlbar, false);
aWindow.gURLBar.addEventListener("mouseenter", nc_select_urlbar, false);
aWindow.gURLBar.addEventListener("click", nc_click_add_el_back, false);
aWindow.gURLBar.addEventListener("mouseout", nc_blur_urlbar, false);
function nc_blur_urlbar() {
    if (Preferences.prefs['url_focus_enabled']) {
        if(!aWindow.gURLBar.popupOpen){
            aWindow.gURLBar.blur()
        }}
}

function nc_click_add_el_back() {
    if (Preferences.prefs['url_focus_enabled']) {
        aWindow.gURLBar.addEventListener("mouseenter", nc_select_urlbar, false);
        aWindow.gURLBar.addEventListener("mouseout", nc_blur_urlbar, false);
    }
}
function nc_select_urlbar() {
    if (Preferences.prefs['url_focus_enabled']) {
        aWindow.gURLBar.click();
        aWindow.gURLBar.popup.openPopup(aWindow.document.getElementById("urlbar"), "after_start", 0, 0, false, false);
        aWindow.gURLBar.popup.width = aWindow.gURLBar.clientWidth;
    }
}
function nc_context_menu_urlbar () {
    if (Preferences.prefs['url_focus_enabled']) {
        aWindow.gURLBar.removeEventListener("mouseenter", nc_select_urlbar, false);
        aWindow.gURLBar.removeEventListener("mouseout", nc_blur_urlbar, false);
    }
}
//noclicking search bar
aWindow.document.getElementById("mainPopupSet").addEventListener("mouseleave", nc_mouseleave_search_popup, false);
aWindow.BrowserSearch.searchBar.addEventListener("mouseenter", nc_mouseenter_searchbar, false);
aWindow.BrowserSearch.searchBar.addEventListener("mouseout", nc_mouse_out_searchbar, false);
aWindow.BrowserSearch.searchBar.addEventListener("contextmenu", nc_context_menu_sb, false);
aWindow.BrowserSearch.searchBar.addEventListener("click", nc_click_sb, false);
function nc_context_menu_sb() {
    aWindow.BrowserSearch.searchBar.removeEventListener("mouseenter", nc_mouseenter_searchbar, false);
}
function nc_click_sb () {
    aWindow.BrowserSearch.searchBar.addEventListener("mouseenter", nc_mouseenter_searchbar, false);
}

function nc_mouseleave_search_popup() {
    if (Preferences.prefs['search_focus_enabled']) {
        aWindow.BrowserSearch.searchBar.textbox.open = false;
        aWindow.gURLBar.select();
        aWindow.gURLBar.blur();
    }
}
function nc_mouseenter_searchbar() {
    if (Preferences.prefs['search_focus_enabled']) {
        if (aWindow.document.getElementById("toolbar-menubar").getAttribute("inactive")) {
            aWindow.gURLBar.click();
            aWindow.BrowserSearch.searchBar.textbox.select()
        }
    }
}
function nc_mouse_out_searchbar() {
    if (Preferences.prefs['search_focus_enabled']) {
        if (aWindow.document.getElementById("toolbar-menubar").getAttribute("inactive")) {
            if (aWindow.BrowserSearch.searchBar.textbox.value === "") {
                aWindow.gURLBar.select();
                aWindow.gURLBar.blur()
            }
        }
    }
}
