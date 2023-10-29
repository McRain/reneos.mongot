import { MongoClient } from "mongodb"

let _db

let _conn 

let _options = {
	socketTimeoutMS: 90000,
	keepAlive: false,
	minPoolSize: 1,
	maxPoolSize: 10

}

/**
 * The controller that implements the connection to the database
 */
 class Database {
	static get Mongo() {
		return Mongo
	}

	static get Client() {
		return Mongo.MongoClient
	}

	static get Connection() {
		return _conn
	}

	static get Db() {
		return _db
	}

	static get ID() {
		return Mongo.ObjectID()
	}

	static GenerateID() {
		return Mongo.ObjectID()
	}

	static async Init(config) {
		_conn = new MongoClient(config.url,{..._options, ...config.options})
		try {
			await _conn.connect()
		} catch (error) {
			console.warn(error)
		}
		_db = _conn.db(config.database)
	}
}

export default Database