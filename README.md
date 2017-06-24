# rotonde-cli
nodejs-based cli for Rotonde

### Instructions
Download these files, make sure you have the latest [nodejs](https://nodejs.org/en/download/) version installed, navigate to the folder you unpacked these files and then do
1. `npm install`
2. `./rotonde save <path to rotonde.json>`
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
    erase|d [index]        remove an entry
    feed|f [numbe]         view your feed
    save|p                 save the location of your rotonde.json file
    help [cmd]             display help for [cmd]
    ```
