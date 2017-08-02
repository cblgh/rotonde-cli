var fs = require("fs");
var osenv = require("osenv");
var path = require("path");

module.exports = {
    saveFile: saveFile,
    settings: readSettings,
    data: function() { 
        return readSettings().then((settings) => {
            return new Promise((resolve, reject) => {
                fs.readFile(settings["rotonde location"], (err, data) => {
                    if (err) { console.log("error reading rotonde location at ", settings["rotonde location"]); reject(err) };
                    resolve([JSON.parse(data), settings]); // parse rotonde info & pass along settings
                });
            });
        })
    }
}

function readSettings() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(osenv.home(), ".config", ".rotonde"), (err, data) => {
            if (err) { reject(err); }
            resolve(JSON.parse(data));
        })
    })
}

// utility function to save em all
function saveFile(settings, rotonde, successMsg) {
    fs.writeFile(settings["rotonde location"], JSON.stringify(rotonde), function(err) {
        if (err) { 
            console.error("err: couldn't save to", settings["rotonde location"]);
            console.error(err);
            return;
        }
        console.log(successMsg);
    })
}
