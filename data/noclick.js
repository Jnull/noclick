//default variables declaration on first run 
var noclick_inputtag = document.getElementsByTagName("input");
var noclick_textareatag = document.getElementsByTagName("textarea");
var xcursor_postion_selected;
var xall_text_select_mouseout;
var xuser_prefs_mouseover_selected_text;
var xuser_prefs_all_text_select_mouseout;
var xnoclick_saved_cursor_postion_on_type;
var on_context_menu_do_not_mouse_out; 
//receive all user saved preferences on initial start and anytime an option is selected (currently from NoClick add-ons options page)
self.port.on("send_all_prefrences_to_user", function(
        boarder_color_enabled,
        boarder_color,
        cursor_postion_selected,
        user_prefs_mouseover_selected_text,
        user_prefs_all_text_select_mouseout,
        noclick_font_text_color,
        noclick_font_text_color_preference,
        noclick_element_background_color,
        noclick_element_background_color_preference,
		noclick_saved_cursor_postion_on_type)
{
        xcursor_postion_selected = cursor_postion_selected;
        xuser_prefs_mouseover_selected_text = user_prefs_mouseover_selected_text;
        xuser_prefs_all_text_select_mouseout = user_prefs_all_text_select_mouseout;
		xnoclick_saved_cursor_postion_on_type = noclick_saved_cursor_postion_on_type;
		
			if ( xnoclick_saved_cursor_postion_on_type == false || xcursor_postion_selected == "Begin" || 
			xcursor_postion_selected == "End" || 
			xcursor_postion_selected == "Alternate" || 
			xcursor_postion_selected == "off" ){
			ncsel = 0;
			if (document.activeElement) {
			document.activeElement.blur()
			}
			} 
			
	for (var noclick_counter10 = 0; noclick_counter10 < noclick_inputtag.length; noclick_counter10++) {
			   if (noclick_inputtag[noclick_counter10].type != "submit" || 
			   noclick_inputtag[noclick_counter10].type != "button" || 
				noclick_inputtag[noclick_counter10].type != "checkbox" || 
				noclick_inputtag[noclick_counter10].type != "color" || 
				noclick_inputtag[noclick_counter10].type != "date" || 
				noclick_inputtag[noclick_counter10].type != "datetime" || 
				noclick_inputtag[noclick_counter10].type != "datetime-local" || 
				noclick_inputtag[noclick_counter10].type != "email" || 
				noclick_inputtag[noclick_counter10].type != "file" || 
				noclick_inputtag[noclick_counter10].type != "hidden" || 
				noclick_inputtag[noclick_counter10].type != "image" || 
				noclick_inputtag[noclick_counter10].type != "month" || 
				noclick_inputtag[noclick_counter10].type != "radio" || 
				noclick_inputtag[noclick_counter10].type != "range" || 
				noclick_inputtag[noclick_counter10].type != "reset" || 
				noclick_inputtag[noclick_counter10].type != "week") 
				
				{
			        if (boarder_color_enabled == true) {
                    noclick_inputtag[noclick_counter10].style.borderColor = boarder_color;
					}
					else if (boarder_color_enabled == false) {
	                noclick_inputtag[noclick_counter10].style.borderColor = "";				
					}
					if (noclick_font_text_color_preference == true) {
					noclick_inputtag[noclick_counter10].style.color = noclick_font_text_color;
					}
					else if (noclick_font_text_color_preference == false) {
					noclick_inputtag[noclick_counter10].style.color = "";
					}
					if (noclick_element_background_color_preference == true) {
					noclick_inputtag[noclick_counter10].style.backgroundColor = noclick_element_background_color;
					}
					else if (noclick_element_background_color_preference == false) {
					noclick_inputtag[noclick_counter10].style.backgroundColor = "";
					}
				}
}
			
for (var noclick_counter11 = 0; noclick_counter11 < noclick_textareatag.length; noclick_counter11++) {
			        if (boarder_color_enabled == true) {
                    noclick_textareatag[noclick_counter11].style.borderColor = boarder_color;
					}
					else if (boarder_color_enabled == false) {
	                noclick_textareatag[noclick_counter11].style.borderColor = "";				
					}
					if (noclick_font_text_color_preference == true) {
					noclick_textareatag[noclick_counter11].style.color = noclick_font_text_color;
					}
					else if (noclick_font_text_color_preference == false) {
					noclick_textareatag[noclick_counter11].style.color = "";
					}
					if (noclick_element_background_color_preference == true) {
					noclick_textareatag[noclick_counter11].style.backgroundColor = noclick_element_background_color;
					}
					else if (noclick_element_background_color_preference == false) {
					noclick_textareatag[noclick_counter11].style.backgroundColor = "";
					}
			}

    })
    //noclick main function()
