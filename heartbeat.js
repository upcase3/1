const APP_NAME = window.location.href.replace("file:///media/archive/", "").replace(".zip", "").split("/")[0]
const APP_FOLDER = "file:///media/archive/" + APP_NAME + ".zip"
const DISPLAY_WINDOW = APP_FOLDER + "/.'/.html"
let USED_URL = false
let DEBUG_STATUS = false
5
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
function retrieveSettings() {
    if (document.getElementsByTagName('TAG_ALTERNATE_URL')[0]) {
        USED_URL = document.getElementsByTagName('TAG_ALTERNATE_URL')[0].innerHTML
        document.getElementsByTagName('TAG_ALTERNATE_URL')[0].innerHTML = ""
    }
    if (document.getElementsByTagName('TAG_USE_DEBUG')[0]) {
        DEBUG_STATUS = document.getElementsByTagName('TAG_USE_DEBUG')[0].innerHTML
        document.getElementsByTagName('TAG_USE_DEBUG')[0].innerHTML = ""
    }
}

function newOpen(loc, smth, size) {
    var win = window.open("", "", "width=10000,height=10000")
    win.document.getElementsByTagName('html')[0].appendChild(document.createElement('head')).appendChild(document.createElement('title')).appendChild(document.createTextNode(APP_NAME));

    var iframe = win.document.createElement('iframe')

    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.position = "fixed"
    iframe.style.top = "0"
    iframe.style.left = "0"
    iframe.style.bottom = "0"
    iframe.style.right = "0"
    iframe.style.margin = "0"
    iframe.style.border = "none";
    iframe.style.padding = "0"
    iframe.frameBorder = "0"
    if (USED_URL) {
        iframe.src = USED_URL
    } else {
        iframe.src = loc || "DISPLAY_LINK_HERE"
    }

    win.document.body.appendChild(iframe)

    return win
}

function popUpWasBlocked(popUp) {
    return !popUp || popUp.closed || typeof popUp.closed === 'undefined'
}
function errorHandler() {
    location.reload()
}
function beginWindow() {
    document.getElementById("CONTEXT_MAIN").innerHTML = "You must ENABLE POPUPS to forceload."
    retrieveSettings()

    if (DEBUG_STATUS) {
        alert("DEBUGGER: " + DEBUG_STATUS + " " + USED_URL)
    }

    let w
    if (USED_URL) {
        w = newOpen(USED_URL || "no:parameters", "", "width=10000,height=10000")
    } else {
        w = window.open(DISPLAY_WINDOW || "no:parameters", "", "width=10000,height=10000")
    }

    if (popUpWasBlocked(w)) {
        sleep(2500)
        errorHandler(); // handle the error
    } else {
        open(location, '_self').close();
    }
}
beginWindow()
