//receive all user saved preferences on initial start and anytime an option is selected (currently from NoClick add-ons options page)
self.port.on("send_all_prefrences_to_user", function (boarder_color_enabled, boarder_color, noclick_cursor_postion_selected, noclick_mouse_over_selected_text, noclick_all_text_select_mouse_out, noclick_font_text_color, noclick_font_text_color_preference, noclick_element_background_color, noclick_element_background_color_preference, noclick_saved_cursor_postion_on_type, noclick_checkbox_autochecking_enabled, noclick_radiobutton_autoselect_enabled, noclick_dropdown_autoshow_enabled) {
    //Global Function Vars::
    var noclick_inputtag = document.getElementsByTagName("input");
    var noclick_selecttags = document.getElementsByTagName("select");
    var noclick_textareatag = document.getElementsByTagName("textarea");
    var on_context_menu_do_not_mouse_out;  //leave here its still used!
    var ncs, nce;
    var ncss, ncse;
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

    for (var ncxx = 0; ncxx < noclick_textareatag.length; ncxx++) {
        //onMouse-Over (Set Cursor Positions)
        noclick_textareatag[ncxx].addEventListener("mouseover", function () {
            var ncf = 1;
            if (noclick_cursor_postion_selected != "off") {
                var result = cursor_boostrap_options(noclick_cursor_postion_selected, this.value.length, ncf);
                this.setSelectionRange(result.ncs, result.nce);
                this.focus();
            }
        });

        //blur active element if buttons up, down, end and home are pressed
        noclick_textareatag[ncxx].addEventListener("keyup", function () {
            //(33) is PageUp, (34) is PageDown, (35) is End, (36) is Home, (37) is ArrowUp, (40) is ArrowDown,
            if ([33, 34, 35, 36, 38, 40].indexOf(e.keyCode) > -1) {
                document.activeElement.blur();
                //console.log(e.keyCode)
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
                // ncsel ^= true; //Was flipper is real?
                // ncsel = 1;
                /*
                 if (noclick_mouse_over_selected_text) {
                 ncss = this.selectionStart;
                 ncse = this.selectionEnd;
                 }
                 */
            }
        });

        //onContextMenu (should remove listeners instead of boolean)
        noclick_textareatag[ncxx].addEventListener("contextmenu", function () {
            on_context_menu_do_not_mouse_out = true;
        });

        //onMouseOut (select all)
        noclick_textareatag[ncxx].addEventListener("mouseout", function () {
            if (noclick_cursor_postion_selected != "off" && !on_context_menu_do_not_mouse_out && noclick_all_text_select_mouse_out) {
                this.setSelectionRange(0, this.value.length);
            }
        });

        //onMouseScroll reset everything
        noclick_textareatag[ncxx].addEventListener("DOMMouseScroll", function () {
            ncsel = 0;
            this.blur();
            this.setSelectionRange(this.value.length, this.value.length); //this needs to be updated to pull from user addon options.
        });
    }

    ////////////////////////////////InputTags\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //checkbox input tag mouseover checked
    for (var ncxc = 0; ncxc < noclick_inputtag.length; ncxc++) {
        noclick_inputtag[ncxc].addEventListener("mouseover", function () {
            if (noclick_checkbox_autochecking_enabled) {
                this.checked = !this.checked;
            }
        })
    }

    for (var ncx = 0; ncx < noclick_inputtag.length; ncx++) {
        //onClick (Store Selection)
        noclick_inputtag[ncx].addEventListener("click", function (e) {

            if (noclick_cursor_postion_selected != "off") {
                ncsel = 1;
                //console.log(ncsel);
                if (noclick_mouse_over_selected_text) {
                    ncss = this.selectionStart;
                    ncse = this.selectionEnd;
                }
            }
        });

        //onMouse-Over set cursor positions


        (function(ncf) {
            noclick_inputtag[ncx].addEventListener("mouseover", function () {
                ncf ^= true;
                console.log(ncf);
                if (noclick_cursor_postion_selected != "off") {
                    if (!noclick_cursor_postion_selected) {
                        ncsel = 0;
                    }
                    if (ncsel === 0) {
                        var result = cursor_boostrap_options(noclick_cursor_postion_selected, this.value.length, ncf);
                        this.setSelectionRange(result.ncs, result.nce);
                    }
                    this.focus();
                }
            });
        })(ncf = 1);




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

        /*//Cursor Setting Per Character in input textbox's.

        document.addEventListener("mousemove", function(evt) {
            if(evt.target==evt.currentTarget)   {  return   }
            if(evt.target && evt.target.nodeName == "INPUT") {
                // evt.preventDefault();
                 evt.stopImmediatePropagation();
                 evt.bubbles = false;
                var current_element = evt.target;

                function getTextWidth(text, font) {
                    // re-use canvas object for better performance
                    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
                    canvas.width=1000;
                    canvas.height=50;
                    var context = canvas.getContext("2d");
                    context.font = font;
                    var metrics = context.measureText(text);
                    return metrics.width;
                }

                var element_base_browser_styles = window.getDefaultComputedStyle(current_element);
                var total_text_pixal_length = getTextWidth(current_element.value, element_base_browser_styles.fontFamily + " " + element_base_browser_styles.fontSize);

                var total_added_char_pixal_lengths = 0;

                var myStringArray = current_element.value.split('');
                var arrayLength = myStringArray.length;
                for (var i = 0; i <= arrayLength; i++) {
                    if (!myStringArray[i]) {
                        break;
                    }
                    var get_char_value = getTextWidth(myStringArray[i], element_base_browser_styles.fontFamily + " " + element_base_browser_styles.fontSize);
                    var total_current_element_width = getTextWidth(current_element.value, element_base_browser_styles.fontFamily + " " + element_base_browser_styles.fontSize);

                    total_added_char_pixal_lengths = total_added_char_pixal_lengths + (get_char_value); //every char value is added together.
                    precise_offset =  total_added_char_pixal_lengths  - evt.layerX;
                    precise_offset_devived = precise_offset / 2;

                    console.log(current_element.style);
                    console.log("total_current_element_width: " + ( total_current_element_width));
                    console.log("get_char_value-Width: " + getTextWidth(myStringArray[i], element_base_browser_styles.fontFamily + " " + element_base_browser_styles.fontSize));
                    console.log("Curent Cursor Pixals width: " + evt.layerX);
                    console.log('total_added_char_pixal_lengths: ' + total_added_char_pixal_lengths);
                    console.log('precise_offset: ' + Math.abs(precise_offset));


                    console.log('Current i for loop Char number: ' + i);

                    console.log("The Number to set: " + precise_offset);
                    console.log('======');


                    if ((total_added_char_pixal_lengths ) > (evt.layerX)) {
                        console.log("Char : " + myStringArray[i]);
                        current_element.setSelectionRange(i, i);
                        total_added_char_pixal_lengths = 0;
                        break;
                    }
                }
            }

        }, false);

        */

        //onContextMenu (Change to removeEventListener in the future)
        noclick_inputtag[ncx].addEventListener("contextmenu", function () {
            on_context_menu_do_not_mouse_out = true;
        });
        //onMouse-Out (Select All)
        noclick_inputtag[ncx].addEventListener("mouseout", function () {
                if (noclick_cursor_postion_selected != "off") {
                    if (ncsel == 1) {
                        if (!on_context_menu_do_not_mouse_out) {

                        }
                    }
                    if (ncsel == 0) {
                      //  ncss = this.selectionStart;
                       // ncse = this.selectionEnd;
                        this.setSelectionRange(0, this.value.length);
                    }
                    //  this.focus();
                }

            }
        );
        //onMouse-Scroll (Reset Everything)
        noclick_inputtag[ncx].addEventListener("DOMMouseScroll", function () {
            ncsel = 0;
            this.blur();
            this.setSelectionRange(0, 0)
        });
    }


//Cursor Logic
   // var ncf = 1; //EndOfString = 1, StartOfString = 0 - Used in function ncsf()
    function cursor_boostrap_options(xcursor_postion_selected, input_length, ncf) {
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

