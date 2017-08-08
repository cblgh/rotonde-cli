var fs = require("fs")
var osenv = require("osenv")
var path = require("path")

var rotondedir = path.resolve(osenv.home(), ".config", "rotonde")
module.exports = {
    dir: rotondedir,
    saveFile: saveFile,
    settings: readSettings,
    saveSettings: saveSettings,
    data: function() { 
        return readSettings().then(function (settings) {
            return new Promise(function (resolve, reject) {
                fs.readFile(settings["rotonde location"], function (err, data) {
                    if (err) { console.log("error reading rotonde location at ", settings["rotonde location"]); reject(err) }
                    resolve([JSON.parse(data), settings]) // parse rotonde info & pass along settings
                })
            })
        })
    }
}

function readSettings() {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.resolve(rotondedir, ".rotonde"), function(err, data) {
            if (err) { reject(err) }
            resolve(JSON.parse(data))
        })
    })
}

function saveSettings(settings) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path.resolve(rotondedir, ".rotonde"), JSON.stringify(settings), function(err, data) {
            if (err) { reject(err) }
            resolve()
        })
    })
}

// utility function to save em all
function saveFile(settings, rotonde, successMsg) {
    fs.writeFile(settings["rotonde location"], JSON.stringify(rotonde), function(err) {
        if (err) { 
            console.error("err: couldn't save to", settings["rotonde location"])
            console.error(err)
            return
        }
        console.log(successMsg)
    })
}
