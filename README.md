# PlayCanvas CLI

This is a repository of tools that can be used when using the PlayCanvas editor.  

```bash
playcanvas-tools command
```

Command list

- init
- download
- upload
- archive
- sw
- webp

Arguments (optional)
- -t token
- -p projectId
- -s scenes
- -b branchId
- -n projectName
- -r remotePath

webp options (optional) 

```bash
playcanvas-cli webp -q 80 --alphaQuality 100 --lossless false --nearLossless 100 --smartSubsample false --font true --texture true --textureatlas true --removeSource false --configFilePath ./config.json --outputConfigFilePath ./config_webp.json
```
-  --quality -q # default 80
-  --alphaQuality # Quality of alpha layer, number from 0-100 (optional, default 100)
-  --lossless -l #  Use near_lossless compression mode (optional, default false)
-  --nearLossless # Near lossless encoding, number from 0-100 (optional, default 100)
-  --smartSubsample # Use smart subsampling (optional, default false)

[full document](https://sharp.pixelplumbing.com/api-output#webp)

convert options
- --font # font assets for conversion.  ( default true  ) ※ Please set it to false when using large Japanese.
- --texture # texture assets for conversion ( default true  )
- --textureatlas # textureatlas assets for conversion ( default true  )
- --removeSource # remove source file after conversion ( default false  )
- --configFilePath # config file path default ./config.json
- --outputConfigFilePath # output config file path default ./config_webp.json

## Installation

`yarn global add playcanvas-tools`

## Convert the PlayCanvas Editor project to PWA using PlayCanvas CLI.

### 1. Create playcanvas.json using *init* command

Create a config file (`playcanvas.json`)

```bash
playcanvas-cli init
```

### 2. Download project based on *download* command playcanvas.json

```
cd projectname
playcanvas-cli download
```

### 3. *sw* command serviceWorker.js for offline caching

```
playcanvas-cli sw --name cachename
```

### 4. Load serviveWorker from index.html

```index.html
<!-- index.html -->
...
<script>
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./serviceWorker.js").then(function (registration) {
            if (typeof registration.update == "function") {
                registration.update();
            }
        })
        .catch(function (error) {
            console.log("Error Log: " + error);
        });
}
</script>
...
```

### 5. Change the value of manifest.json
https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/manifest.json

```manifest.json
{
    "name": "**projectname**",
    "short_name": "**projectname**",
    "icons": [
      {
        "src": "**logo**",
        "sizes": "192x192",
        "type": "image/png"
      }
    ],
    "start_url": "./index.html",
    "display": "standalone",
    "background_color": "#f16625",
    "theme_color": "#f16625"
  }
```


## Create `playcanvas.json` from CI

You can create it interactively with the `playcanvas-cli init` command, but you can create `playcanvas.json` by entering it as a one-line command in CI etc.

```
Usage
  $ playcanvas-cli <input> # init download upload archive sw webp

Argments(optional)
  --accessToken -t
  --projectId -p
  --scenes -s
  --branchId -b
  --projectName -n 
  --remotePath -r

WebP options
# webp options
  --quality -q # default 80
  --alphaQuality # Quality of alpha layer, number from 0-100 (optional, default 100)
  --lossless -l #  Use near_lossless compression mode (optional, default false)
  --nearLossless # Near lossless encoding, number from 0-100 (optional, default 100)
  --smartSubsample # Use smart subsampling (optional, default false)

# convert options
  --font # default true
  --texture # default true
  --textureatlas # default true
  --removeSource # remove source file after conversion default false
  --configFilePath # config file path default ./config.json
  --outputConfigFilePath # output config file path default ./config_webp.json

Examples
  CircleCI
  --------
  $ playcanvas-cli --accessToken "$PLAYCANVAS_ACCESS_TOKEN" --projectId "$PLAYCANVAS_PROJECT_ID" --scenes "$PLAYCANVAS_SCENES" --branchId "PLAYCANVAS_BRANCH_ID" --projectId "$PLAYCANVAS_PROJECT_ID" --remotePath "$PLAYCANVAS_REMOTE_PATH"
  $ playcanvas-cli -t "$PLAYCANVAS_ACCESS_TOKEN" -p "$PLAYCANVAS_PROJECT_ID" -s "$PLAYCANVAS_SCENES" -b "PLAYCANVAS_BRANCH_ID" -n "$PLAYCANVAS_PROJECT_NAME" --r "$PLAYCANVAS_REMOTE_PATH"
  --------
  $ playcanvas-cli -t token -p projectId -s scenes -b branchId -n projectName -r remotePath 

  WebP
  $ playcanvas-cli webp -q 80 --lossless
```

