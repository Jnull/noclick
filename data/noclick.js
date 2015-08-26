//receive all user saved preferences on initial start and anytime an option is selected (currently from NoClick add-ons options page)
self.port.on("send_all_prefrences_to_user", function (boarder_color_enabled, boarder_color, noclick_cursor_postion_selected, noclick_mouse_over_selected_text, noclick_all_text_select_mouse_out, noclick_font_text_color, noclick_font_text_color_preference, noclick_element_background_color, noclick_element_background_color_preference, noclick_saved_cursor_postion_on_type, noclick_checkbox_autochecking_enabled, noclick_radiobutton_autoselect_enabled, noclick_dropdown_autoshow_enabled) {
    //Global Function Vars::
    var noclick_inputtag = document.getElementsByTagName("input");
    var noclick_selecttags = document.getElementsByTagName("select");
    var noclick_textareatag = document.getElementsByTagName("textarea");
    var on_context_menu_do_not_mouse_out;  //leave here its still used!

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

    ///////////////////Textarea tags\\\\\\\\\\\\\\\\\\\\\\\\\\
    for (var ncxx = 0; ncxx < noclick_textareatag.length; ncxx++) {
        //onMouse-Over set cursor positions
        (function (ncf, ncss, ncse, ncsel) {

            //CLICK (Store Selection)
            noclick_textareatag[ncxx].addEventListener("click", function (e) {
                if (noclick_cursor_postion_selected != "off") {
                    ncsel = 1;
                    if (noclick_mouse_over_selected_text) {
                        ncss = this.selectionStart;
                        ncse = this.selectionEnd;

                        if (ncse === ncss) {
                            ncsel = 0;
                        }
                    }
                }
            });

            //onMouse-Out (Select All)
            noclick_textareatag[ncxx].addEventListener("mouseout", function () {
                    if (noclick_cursor_postion_selected != "off") {
                        this.setSelectionRange(0, this.value.length);
                    }
                }
            );

            noclick_textareatag[ncxx].addEventListener("mouseover", function () {
                ncf ^= true;
                if (noclick_cursor_postion_selected != "off") {
                    if (!noclick_cursor_postion_selected) {
                        //   ncsel = 0;
                    }
                    var result = cursor_boostrap_options(noclick_cursor_postion_selected, this.value.length, ncf, ncss, ncse, ncsel);
                    this.setSelectionRange(result.ncs, result.nce);
                    this.focus();
                }

            });

            //blur active element if buttons up, down, end and home are pressed
            noclick_textareatag[ncxx].addEventListener("keyup", function (e) {
                //(33) is PageUp, (34) is PageDown, (35) is End, (36) is Home, (37) is ArrowUp, (40) is ArrowDown,
                if ([33, 34, 35, 36, 38, 40].indexOf(e.keyCode) > -1) {
                    document.activeElement.blur();
                }
                if (noclick_saved_cursor_postion_on_type) {
                    ncss = this.selectionStart;
                    ncse = this.selectionEnd;
                    ncsel = 1;
                }
            });

            //onContextMenu (Change to removeEventListener in the future)
            noclick_textareatag[ncxx].addEventListener("contextmenu", function () {
                on_context_menu_do_not_mouse_out = true;
            });
        })(ncf = 1, ncss = 0, ncse = 0, ncsel = 0);

}


    ////////////////////////////////InputTags\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    for (var ncxc = 0; ncxc < noclick_inputtag.length; ncxc++) {

        //CHECKBOX
        noclick_inputtag[ncxc].addEventListener("mouseover", function () {
            if (noclick_checkbox_autochecking_enabled) {
                this.checked = !this.checked;
            }
        })
    }

    //Main Input Tag For Loop addEventListeners
    for (var ncx = 0; ncx < noclick_inputtag.length; ncx++) {
        //onMouse-Over set cursor positions
        (function (ncf, ncss, ncse, ncsel) {

            //CLICK (Store Selection)
            noclick_inputtag[ncx].addEventListener("click", function (e) {
                if (noclick_cursor_postion_selected != "off") {
                    ncsel = 1;
                    if (noclick_mouse_over_selected_text) {
                        ncss = this.selectionStart;
                        ncse = this.selectionEnd;

                        if (ncse === ncss) {
                            ncsel = 0;
                        }
                    }
                }
            });

            //onMouse-Out (Select All)
            noclick_inputtag[ncx].addEventListener("mouseout", function () {
                    if (noclick_cursor_postion_selected != "off") {
                        this.setSelectionRange(0, this.value.length);
                    }
                }
            );


            noclick_inputtag[ncx].addEventListener("mouseover", function () {
                ncf ^= true;
                if (noclick_cursor_postion_selected != "off") {
                    if (!noclick_cursor_postion_selected) {
                        //   ncsel = 0;
                    }
                    var result = cursor_boostrap_options(noclick_cursor_postion_selected, this.value.length, ncf, ncss, ncse, ncsel);
                    this.setSelectionRange(result.ncs, result.nce);
                    this.focus();
                }

            });

            //blur active element if buttons up, down, end and home are pressed
            noclick_inputtag[ncx].addEventListener("keyup", function (e) {
                //(33) is PageUp, (34) is PageDown, (35) is End, (36) is Home, (37) is ArrowUp, (40) is ArrowDown,
                if ([33, 34, 35, 36, 38, 40].indexOf(e.keyCode) > -1) {
                    document.activeElement.blur();
                }
                if (noclick_saved_cursor_postion_on_type) {
                    ncss = this.selectionStart;
                    ncse = this.selectionEnd;
                    ncsel = 1;
                }
            });


        })(ncf = 1, ncss = 0, ncse = 0, ncsel = 0);



        //onContextMenu (Change to removeEventListener in the future)
        noclick_inputtag[ncx].addEventListener("contextmenu", function () {
            on_context_menu_do_not_mouse_out = true;
        });

    }


//Cursor Logic
    // var ncf = 1; //EndOfString = 1, StartOfString = 0 - Used in function ncsf()
    function cursor_boostrap_options(xcursor_postion_selected, input_length, ncf, ncss, ncse, ncsel) {
        if (ncsel == 1) {
            return {
                ncs: ncss,
                nce: ncse
            }
        } else if (ncsel == 0) { //NoSelectionStat (No text is selected).
            if (xcursor_postion_selected == "Begin") {
                return {
                    ncs: 0,
                    nce: 0
                }
            } else if (xcursor_postion_selected == "End") {
                return {
                    ncs: input_length,
                    nce: input_length
                }
            } else if (xcursor_postion_selected == "Alternate") {

                if (ncf == 0) {
                    return {
                        ncs: 0,
                        nce: 0
                    }
                } else if (ncf == 1) {
                    return {
                        ncs: input_length,
                        nce: input_length
                    }
                }
            }
        }
    }
});

