# PlayCanvas CLI

このリポジトリは PlayCanvas エディターを使用した際に使えるツールのリポジトリになります。

```bash
playcanvas-tools コマンド名 引数
```

コマンド種類

- init
- download
- upload
- sw

引数

- -t token
- -p projectId
- -s scenes
- -b branchId
- -n projectName
- -r remotePath

## Installation

`yarn global add playcanvas-tools`

## PlayCanvas Editor製のプロジェクトをPlayCanvas CLIを使用して PWA 化する。

### 1. *init*コマンドを使用して playcanvas.json を作成

コンフィグファイル(`playcanvas.json`)を作成する

```bash
playcanvas-cli init
```

### 2. *download*コマンド playcanvas.json を元にプロジェクトをダウンロード

```
cd プロジェクト名
playcanvas-cli download
```

### 3. *sw*コマンド オフラインキャッシュをする為の serviceWorker.js

```
playcanvas-cli sw --name キャッシュ名
```

### 4. index.html から serviveWorker を読み込む

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

### 5. manifest.jsonの値を変更する

https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/manifest.json

```manifest.json
{
    "name": "**プロジェクト名**",
    "short_name": "**プロジェクト名**",
    "icons": [
      {
        "src": "**ロゴ**",
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


## CIから`playcanvas.json`を作成する

`playcanvas-cli init`コマンドではインタラクティブに作成をするが、CI などでは１行のコマンドとして入力することで`playcanvas.json`を作成することができる。

```
$ playcanvas-cli <input>
Options(required)
--accessToken -t
--projectId -p
--scenes -s
--branchId -b
--projectName -n
--remotePath -r
Examples
CircleCI
--------
$ playcanvas-cli --accessToken "$PLAYCANVAS_ACCESS_TOKEN" --projectId "$PLAYCANVAS_PROJECT_ID" --scenes "$PLAYCANVAS_SCENES" --branchId "PLAYCANVAS_BRANCH_ID" --projectId "$PLAYCANVAS_PROJECT_ID" --remotePath "$PLAYCANVAS_REMOTE_PATH"
$ playcanvas-cli -t "$PLAYCANVAS_ACCESS_TOKEN" -p "$PLAYCANVAS_PROJECT_ID" -s "$PLAYCANVAS_SCENES" -b "PLAYCANVAS_BRANCH_ID" -n "$PLAYCANVAS_PROJECT_NAME" --r "$PLAYCANVAS_REMOTE_PATH"
--------
$ playcanvas-cli -t token -p projectId -s scenes -b branchId -n projectName -r remotePath
```

<img src="https://user-images.githubusercontent.com/39250588/73151323-a2f4b280-40c2-11ea-8999-70fd0c3b1021.gif" width="340px" height="340px" />
