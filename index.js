import Mongo from "mongodb"

import DataConnection from "./dbconn.js"

let _db
let _conn
let _options={
        socketTimeoutMS: 90000,
        keepAlive: true,
        poolSize: 20,
        useUnifiedTopology: true,
        /*useNewUrlParser: true, */
    
}
class Database {
	static get Mongo(){
		return Mongo
	}

	static get Client(){
		return Mongo.MongoClient
	}

	static get Connection(){
		return _conn
	}

	static get Database(){
		return _db
	}

	static get ID(){
		return Mongo.ObjectID()
	}

	static GenerateID(){
		return Mongo.ObjectID()
	}
	
	static async Init(config) {
			_conn = await Mongo.MongoClient.connect(config.url,_options)
			_db = _conn.db(config.database)
	}
}
const DataManager = new Proxy(Database, {
	get(target, prop) {	
		if(target[prop]===undefined)		
			target[prop] =_db.collection(prop.toLowerCase())		
		return target[prop]
	}
})

export {DataManager,Database,DataConnection}