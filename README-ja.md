# PlayCanvas CLI

これは、PlayCanvasエディタを使用する際に使用できるツールのリポジトリです。

## npmパッケージからインストール

```bash
yarn global add playcanvas-tools
```

## コマンドリスト

-   `init`: プロジェクトやアプリケーションの初期設定を行うために使用されるコマンドです。対話的に設定ファイルを作成します。PlayCanvas [API key](https://playcanvas.com/account) が必要です。このコマンドは、`download` | `upload` | `archive` コマンドを使用する前に実行する必要があります。

生成される `playcanvas.json` は以下のようになります：

```playcanvas.json
{
  "accessToken": "xxxxxxxxxxxx",
  "scenes": [0000],
  "projectId": 00000,
  "branchId": "xxxxxx-xxxxx-xxxxx-xxxxx",
  "projectName": "xxxxx",
  "remotePath": "xxxxx"
}
```

ただし、このコマンドを実行せずにこのファイルを生成することもできます。

-   `download`: このコマンドで、PlayCanvasプロジェクトを現在のディレクトリに配置します。PlayCanvasエディタの `DOWNLOAD.ZIP` と同じ内容のファイルをダウンロードします。`playcanvas.json` の `projectName` で指定されたフォルダ名の下にダウンロードされます。
-   `upload`: このコマンドはURLを引数として取り、それをPlayCanvasにアップロードします（Gistからのファイルアップロードを主な目的として作成されました）。`playcanvas.json` の `remotePath` で指定されたPlayCanvasフォルダにアップロードされます。
-   `archive`: このコマンドで、PlayCanvasプロジェクトをエクスポートします。`playcanvas.json` の `projectName` で指定されたフォルダ名の下にダウンロードされます。
-   `sw`: このコマンドは、PWAでオフラインキャッシュするファイルのリストを含む `ServiceWorker.js` ファイルを作成します。このコマンドは、ダウンロード後にPlayCanvasファイル内で実行する必要があります。
-   `webp`: このコマンドは、PlayCanvasプロジェクト内の画像（`png`、`jpg`、`gif`）を `webp` 形式に変換します。圧縮テクスチャ（basisなど）はスキップされます。このコマンドは、ダウンロード後にPlayCanvasファイル内で実行する必要があります。

## `playcanvas-cli init`

設定ファイル（`playcanvas.json`）を作成する

```bash
playcanvas-cli init
```

#### 引数（オプション）
- -t token
- -p projectId
- -s scenes
- -b branchId
- -n projectName
- -r remotePath


## `playcanvas-cli download` 

プロジェクトをダウンロードします。

```bash
cd projectname
playcanvas-cli download
```

## `playcanvas-cli upload`

URLからアセットをアップロードします。

```bash
`playcanvas-cli upload -u https://gist.github.com/yushimatenjin/7276ad9f21492197f8ab5dbfbe092d36#file-translate-ja-js`
```


## `playcanvas-cli archive`

```bash
playcanvas-cli archive
```


## `playcanvas-cli sw`

PlayCanvasエディタプロジェクトをPWAにします。 _sw_コマンドでオフラインキャッシュ用のserviceWorker.jsを作成します。


### 1. `playcanvas-cli sw`

```bash
playcanvas-cli sw --name cachename
```


または
```
npx playcanvas-tools sw --name cachename
```


### 2. index.htmlからserviveWorkerをロードする

```html
`<!-- index.html --> ... 
<script> 
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./serviceWorker.js")
    .then(function (registration) {
      if (typeof registration.update == "function") {
        registration.update();
      }
    })
    .catch(function (error) {
      console.log("Error Log: " + error);
    });
}
</script> ...`
```


### 3. manifest.jsonの値を変更する

[https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/manifest.json](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

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

WebPに変換する

```bash
playcanvas-cli webp -q 80 --alphaQuality 100 --lossless false --nearLossless 100 --smartSubsample false --font true --texture true --textureatlas true --removeSource false --configFilePath ./config.json --outputConfigFilePath ./config_webp.json
```

または

```bash
npx playcanvas-tools  webp -q 80 --alphaQuality 100 --lossless false --nearLossless 100 --smartSubsample false --font true --texture true --textureatlas true --removeSource false --configFilePath ./config.json --outputConfigFilePath ./config_webp.json
```

#### WebP設定

-   --quality -q # デフォルト80
-   --alphaQuality # アルファレイヤーの品質、0-100の数値（オプション、デフォルト100）
-   --lossless -l # 近似ロスレス圧縮モードを使用する（オプション、デフォルルトはfalse）
- --nearLossless # 近似ロスレスエンコーディング、0-100の数値（オプション、デフォルト100）
- --smartSubsample # スマートサブサンプリングを使用する（オプション、デフォルトはfalse）
[詳細なドキュメント](https://sharp.pixelplumbing.com/api-output#webp)

変換オプション
- --font # フォントアセット。 (デフォルトは true) ※ 大規模な日本語を使用する場合は、falseに設定してください。
- --texture # テクスチャアセット（デフォルトは true）
- --textureatlas # テクスチャアトラスアセット（デフォルトは true）
- --removeSource # 変換後にソースファイルを削除する（デフォルトは false）
- --configFilePath # 設定ファイルのパス（デフォルトは ./config.json）
- --outputConfigFilePath # 出力設定ファイルのパス（デフォルトは ./config_webp.json）

## CIから `playcanvas.json` を作成する

`playcanvas-cli init` コマンドで対話的に作成することができますが、CIなどで1行のコマンドを入力して `playcanvas.json` を作成することもできます。

例 - CircleCI
```bash
$ playcanvas-cli --accessToken "$PLAYCANVAS_ACCESS_TOKEN" --projectId "$PLAYCANVAS_PROJECT_ID" --scenes "$PLAYCANVAS_SCENES" --branchId "PLAYCANVAS_BRANCH_ID" --projectId "$PLAYCANVAS_PROJECT_ID" --remotePath "$PLAYCANVAS_REMOTE_PATH"
```
