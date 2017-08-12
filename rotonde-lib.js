var util = require("./rotonde-utils.js")
var fs = require("fs")
var crypto = require("crypto")
var path = require("path")
var mkdirp = require("mkdirp")

module.exports = {
    save: save, 
    write: write,
    delete: function() {}, // empty for now, current impl is so-so
    follow: follow, 
    unfollow: unfollow,
    attribute: attribute
}


// save the location of your rotonde.json in a well-known config file ~/.config/.rotonde
function save(rotondefile) {
    rotondefile = path.resolve(rotondefile)
    var hasExt = path.extname(rotondefile) === ".json"
    if (!hasExt) {
        rotondefile = path.resolve(rotondefile, "rotonde.json")
    }
    return new Promise(function(resolve, reject) {
        // create ~/.config/rotonde if it doesn't already exist
        mkdirp.sync(util.dir)
        // write to the config file ~/.config/.rotonde
        fs.writeFile(path.resolve(util.dir, ".rotonde"), JSON.stringify({"rotonde location": rotondefile}), function(err) {
            if (err) {
                console.error("failed to create config file!")
                reject()
            } 
            resolve()
        })
    })
    .catch(function(err) {
        console.log(err)
        console.log("terminating due to error :<")
        process.exit()
    })
    .then(function() {
        // creates a base rotonde.json unless one already exists
        util.createJsonBase(rotondefile)
    })
}

function write(text, url, media, focus) {
    return util.data().then((rotondeItems) => {
        var [rotonde, settings] = rotondeItems
        var hash = crypto.createHash("sha256").update(text).digest("hex")
        var entry = {"text": text, "time": parseInt((new Date).getTime() / 1000), "id": hash}

        if (url) { entry["url"] = url }
        if (media) { entry["media"] = media }
        if (focus) { entry["focus"] = focus }

        rotonde["feed"].push(entry)
        return util.saveFile(settings, rotonde, "the entry was published " + text)
    })
}

function follow(portal) {
    return util.data().then((rotondeItems) => {
        var [rotonde, settings] = rotondeItems
        if (rotonde["portal"].indexOf(portal) >= 0) {
            console.log("already following", portal)
            return
        }
        rotonde["portal"].push(portal) 
        // save the portal we want to follow
        return util.saveFile(settings, rotonde, "now following " + portal)
    })
}

function unfollow(portal) {
    return util.data().then((rotondeItems) => {
        var [rotonde, settings] = rotondeItems
        var index = rotonde["portal"].indexOf(portal)
        if (index < 0) {
            console.log("err: you aren't following", portal)
            return
        }
        
        // remove portal we want to unfollow
        rotonde["portal"].splice(rotonde["portal"].indexOf(portal), 1) 
        return util.saveFile(settings, rotonde, "no longer following " + portal)
    })
}

// change an attribute of your rotonde portal
// e.g. color, name, or location
function attribute(attr, value) {
    return util.data().then((rotondeItems) => {
        var [rotonde, settings] = rotondeItems
        rotonde["profile"][attr] = value
        return util.saveFile(settings, rotonde, "your " + attr + " was changed to " + value)
    })
}
