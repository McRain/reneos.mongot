import { MongoClient } from "mongodb"

const _conns = {}

/**
 * 
 */
class DataConnection {
	static GetConnection(key) {
		return _conns[key]
	}

	/**
	 * Any string ID for get this connection
	 * 
	 */
	constructor(key) {
		this._conn = null
		this._db = null
		this._key = key || null
		return new Proxy(this, {
			get(target, prop) {
				if (target[prop] === undefined)
					target[prop] = target._db.collection(prop.toLowerCase())
				return target[prop]
			}
		})
	}

	/**
	 * 
	 * @param {Object} options : {url:"",database:"",options:{}}
	 */
	async open(options) {
		this._config = Object.assign({
			url: "mongodb://127.0.0.1:27017",
			database: "test",
			options: {
				socketTimeoutMS: 90000,
				keepAlive: false,
				useUnifiedTopology: true
			}
		}, options || {})
		if (!this._key) {
			this._key = `${this._config.url}${this._config.database}`
		}
		if (!_conns[this._key]) {
			this._conn = new MongoClient(this._config.url, this._config.options)
			await this._conn.connect()
			this._db = this._conn.db(this._config.database)
			_conns[this._key] = this
		} else {
			this._conn = _conns[this._key]._conn
			this._db = _conns[this._key]._db
		}
		return this
	}

	/**
	 * 
	 */
	async close() {
		if (!this._conn)
			return
		try {
			this._conn.close()
		} catch (error) {
			console.warn(error.message)
		}
	}
}

export default DataConnection