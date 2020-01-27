![out](https://user-images.githubusercontent.com/39250588/73151323-a2f4b280-40c2-11ea-8999-70fd0c3b1021.gif)

# PlayCanvas CLI
このリポジトリはPlayCanvasエディターを使用した際に使えるツールのリポジトリになります。

```bash
playcanvas-tools コマンド名 引数
```

コマンド種類
- init
- download
- upload
- copy
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


### 1. *init*コマンドを使用してplaycanvas.jsonを作成

コンフィグファイル(`playcanvas.json`)を作成する
```bash
playcanvas-cli init
```


### 2. *download*コマンド playcanvas.jsonを元にプロジェクトをダウンロード

```
playcanvas-cli download
```

### 3. *sw*コマンド オフラインキャッシュをする為のserviceWorker.js
```
playcanvas-cli sw --name キャッシュ名
```

#### CI等から`playcanvas.json`を作成する

`playcanvas-cli init`コマンドではインタラクティブに作成をするが、CIなどでは１行のコマンドとして入力することで`playcanvas.json`を作成することができる。

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
