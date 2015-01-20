
//receive all user saved preferences on initial start and anytime an option is selected (currently from NoClick add-ons options page)
self.port.on("send_all_prefrences_to_user", function(
    boarder_color_enabled,
    boarder_color,
    noclick_cursor_postion_selected,
    noclick_mouseover_selected_text,
    noclick_all_text_select_mouseout,
    noclick_font_text_color,
    noclick_font_text_color_preference,
    noclick_element_background_color,
    noclick_element_background_color_preference,
    noclick_saved_cursor_postion_on_type,
    noclick_checkbox_autochecking_enabled,
    noclick_radiobutton_autoselect_enabled,
    noclick_dropdown_autoshow_enabled) {


    //Global Function Vars::
    var noclick_inputtag = document.getElementsByTagName("input");
    var noclick_selecttags = document.getElementsByTagName("select");
    var noclick_textareatag = document.getElementsByTagName("textarea");
    var on_context_menu_do_not_mouse_out;  //leave here its still used!
    var ncs, nce;
    var ncss, ncee;


        ncsel = 0;
        if (document.activeElement) {
            document.activeElement.blur()
        }

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
    //autoshow select lists for tags (whatever its buggy still, it just f's the wholepage..)
    for (var ncxs = 0; ncxs < noclick_selecttags.length; ncxs++) {
            noclick_selecttags[ncxs].addEventListener("mouseover", function () {
                if (noclick_dropdown_autoshow_enabled) {
                    console.log("What is happening!?!?");
                    this.size = 5;
                }
                else {  this.size = null;   }
            });
            noclick_selecttags[ncxs].addEventListener("mouseout", function () {
                this.size = null;
            });
    }

    //check checkbox input tags 
    for (var ncxc = 0; ncxc < noclick_inputtag.length; ncxc++) {
        noclick_inputtag[ncxc].addEventListener("mouseover", function () {
            if (noclick_checkbox_autochecking_enabled && this.type !== "radio") {
                this.checked = !this.checked;
            }
            else if (this.type === "radio" && noclick_radiobutton_autoselect_enabled) {
                this.checked = !this.checked;
            }
            else {}
        })
    }

    //textarea tags for loop through noclick_textareatag
    for (var ncxx = 0; ncxx < noclick_textareatag.length; ncxx++) {
        //onMouse-Over (ncef() sets cursor vars.|Next: cursor vars setSelectionRange[ncs, nce].|Next: 'focus()')   
        noclick_textareatag[ncxx].addEventListener("mouseover", function () {
            cursor_boostrap_options(noclick_cursor_postion_selected);
            if (noclick_cursor_postion_selected != "off") {
                this.setSelectionRange(ncs, nce);
                this.focus()
            }
        });
        //onkeyup listens for: pageup, pagedown, end, or home to blur() this active element (this is a fix for input boxes retaining focus from page scrolling, why does it do that?))
        noclick_textareatag[ncxx].addEventListener("keyup", function () {
            if (e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35 || e.keyCode == 37) {
                document.activeElement.blur()
            }
            if (noclick_cursor_postion_selected != "off") {
                if (noclick_saved_cursor_postion_on_type == true) {
                    ncss = this.selectionStart;
                    ncse = this.selectionEnd;
                    ncsel = 1;
                }
            }
        });
        //onClick (Store user selection in ncse and ncse|Next: ncsel = 1 because user is now selecting text)
        noclick_textareatag[ncxx].addEventListener("click", function () {
            if (noclick_cursor_postion_selected != "off") {

                if (noclick_mouseover_selected_text == true) {
                    ncss = this.selectionStart;
                    ncse = this.selectionEnd;
                    ncsel = 1;
                } else if (noclick_mouseover_selected_text == false) {
                    ncsel = 0;
                }
            }
        });
        //onContextMenu set a var so onMouseOut doesn't fire breaking selection 
        noclick_textareatag[ncxx].addEventListener("contextmenu", function () {
            on_context_menu_do_not_mouse_out = true;
        });
        //onMouseOut (String is fully selected '0'->EndOfString)
        noclick_textareatag[ncxx].addEventListener("mouseout", function () {
            if (noclick_cursor_postion_selected != "off") {
                if (on_context_menu_do_not_mouse_out != true) {
                    this.setSelectionRange(0, this.value.length);
                }
            }
        });
        //onMouseScroll (ncsel = '0' to put user in aNoSelectionState|Next: setSelectionRange(EndOfString,EndOfString) 
        noclick_textareatag[ncxx].addEventListener("DOMMouseScroll", function () {
            ncsel = 0;
            this.blur();
            this.setSelectionRange(this.value.length, this.value.length); //this needs to be updated to pull from user addon options.
        });
    }
    //input tags for loop through noclick_inputtags
    for (var ncx = 0; ncx < noclick_inputtag.length; ncx++) {
        //onMouse-Over (ncef() sets cursor vars.|Next: cursor vars setSelectionRange[ncs, nce].|Next: 'focus()')   
        noclick_inputtag[ncx].addEventListener("mouseover", function () {
            if (noclick_cursor_postion_selected != "off") {
                if (noclick_cursor_postion_selected == false) {
                    ncsel = 0;
                }
                cursor_boostrap_options(noclick_cursor_postion_selected);
                this.setSelectionRange(ncs, nce);
                this.focus()
            }
        });


        //onkeyup listens for: pageup, pagedown, end, or home to blur() this active element (this is a fix for input boxes retaining focus from page scrolling, why does it do that?))
        noclick_inputtag[ncx].addEventListener("keyup", function (e) {
            if (e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35 || e.keyCode == 37) {
                document.activeElement.blur()
            }
            if (noclick_saved_cursor_postion_on_type == true) {
                ncss = this.selectionStart;
                ncse = this.selectionEnd;
                ncsel = 1;
            }
        });

        //onClick (Store user selection in ncse and ncse|Next: ncsel = 1 because user is now selecting text)
        noclick_inputtag[ncx].addEventListener("click", function () {
            if (noclick_cursor_postion_selected != "off") {

                if (noclick_mouseover_selected_text == true) {
                    ncss = this.selectionStart;
                    ncse = this.selectionEnd;
                    ncsel = 1;
                } else if (noclick_mouseover_selected_text == false) {
                    ncsel = 0;
                }
            }
        });
        //onContextMenu set a var so onMouse-Out doesn't fire breaking selection 
        noclick_inputtag[ncx].addEventListener("contextmenu", function () {
            on_context_menu_do_not_mouse_out = true;
        });
        //onMouse-Out (String is fully selected '0'->EndOfString)
        noclick_inputtag[ncx].addEventListener("mouseout", function () {
            if (noclick_cursor_postion_selected != "off") {
                if (on_context_menu_do_not_mouse_out != true) {
                    this.setSelectionRange(0, this.value.length);
                }
            }
        });
        //onMouse-Scroll (ncsel = '0' to put user in aNoSelectionState|Next: setSelectionRange(EndOfString,EndOfString) 
        noclick_inputtag[ncx].addEventListener("DOMMouseScroll", function () {
            ncsel = 0;
            this.blur();
            this.setSelectionRange(this.value.length, this.value.length)
        });
    }

//Cursor Logic 
    var ncsel = 0; //No text is selected - Used in function ncsf()
    var ncf = 1; //EndOfString = 1, StartOfString = 0 - Used in function ncsf()
    function cursor_boostrap_options(xcursor_postion_selected) {
        if (ncsel == 1) {
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
                if (ncf == 0) {
                    ncf = 1; //set ncf equal to '1' for next "onmouse-out" and "onmouse-over".
                    ncs = 0; //set cursor (start) selection to start of the string or '0' chars.
                    nce = 0; //set cursor (end) selection to start of the string or '0' chars.
                } else if (ncf == 1) {
                    ncf = 0; //set ncf equal to '0' for next "onmouse-out" and "onmouse-over".
                    ncs = 255; //set cursor (start) selection to end of the string or '255' chars.
                    nce = 255; //set cursor (end) selection to end of the string or '255' chars.
                }
            }
        }

    }

});
//better noclick http://www.nczonline.net/blog/2009/06/30/event-delegation-in-javascript/