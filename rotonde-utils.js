var fs = require("fs")
var osenv = require("osenv")
var path = require("path")
var mkdirp = require("mkdirp")
var rotondedir = path.resolve(osenv.home(), ".config", "rotonde")

// default json structure
var rotondeStructure = {
    "profile": {
        "name": "void",
        "location": "the lake of rotonde",
        "color": "#000000"
    },
    "feed": [],
    "portal": ["rotonde.cblgh.org", "rotonde.xxiivv.com"]
}

module.exports = {
    dir: rotondedir,
    saveFile: saveFile,
    defaultjson: rotondeStructure,
    createJsonBase: createDefaultJson,
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

function createDefaultJson(rotondefile) {
    return new Promise(function (resolve, reject) {
        fs.stat(rotondefile, function(err, stat) {
            if (err == null) {
                resolve()
                // file already exists
            } else if (err.code == "ENOENT") {
                console.log("no rotonde file at %s, creating one with the base structure...", rotondefile)
                fs.writeFile(rotondefile, JSON.stringify(rotondeStructure), function(err) {
                    if (err) {
                        console.log(err)
                        console.error("failed to create", rotondefile)
                        reject(err)
                    }
                    console.log("rotonde file %s created!", rotondefile)
                    resolve();
                })
            } else {
                console.log("err", err.code)
                reject(err)
            }
        })
    })
}
// returns the contents of ~/.config/rotonde/.rotonde,
// creating a default config if none exists
function readSettings() {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.resolve(rotondedir, ".rotonde"), function(err, data) {
        // if readSettings fails due to no ~/.config/rotonde or ~/.config/rotonde/.rotonde
        // then we create it, set its contents to defaults and return the defaults.
        // we set initial rotonde location to the current directory
        // and we create a template rotonde.json at the rotonde location i.e. the cwd
            if (err) { 
                if (err.code === "ENOENT") {
                    console.log("no such file or folder!!")
                    console.log("create .rotonde with the defaults:)")
                    // create the folder structure 
                    mkdirp.sync(rotondedir)

                    // write the default settings to ~/.config/rotonde/.rotonde
                    var rotondefile = path.resolve("rotonde.json")
                    var defaults = {"rotonde location": rotondefile}
                    createDefaultJson(rotondefile).then(function() {
                            resolve(defaults)
                    })
                }
            } else {
                resolve(JSON.parse(data))
            }
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
    return new Promise(function (resolve, reject) {
        fs.writeFile(settings["rotonde location"], JSON.stringify(rotonde), function(err) {
            if (err) { 
                console.error("err: couldn't save to", settings["rotonde location"])
                console.error(err)
                reject(err)
            }
            console.log(successMsg)
            resolve()
        })
    })
}
