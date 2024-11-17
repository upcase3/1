const APP_NAME = window.location.href.replace("file:///media/archive/", "").replace(".zip", "").split("/")[0]
const APP_FOLDER = "file:///media/archive/" + APP_NAME + ".zip"
let DISPLAY_WINDOW = APP_FOLDER + "/.'/.html"
let USED_URL = false
let DEBUG_STATUS = false
let BLOB_URL = false
let BLOB_FANCY = false
let USE_DEFAULT = true

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
        USE_DEFAULT = false
        document.getElementsByTagName('TAG_ALTERNATE_URL')[0].innerHTML = ""
    }
    if (document.getElementsByTagName('TAG_USE_DEBUG')[0]) {
        DEBUG_STATUS = true
        document.getElementsByTagName('TAG_USE_DEBUG')[0].innerHTML = ""
    }
    if (document.getElementsByTagName('TAG_USE_BLOB')[0]) {
        BLOB_URL = document.getElementsByTagName('TAG_USE_BLOB')[0].innerHTML
        USE_DEFAULT = false
        document.getElementsByTagName('TAG_USE_BLOB')[0].innerHTML = ""
    }
    if (document.getElementsByTagName('TAG_USE_BLOB_WITH_CONTENTS')[0]) {
        BLOB_FANCY = true
        USE_DEFAULT = false
        document.getElementsByTagName('TAG_USE_BLOB_WITH_CONTENTS')[0].innerHTML = ""
    }
}

function launchBlank(loc) {
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

    iframe.src = loc || "https://upcase3.github.io/1/root/storage/404"

    win.document.body.appendChild(iframe)

    return win
}

function launchBlob(newURL) {
    const htmlContent = `
        <html>

        <head>
            <title>Home</title>
        </head>

        <body>
             <iframe src="${newURL || "https://upcase3.github.io/1/root/storage/404"}"
                style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">
                bad device
            </iframe>
        </body>

        </html>
        `

    const blob = new Blob([htmlContent], {
        type: 'text/html'
    });

    const blobUrl = URL.createObjectURL(blob);

    let newWindow = window.open(blobUrl, "", "width=10000,height=10000")

    return newWindow
}

function popUpWasBlocked(popUp) {
    return !popUp || popUp.closed || typeof popUp.closed === 'undefined'
}
function errorHandler() {
    location.reload()
}
function beginWindow() {
    window.document.title = "Home"
    if (APP_NAME == "file:") { // not a properly packed zip, likely a folder
        DISPLAY_WINDOW = "https://upcase3.github.io/1/root/storage/405"
        BLOB_FANCY = true
        USED_URL = false
        BLOB_URL = false
        USE_DEFAULT = false
    }
    if (document.getElementById("CONTEXT_MAIN")) {
        document.getElementById("CONTEXT_MAIN").innerHTML = "You must ENABLE POPUPS to forceload."
    }
    retrieveSettings()

    if (DEBUG_STATUS) {
        alert("DEBUGGER: " + DEBUG_STATUS + " " + USED_URL + " NAME IS: " + APP_NAME)
    }

    let w
    if (USED_URL) {
        w = launchBlank(USED_URL || "https://upcase3.github.io/1/root/storage/404", "", "width=10000,height=10000")
    }
    if (BLOB_URL) {
        w = launchBlob(BLOB_URL)
    }
    if (BLOB_FANCY) {
        w = launchBlob(DISPLAY_WINDOW)
    }
    if (USE_DEFAULT) {
        w = window.open(DISPLAY_WINDOW || "https://upcase3.github.io/1/root/storage/404", "", "width=10000,height=10000")
    }
 
    if (popUpWasBlocked(w)) {
        sleep(2500)
        errorHandler();
    } else {
        open(location, '_self').close();
    }
}
function displayErrorScreen(Title, Desc) {
    let win = window.open("https://upcase3.github.io/1/root/storage/404", "", "width=10000,height=10000")
    win.document.getElementById("TITLE").innerHTML = Title || "апплицатионс"
    win.document.getElementById("ISSUE_DESC").innerHTML = Desc || "An error occured. There was no reason provided in JavaScript."

    open(location, '_self').close();
}

beginWindow()