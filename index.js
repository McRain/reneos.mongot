import DataConnection from "./dbconn.js"
import Database from "./database.js"


/**
 * A wrapper around the Database class returning a collection for any request for a nonexistent property
 */
const DataManager = new Proxy(Database, {
	get(target, prop) {
		if (target[prop] === undefined)
			target[prop] = _db.collection(prop.toLowerCase())
		return target[prop]
	}
})

export { DataManager, Database, DataConnection }