function noclick_main() {

    //textarea tags for loop through noclick_textareatag
    for (var ncxx = 0; ncxx < noclick_textareatag.length; ncxx++) {
        //onMouseOver (ncef() sets cursor vars.|Next: cursor vars setSelectionRange[ncs, nce].|Next: 'focus()')   
        noclick_textareatag[ncxx].addEventListener("mouseover", function() {
            cursor_boostrap_options(xcursor_postion_selected)
            if (xcursor_postion_selected != "off") {
                this.setSelectionRange(ncs, nce)
                this.focus()
            }
        });
        //onkeyup listens for: pageup, pagedown, end, or home to blur() this active element (this is a fix for input boxes retaining focus from page scrolling, why does it do that?))
        noclick_textareatag[ncxx].addEventListener("keyup", function() {
			if (e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35 || e.keyCode == 37) {
                document.activeElement.blur()
            }
			if (xcursor_postion_selected != "off") {
			if(xnoclick_saved_cursor_postion_on_type == true) {
            ncss = this.selectionStart;
            ncse = this.selectionEnd;
            ncsel = 1;
			}
			}
        });
        //onClick (Store user selection in ncse and ncse|Next: ncsel = 1 because user is now selecting text)
        noclick_textareatag[ncxx].addEventListener("click", function() {
			if (xcursor_postion_selected != "off") {
			
            if (xuser_prefs_mouseover_selected_text == true) {
                ncss = this.selectionStart;
                ncse = this.selectionEnd;
                ncsel = 1;
            } else if (xuser_prefs_mouseover_selected_text == false) {
                ncsel = 0;
            }
			}
        });
		//onContextMenu set a var so onMouseOut doesn't fire breaking selection 
		noclick_textareatag[ncxx].addEventListener("contextmenu", function() {
			on_context_menu_do_not_mouse_out = true;
		})
        //onMouseOut (String is fully selected '0'->EndOfString)
        noclick_textareatag[ncxx].addEventListener("mouseout", function() {
			if (xcursor_postion_selected != "off") {
				if (on_context_menu_do_not_mouse_out != true) {
					this.setSelectionRange(0, this.value.length);
				}
				}
        });
        //onMouseScroll (ncsel = '0' to put user in aNoSelectionState|Next: setSelectionRange(EndOfString,EndOfString) 
        noclick_textareatag[ncxx].addEventListener("DOMMouseScroll", function() {
            ncsel = 0;
            this.blur()
            this.setSelectionRange(this.value.length, this.value.length)
        });
    }

    //input tags for loop through noclick_inputtag
    for (var ncx = 0; ncx < noclick_inputtag.length; ncx++) {
        //onMouseOver (ncef() sets cursor vars.|Next: cursor vars setSelectionRange[ncs, nce].|Next: 'focus()')   
        noclick_inputtag[ncx].addEventListener("mouseover", function() {
			if (xcursor_postion_selected != "off") {
			if (xcursor_postion_selected == false){
			ncsel = 0;
			}
            cursor_boostrap_options(xcursor_postion_selected)
            this.setSelectionRange(ncs, nce)
            this.focus()
            }
        });

        //onkeyup listens for: pageup, pagedown, end, or home to blur() this active element (this is a fix for input boxes retaining focus from page scrolling, why does it do that?))
        noclick_inputtag[ncx].addEventListener("keyup", function(e) {
			if (e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35 || e.keyCode == 37) {
                document.activeElement.blur()
            }
			if(xnoclick_saved_cursor_postion_on_type == true) {
			ncss = this.selectionStart;
            ncse = this.selectionEnd;
			ncsel = 1;
			}
        });
        //onClick (Store user selection in ncse and ncse|Next: ncsel = 1 because user is now selecting text)
        noclick_inputtag[ncx].addEventListener("click", function() {
			if (xcursor_postion_selected != "off") {
			
            if (xuser_prefs_mouseover_selected_text == true) {
                ncss = this.selectionStart;
                ncse = this.selectionEnd;
                ncsel = 1;
            } else if (xuser_prefs_mouseover_selected_text == false) {
                ncsel = 0;
            }
			}
        });
		//onContextMenu set a var so onMouseOut doesn't fire breaking selection 
		noclick_inputtag[ncx].addEventListener("contextmenu", function() {
			on_context_menu_do_not_mouse_out = true;
		})
		
        //onMouseOut (String is fully selected '0'->EndOfString)
        noclick_inputtag[ncx].addEventListener("mouseout", function() {
			if (xcursor_postion_selected != "off") {
				if (on_context_menu_do_not_mouse_out != true) {
					this.setSelectionRange(0, this.value.length);
				}
				}
        });
		
        //onMouseScroll (ncsel = '0' to put user in aNoSelectionState|Next: setSelectionRange(EndOfString,EndOfString) 
        noclick_inputtag[ncx].addEventListener("DOMMouseScroll", function() {
            ncsel = 0;
            this.blur()
            this.setSelectionRange(this.value.length, this.value.length)
        });
    }
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
                ncf = 1; //set ncf equal to '1' for next "onmouseout" and "onmouseover".
                ncs = 0; //set cursor (start) selection to start of the string or '0' chars.
                nce = 0; //set cursor (end) selection to start of the string or '0' chars.
            } else if (ncf == 1) {
                ncf = 0; //set ncf equal to '0' for next "onmouseout" and "onmouseover".
                ncs = 255; //set cursor (start) selection to end of the string or '255' chars.
                nce = 255; //set cursor (end) selection to end of the string or '255' chars.
            }
        }
    }
}

noclick_main()

//Alpha Testing 
//////////////////////action button future
/* self.port.on("nc_disable", function(noclick_enabled) {
    if (noclick_enabled === 0) {
		var nctl4 = document.getElementsByTagName("input"), nctl5 = document.getElementsByTagName("textarea");     
		for (var ncxx = 0; ncxx < nctl4.length; ncxx++) {
			nctl4[ncxx].removeEventListener("mouseover", function() {    });
			nctl4[ncxx].removeEventListener("click", function() {    });
			nctl4[ncxx].removeEventListener("mouseout", function() {    });
			nctl4[ncxx].removeEventListener("DOMMouseScroll", function() {    });
	}
		for (var ncxx = 0; ncxx < nctl5.length; ncxx++) {
			nctl5[ncxx].removeEventListener("mouseover", function() {    });
			nctl5[ncxx].removeEventListener("click", function() {    });
			nctl5[ncxx].removeEventListener("mouseout", function() {    });
			nctl5[ncxx].removeEventListener("DOMMouseScroll", function() {    });
			}
    } else (noclick_enabled === 1) { 
			noclickmain()
		}
});
*/


//references http://stackoverflow.com/questions/25336693/updating-preferences-in-multiple-tabs-in-realtime-worker-emit