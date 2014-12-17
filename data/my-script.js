self.port.on("colorenabled", function(colorhasbeenenabled) {
    if (colorhasbeenenabled == true) {
        colorisenabled = 1;
    } else {
        colorisenabled = 0
    }
});

self.port.on("changecolor", function(colorselected) {
    if (colorisenabled == 1) {
        var nci = document.getElementsByTagName("input");
        for (var ncx1 = 0; ncx1 < nci.length; ncx1++) {
            nci[ncx1].style.borderColor = colorselected; //loop through all 'input' and set the BorderColor pulled from simplePrefs
        }
        var nct = document.getElementsByTagName("textarea");
        for (var ncy = 0; ncy < nct.length; ncy++) {
            nct[ncy].style.borderColor = colorselected; //loop through all 'textarea' and set the BorderColor pulled from simplePrefs
        }
    }
});

self.port.on("ncdisable", function(disabledfirefox) {
    if (ncENABLED == 1) {
var nctl4 = document.getElementsByTagName("input"); //place all input tags into nctl4
for (var ncxx = 0; ncxx < nctl4.length; ncxx++) {
    nctl4[ncxx].removeEventListener("mouseover", function() {    });
    nctl4[ncxx].removeEventListener("click", function() {    });
    nctl4[ncxx].removeEventListener("mouseout", function() {    });
    nctl4[ncxx].removeEventListener("DOMMouseScroll", function() {    });
}

var nctl4 = document.getElementsByTagName("textarea"); //Remove all input tags into nctl4
for (var ncxx = 0; ncxx < nctl4.length; ncxx++) {
    nctl4[ncxx].removeEventListener("mouseover", function() {    });
    nctl4[ncxx].removeEventListener("click", function() {    });
    nctl4[ncxx].removeEventListener("mouseout", function() {    });
    nctl4[ncxx].removeEventListener("DOMMouseScroll", function() {    });
			}
    }
	else {

		}
});

var ncsel = 0; //NoSelectionStat (No text is selected) - Used in function ncsf()
var ncf = 1; //EndOfString = 1, StartOfString = 0 - Used in function ncsf()
//This is where the magic happens! ["<input">]
var nctll = document.getElementsByTagName("textarea"); //place all input tags into nctll
for (var ncxx = 0; ncxx < nctll.length; ncxx++) {
    //onMouseOver (ncef() sets cursor vars.|Next: cursor vars setSelectionRange[ncs, nce].|Next: 'focus()')   
    nctll[ncxx].addEventListener("mouseover", function() {
        ncsf();
        this.setSelectionRange(ncs, nce);
        this.focus();
    });
	//onkeyup listens for: pageup, pagedown, end, or home to blur() this active element (this is a fix for input boxes retaining focus from page scrolling, why does it do that?))
	nctll[ncxx].addEventListener("keyup", function() {
		if(e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35 || e.keyCode == 37) {
			document.activeElement.blur()
		}
	});
    //onClick (Store user selection in ncse and ncse|Next: ncsel = 1 because user is now selecting text)
    nctll[ncxx].addEventListener("click", function() {
        ncss = this.selectionStart;
        ncse = this.selectionEnd;
        ncsel = 1;
    });
    //onMouseOut (String is fully selected '0'->EndOfString)
    nctll[ncxx].addEventListener("mouseout", function() {
        this.setSelectionRange(0, this.value.length);
		
    });
    //onMouseScroll (ncsel = '0' to put user in aNoSelectionState|Next: setSelectionRange(EndOfString,EndOfString) 
    nctll[ncxx].addEventListener("DOMMouseScroll", function() {
        ncsel = 0;
        this.setSelectionRange(this.value.length, this.value.length)
    });

}

//This is where the magic happens! ["<input">]
var nctl = document.getElementsByTagName("input");
for (var ncx = 0; ncx < nctl.length; ncx++) {
    //onMouseOver (ncef() sets cursor vars.|Next: cursor vars setSelectionRange[ncs, nce].|Next: 'focus()')   
    nctl[ncx].addEventListener("mouseover", function() {
        ncsf();
        this.setSelectionRange(ncs, nce);
        this.focus();
    });
	//onkeyup listens for: pageup, pagedown, end, or home to blur() this active element (this is a fix for input boxes retaining focus from page scrolling, why does it do that?))
    nctl[ncx].addEventListener("keyup", function(e) {
		if(e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35 || e.keyCode == 37) {
			document.activeElement.blur()
		}
    });
    //onClick (Store user selection in ncse and ncse|Next: ncsel = 1 because user is now selecting text)
    nctl[ncx].addEventListener("click", function() {
        ncss = this.selectionStart;
        ncse = this.selectionEnd;
        ncsel = 1;
    });
    //onMouseOut (String is fully selected '0'->EndOfString)
    nctl[ncx].addEventListener("mouseout", function() {
        this.setSelectionRange(0, this.value.length);
    });
    //onMouseScroll (ncsel = '0' to put user in aNoSelectionState|Next: setSelectionRange(EndOfString,EndOfString) 
    nctl[ncx].addEventListener("DOMMouseScroll", function() {
        ncsel = 0;
        this.setSelectionRange(this.value.length, this.value.length);
    });
}


function ncsf() {
    if (ncsel == 1) {
        ncs = ncss;
        nce = ncse;
    }
    
    else if (ncsel == 0) { //NoSelectionStat (No text is selected). 
        if (ncf == 0) {
            ncf = 1; //resets ncf equal to '1' for next "onmouseout" and "onmouseover".
            ncs = 0; //set cursor start selection to beginning of the string or '0' chars.
            nce = 0; //set cursor end selection to end of the string or '0' chars.
        } else if (ncf == 1) {
            ncf = 0; //resets ncf equal to '0' for next "onmouseout" and "onmouseover".
            ncs = 255; //set cursor start selection to end of the string or '255' chars.
            nce = 255; //set cursor end selection to end of the string or '255' chars.
        }
    }
}


