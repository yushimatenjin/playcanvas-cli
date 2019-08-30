## Installation
`yarn global add playcanvas-tools`

### Usage
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
