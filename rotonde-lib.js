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
        var [rotonde, settings] = rotondeItems
        var hash = crypto.createHash("sha256").update(text).digest("hex")
        var entry = {"text": text, "time": parseInt((new Date).getTime() / 1000), "id": hash}

        if (url) { entry["url"] = url }
        if (media) { entry["media"] = media }
        if (focus) { entry["focus"] = focus }

        rotonde["feed"].push(entry)
        fs.writeFile(settings["rotonde location"], JSON.stringify(rotonde), function(err) {
            if (err) { 
                console.error("err: couldn't save to", settings["rotonde location"])
                console.error(err)
                return
            }
            console.log("the entry was published", text)
        })
    })
}

function follow(portal) {
    util.data().then((rotondeItems) => {
        var [rotonde, settings] = rotondeItems
        if (rotonde["portal"].indexOf(portal) >= 0) {
            console.log("already following", portal)
            return
        }
        rotonde["portal"].push(portal) // save the portal we want to follow
        fs.writeFile(settings["rotonde location"], JSON.stringify(rotonde), function(err) {
            if (err) { 
                console.error("err: couldn't save portal to rotonde.json")
                console.error(err)
                return
            }
            console.log("now following", portal)
        })
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
        rotonde["portal"].splice(rotonde["portal"].indexOf(portal), 1) // remove portal we want to unfollow
        fs.writeFile(settings["rotonde location"], JSON.stringify(rotonde), function(err) {
            if (err) { 
                console.error("err: couldn't save to", settings["rotonde location"])
                console.error(err)
                return
            }
            console.log("no longer following", portal)
        })
    })
}

function color(c) {
}

function name(n) {
}

function location(l) {
}
