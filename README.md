# PlayCanvas CLI

This is a repository of tools that can be used when using the PlayCanvas editor.  

## Install from npm package

```bash
yarn global add playcanvas-tools
```

## Command List

- `init`: This command is used to perform initial setup of a project or application. It creates a configuration file interactively. PlayCanvas [API key](https://playcanvas.com/account) is required. This command needs to be executed before using the `download` | `upload` | `archive` commands.

The generated `playcanvas.json` looks like this:

```playcanvas.json
{
	"accessToken":"xxxxxxxxxxxx",
	"scenes":[xxxxx],
	"projectId":xxxxx,
	"branchId":"xxxxxx-xxxxx-xxxxx-xxxxx",
	"projectName":"xxxxx",
	"remotePath":"xxxxx"
}                                              
```
However, it is also possible to generate this file without running this command.

-  `download`: This command places the PlayCanvas project in the current directory. It downloads a file with the same content as PlayCanvas Editor's `DOWNLOAD.ZIP`. It is downloaded under the folder name specified by `playcanvas.json`'s `projectName`.
- `upload`: This command takes a URL as an argument and uploads it to PlayCanvas (created mainly for the purpose of uploading files from Gist). It is uploaded to the PlayCanvas folder specified by `playcanvas.json`'s `remotePath`.
- `archive`: This command exports the PlayCanvas project. It is downloaded under the folder name specified by `playcanvas.json`'s `projectName`.
- `sw`: This command creates a `ServiceWorker.js` file containing a list of files to cache offline in a PWA. This command must be executed within the PlayCanvas files after downloading.
-  `webp`: This command converts images (`png`, `jpg`, `gif`) in the PlayCanvas project to the `webp` format. Compressed textures such as basis are skipped. This command must be executed within the PlayCanvas files after downloading.


## `playcanvas-cli init` 
Create a config file (`playcanvas.json`)

```bash
playcanvas-cli init
```
#### Arguments (optional)
- -t token
- -p projectId
- -s scenes
- -b branchId
- -n projectName
- -r remotePath


## `playcanvas-cli download` 

Download project based on *download* command playcanvas.json

```bash
cd projectname
playcanvas-cli download
```

## `playcanvas-cli upload` 

Upload asset from URL

```bash
playcanvas-cli upload -u https://gist.github.com/yushimatenjin/7276ad9f21492197f8ab5dbfbe092d36#file-translate-ja-js
```

## `playcanvas-cli archive` 

```bash
playcanvas-cli archive
```


## `playcanvas-cli sw` 

PlayCanvas Editor project to PWA.
*sw* command serviceWorker.js for offline caching

### 1. `playcanvas-cli sw`
```bash
playcanvas-cli sw --name cachename
```

or 

```bash
npx playcanvas-tools sw --name cachename
```

### 2. Load serviveWorker from index.html

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

### 3. Change the value of manifest.json
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

## `playcanvas-cli webp` 
 
 Convert to WebP

```bash
playcanvas-cli webp -q 80 --alphaQuality 100 --lossless false --nearLossless 100 --smartSubsample false --font true --texture true --textureatlas true --removeSource false --configFilePath ./config.json --outputConfigFilePath ./config_webp.json
```

or

```bash
npx playcanvas-tools  webp -q 80 --alphaQuality 100 --lossless false --nearLossless 100 --smartSubsample false --font true --texture true --textureatlas true --removeSource false --configFilePath ./config.json --outputConfigFilePath ./config_webp.json
```

#### WebP Config 
-  --quality -q # default 80
-  --alphaQuality # Quality of alpha layer, number from 0-100 (optional, default 100)
-  --lossless -l #  Use near_lossless compression mode (optional, default false)
-  --nearLossless # Near lossless encoding, number from 0-100 (optional, default 100)
-  --smartSubsample # Use smart subsampling (optional, default false)

[full document](https://sharp.pixelplumbing.com/api-output#webp)

#### Convert Options

- --font # font assets for conversion.  ( default true  ) ※ Please set it to false when using large Japanese.
- --texture # texture assets for conversion ( default true  )
- --textureatlas # textureatlas assets for conversion ( default true  )
- --removeSource # remove source file after conversion ( default false  )
- --configFilePath # config file path default ./config.json
- --outputConfigFilePath # output config file path default ./config_webp.json

## Create `playcanvas.json` from CI

You can create it interactively with the `playcanvas-cli init` command, but you can create `playcanvas.json` by entering it as a one-line command in CI etc.

Examples - CircleCI
```bash
 --------
 $ playcanvas-cli --accessToken "$PLAYCANVAS_ACCESS_TOKEN" --projectId "$PLAYCANVAS_PROJECT_ID" --scenes "$PLAYCANVAS_SCENES" --branchId "PLAYCANVAS_BRANCH_ID" --projectId "$PLAYCANVAS_PROJECT_ID" --remotePath "$PLAYCANVAS_REMOTE_PATH"

```

