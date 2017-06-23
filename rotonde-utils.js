var fs = require("fs");
var osenv = require("osenv");
var path = require("path");

module.exports = {
    settings: readSettings,
    data: function() { 
        return readSettings().then((settings) => {
            return new Promise((resolve, reject) => {
                fs.readFile(settings["rotonde location"], (err, data) => {
                    if (err) { reject(err) };
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
