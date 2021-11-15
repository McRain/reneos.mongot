# reneos.mongot

A module to simplify working with database connections and MongoDB collections

install 

npm install @reneos.mongot --save

https://www.npmjs.com/package/@reneos/mongot

## How to use

```js
import {DataManager,Database,DataConnection} from "@reneos/mongot"
```

# Connect

1. You can create one global database connection

```js
	await DataManager.Init({
	"url": "mongodb://127.0.0.1:27017/",
	"database": "yourdatabase",
	"options": {	}
})
```
Load documents from Config collection
```js

const configs = await DataManager.Configs.find().toArray()

```
2. You can use multiple connections to different databases

```js
	const _db = new DataConnection("anydbkey")

	await _db.open({
	"url": "mongodb://127.0.0.1:27017/",
	"database": "yourdatabase",
	"options": {	}
})

```
Load documents from Config collection
```js

const configs = await _db.Configs.find().toArray()
OR
const configs = DataConnection.GetConnection('anydbkey').Configs.find().toArray()

```