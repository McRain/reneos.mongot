const Mongo  = require("mongodb")

const _conns = {}

/**
 * 
 */
class DataConnection {
	static GetConnection(key) {
		return _conns[key]
	}

	/**
	 * 
	 * 
	 */
	constructor() {		
		this._conn = null
		this._db = null
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
			url:"mongodb://localhost:27017",
			database:"",
			options: {
				socketTimeoutMS: 90000,
				keepAlive: true,
				poolSize: 10,
				useUnifiedTopology: true
			}
		}, options || {})
		_conns[`${this._config.url}${this._config.database}`] = this
		this._conn = await Mongo.MongoClient.connect(this._config.url, this._config.options)
		this._db = this._conn.db(this._config.database)
		return this
	}

	/**
	 * 
	 */
	async close(){
		if(!this._conn)
			return
		try {
			this._conn.close()
		} catch (error) {
			console.warn(error.message)
		}
	}
}

module.exports =  DataConnection