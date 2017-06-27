# rotonde-cli
_nodejs-based cli for [Rotonde](https://github.com/Rotonde)_

### Instructions
Download these files, make sure you have the latest [nodejs](https://nodejs.org/en/download/) version installed, navigate to the folder you unpacked these files and then do
1. `npm install`
2. `./rotonde save /path/to/rotonde.json`
3. `./rotonde write "started using rotonde"`
4. `./rotonde feed`

See http://rotonde.cblgh.org/crawl for Rotonde portals to follow.
```sh
Usage: rotonde [options] [command]


  Commands:

    follow|f [portal]      follow a rotonde domain
    unfollow|u [portal]    unfollow a rotonde domain
    name|n [name]          set your profile name
    location|l [location]  set your profile location
    color|c [color]        set your profile color
    write|w [entry]        write an entry
      flags
      --url|-u         add an url associated with your post
      --media|-m       add media associated with your post
    erase|d [index]        remove an entry
    feed|f [number]        view your feed
    save|p                 save the location of your rotonde.json file
    help [cmd]             display help for [cmd]
```

#### More usage examples
```
rotonde save /srv/http/rotonde/public/rotonde.json
rotonde name "cblgh"
rotonde location "the internet"
rotonde color #865FC5
rotonde follow rotonde.cblgh.org
rotonde write "just updated my tracker" --url https://github.com/cblgh --media https://www.youtube.com/watch\?v=Aj1U974JiIQ
```
