var util = require("./rotonde-utils.js")
var fs = require("fs")
var crypto = require("crypto")
module.exports = {
    save: save,
    write: write,
    delete: function() {},
    follow: follow, 
    unfollow: unfollow,
    name: name,
    color: color,
    location: location
}

function save(rotondePath) {
}

function write(text, url, media, focus) {
    util.data().then((rotondeItems) => {
        var [rotonde, settings] = rotondeItems;
        var hash = crypto.createHash("sha256").update(text).digest("hex");
        var entry = {"text": text, "time": parseInt((new Date).getTime() / 1000), "id": hash}

        if (url) { entry["url"] = url; }
        if (media) { entry["media"] = media; }
        if (focus) { entry["focus"] = focus; }

        rotonde["feed"].push(entry);
        fs.writeFile(settings["rotonde location"], JSON.stringify(rotonde), function(err) {
            if (err) { 
                console.error("err: couldn't save to", settings["rotonde location"]);
                console.error(err);
                return;
            }
            console.log("the entry was published", text);
        })
    })
}

function follow(portal) {
}

function unfollow(portal) {
}

function color(c) {
}

function name(n) {
}

function location(l) {
}
