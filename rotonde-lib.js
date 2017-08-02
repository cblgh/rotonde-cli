var util = require("./rotonde-utils.js")
var fs = require("fs")
var crypto = require("crypto")
module.exports = {
    save: save, // TODO
    write: write,
    delete: function() {},
    follow: follow, 
    unfollow: unfollow,
    attribute: attribute
}

function save(rotondePath) {
}

function write(text, url, media, focus) {
    util.data().then((rotondeItems) => {
        var [rotonde, settings] = rotondeItems
        var hash = crypto.createHash("sha256").update(text).digest("hex")
        var entry = {"text": text, "time": parseInt((new Date).getTime() / 1000), "id": hash}

        if (url) { entry["url"] = url }
        if (media) { entry["media"] = media }
        if (focus) { entry["focus"] = focus }

        rotonde["feed"].push(entry)
        saveFile(settings, rotonde, "the entry was published " + text)
    })
}

function follow(portal) {
    util.data().then((rotondeItems) => {
        var [rotonde, settings] = rotondeItems
        if (rotonde["portal"].indexOf(portal) >= 0) {
            console.log("already following", portal)
            return
        }
        rotonde["portal"].push(portal) 
        // save the portal we want to follow
        util.saveFile(settings, rotonde, "now following " + portal)
    })
}

function unfollow(portal) {
    util.data().then((rotondeItems) => {
        var [rotonde, settings] = rotondeItems
        var index = rotonde["portal"].indexOf(portal)
        if (index < 0) {
            console.log("err: you aren't following", portal)
            return
        }
        
        // remove portal we want to unfollow
        rotonde["portal"].splice(rotonde["portal"].indexOf(portal), 1) 
        util.saveFile(settings, rotonde, "no longer following " + portal)
    })
}

// change an attribute of your rotonde portal
// e.g. color, name, or location
function attribute(attr, value) {
    util.data().then((rotondeItems) => {
        var [rotonde, settings] = rotondeItems;
        rotonde["profile"][attr] = value;
        util.saveFile(settings, rotonde, "your " + attr + " was changed to " + value)
    })
}
