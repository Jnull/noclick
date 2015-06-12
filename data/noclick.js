//receive all user saved preferences on initial start and anytime an option is selected (currently from NoClick add-ons options page)
self.port.on("send_all_prefrences_to_user", function (boarder_color_enabled, boarder_color, noclick_cursor_postion_selected, noclick_mouse_over_selected_text, noclick_all_text_select_mouse_out, noclick_font_text_color, noclick_font_text_color_preference, noclick_element_background_color, noclick_element_background_color_preference, noclick_saved_cursor_postion_on_type, noclick_checkbox_autochecking_enabled, noclick_radiobutton_autoselect_enabled, noclick_dropdown_autoshow_enabled) {
    //Global Function Vars::
    var noclick_inputtag = document.getElementsByTagName("input");
    var noclick_selecttags = document.getElementsByTagName("select");
    var noclick_textareatag = document.getElementsByTagName("textarea");
    var on_context_menu_do_not_mouse_out;  //leave here its still used!
    var ncs, nce;
    var ncss, ncee;
    var ncsel = 0;
    //colors
    for (var noclick_counter10 = 0; noclick_counter10 < noclick_inputtag.length; noclick_counter10++) {
        if (noclick_inputtag[noclick_counter10].type != "submit") {
            if (boarder_color_enabled == true) {
                noclick_inputtag[noclick_counter10].style.borderColor = boarder_color;
            } else if (boarder_color_enabled == false) {
                noclick_inputtag[noclick_counter10].style.borderColor = "";
            }
            if (noclick_font_text_color_preference == true) {
                noclick_inputtag[noclick_counter10].style.color = noclick_font_text_color;
            } else if (noclick_font_text_color_preference == false) {
                noclick_inputtag[noclick_counter10].style.color = "";
            }
            if (noclick_element_background_color_preference == true) {
                noclick_inputtag[noclick_counter10].style.backgroundColor = noclick_element_background_color;
            } else if (noclick_element_background_color_preference == false) {
                noclick_inputtag[noclick_counter10].style.backgroundColor = "";
            }
        }
    }
    //colors
    for (var noclick_counter11 = 0; noclick_counter11 < noclick_textareatag.length; noclick_counter11++) {
        if (boarder_color_enabled == true) {
            noclick_textareatag[noclick_counter11].style.borderColor = boarder_color;
        } else if (boarder_color_enabled == false) {
            noclick_textareatag[noclick_counter11].style.borderColor = "";
        }
        if (noclick_font_text_color_preference == true) {
            noclick_textareatag[noclick_counter11].style.color = noclick_font_text_color;
        } else if (noclick_font_text_color_preference == false) {
            noclick_textareatag[noclick_counter11].style.color = "";
        }
        if (noclick_element_background_color_preference == true) {
            noclick_textareatag[noclick_counter11].style.backgroundColor = noclick_element_background_color;
        } else if (noclick_element_background_color_preference == false) {
            noclick_textareatag[noclick_counter11].style.backgroundColor = "";
        }
    }
    //Select  (autoselect dropdown's) -disabled by default
    for (var ncxs = 0; ncxs < noclick_selecttags.length; ncxs++) {
        noclick_selecttags[ncxs].addEventListener("mouseover", function () {
            if (noclick_dropdown_autoshow_enabled) {
                this.size = 5;
            }
            else {
                this.size = null;
            }
        });
        noclick_selecttags[ncxs].addEventListener("mouseout", function () {
            this.size = null;
        });
    }
    for (var ncxc = 0; ncxc < noclick_inputtag.length; ncxc++) {
        noclick_inputtag[ncxc].addEventListener("mouseover", function () {
            if (noclick_checkbox_autochecking_enabled && this.type !== "radio") {
                this.checked = !this.checked;
            }
            else if (this.type === "radio" && noclick_radiobutton_autoselect_enabled) {
                this.checked = !this.checked;
            }
            else {
            }
        })
    }
    for (var ncxx = 0; ncxx < noclick_textareatag.length; ncxx++) {
        //onMouse-Over (Set Cursor Positions)
        noclick_textareatag[ncxx].addEventListener("mouseover", function () {
            cursor_boostrap_options(noclick_cursor_postion_selected);
            if (noclick_cursor_postion_selected != "off") {
                this.setSelectionRange(ncs, nce);
                this.focus()
            }
        });
        //blur active element if buttons up, down, end and home are pressed
        noclick_textareatag[ncxx].addEventListener("keyup", function () {
            if (e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35 || e.keyCode == 37) {
                document.activeElement.blur()
            }
            if (noclick_cursor_postion_selected != "off") {
                if (noclick_saved_cursor_postion_on_type) {
                    ncss = this.selectionStart;
                    ncse = this.selectionEnd;
                    ncsel = 1;
                }
            }
        });
        //onClick (Store selection)
        noclick_textareatag[ncxx].addEventListener("click", function () {
            if (noclick_cursor_postion_selected != "off") {
                ncsel ^= false; //Was flipper is real?
                if (noclick_mouse_over_selected_text) {
                    ncss = this.selectionStart;
                    ncse = this.selectionEnd;
                    }
            }
        });
        //onContextMenu (should remove listeners instead of boolean)
        noclick_textareatag[ncxx].addEventListener("contextmenu", function () {
            on_context_menu_do_not_mouse_out = true;
        });
        //onMouseOut (select all)
        noclick_textareatag[ncxx].addEventListener("mouseout", function () {
            if (noclick_cursor_postion_selected != "off") {
                if (!on_context_menu_do_not_mouse_out) {
                    this.setSelectionRange(0, this.value.length);
                }
            }
        });
        //onMouseScroll reset everything
        noclick_textareatag[ncxx].addEventListener("DOMMouseScroll", function () {
            ncsel = 0;
            this.blur();
            this.setSelectionRange(this.value.length, this.value.length); //this needs to be updated to pull from user addon options.
        });
    }
    for (var ncx = 0; ncx < noclick_inputtag.length; ncx++) {
        //onMouse-Over set cursor positions
        noclick_inputtag[ncx].addEventListener("mouseover", function () {
            if (noclick_cursor_postion_selected != "off") {
                if (!noclick_cursor_postion_selected) {
                    ncsel = 0;
                }
                cursor_boostrap_options(noclick_cursor_postion_selected);
                this.setSelectionRange(ncs, nce);
                this.focus()
            }
        });
        //blur active element if buttons up, down, end and home are pressed
        noclick_inputtag[ncx].addEventListener("keyup", function (e) {
            if (e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35 || e.keyCode == 37) {
                document.activeElement.blur()
            }
            if (noclick_saved_cursor_postion_on_type) {
                ncss = this.selectionStart;
                ncse = this.selectionEnd;
                ncsel = 1;
            }
        });
        //onClick (Store Selection)
        noclick_inputtag[ncx].addEventListener("click", function () {
            if (noclick_cursor_postion_selected != "off") {
                ncsel ^= false; //Was flipper the dolphin real?
                if (noclick_mouse_over_selected_text) {
                    ncss = this.selectionStart;
                    ncse = this.selectionEnd;
                }
            }
        });
        //onContextMenu (Change to removeEventListener in the future)
        noclick_inputtag[ncx].addEventListener("contextmenu", function () {
            on_context_menu_do_not_mouse_out = true;
        });
        //onMouse-Out (Select All)
        noclick_inputtag[ncx].addEventListener("mouseout", function () {
            if (noclick_cursor_postion_selected != "off") {
                if (!on_context_menu_do_not_mouse_out) {
                    this.setSelectionRange(0, this.value.length);
                }
            }
        });
        //onMouse-Scroll (Reset Everything)
        noclick_inputtag[ncx].addEventListener("DOMMouseScroll", function () {
            ncsel = 0;
            this.blur();
            this.setSelectionRange(this.value.length, this.value.length)
        });
    }
//Cursor Logic 
    var ncf = 1; //EndOfString = 1, StartOfString = 0 - Used in function ncsf()
    function cursor_boostrap_options(xcursor_postion_selected) {
        if (ncsel === 1) {
            ncs = ncss;
            nce = ncse;
        } else if (ncsel == 0) { //NoSelectionStat (No text is selected).
            if (xcursor_postion_selected == "Begin") {
                ncs = 0;
                nce = 0;
            } else if (xcursor_postion_selected == "End") {
                ncs = 255;
                nce = 255;
            } else if (xcursor_postion_selected == "Alternate") {
                ncf ^= true;
                if (ncf === 0) {
                    ncs = 0; //set cursor (start) selection to start of the string or '0' chars.
                    nce = 0; //set cursor (end) selection to start of the string or '0' chars.
                } else if (ncf === 1) {
                    ncs = 255; //set cursor (start) selection to end of the string or '255' chars.
                    nce = 255; //set cursor (end) selection to end of the string or '255' chars.
                }

            }
        }

    }
});
