/**
 * 数据库管理类
 * 
 */
class DB {
	/**
	 * 构造数据库表
	 * 
	 */
	constructor() {
		this.map = {};
	}
	
	/**
	 * @param {Object} name 数据库名
	 * 
	 * 判断数据库是否打开。
	 */
	isOpen(name) {
		return plus.sqlite.isOpenDatabase({
			name: name,
			path: `_doc/${name}.db`,
		});
	}
	
	/**
	 * @param {Object} name 数据库名
	 * 
	 * 打开数据库。
	 */
	async open(name) {
		if (this.isOpen(name)) {
			return this.map[name];
		}
		return new Promise((reslove, reject) => {
			plus.sqlite.openDatabase({
				name: name,
				path: `_doc/${name}.db`,
				success: (e) => {
					reslove(e);
				},
				fail: (e) => {
					reject(e);
				}
			});
		});
	}
	
	/**
	 * @param {Object} name 数据库名
	 * @param {Object} sql 语句
	 * 
	 * 执行 SQL 语句。
	 */
	async execute(name, sql) {
		await this.open(name);
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: name,
				sql: sql,
				success: (e) => {
					resolve(e);
				},
				fail: (e) => {
					reject(e);
				}
			});
		});
	}
	
	/**
	 * @param {Object} name 数据库名
	 * @param {Object} sql 语句
	 * 
	 * 查询语句。
	 */
	async query(name, sql) {
		await this.open(name);
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: name,
				sql: sql,
				success: (e) => {
					resolve(e);
				},
				fail: (e) => {
					reject(e);
				}
			});
		});
	}
	
	/**
	 * @param string name 数据库名
	 * @param string table 表名
	 * 
	 * 查询数据库表是否存在。
	 */
	async existsTable(name, table) {
		let count = await this.query(name,
			`SELECT COUNT(*) AS c
			FROM sqlite_master
			WHERE type='table' AND name='${table}'`
		)
		return count[0].c > 0
	}
}

/**
 * 数据库构造器。
 * 
 */
export class DBBuilder {
	constructor() {
	    this.db = new DB();
	}
	
	/**
	 * 列举构造文件。
	 * 
	 */
	async listBuildFile() {
		return new Promise((resolve, reject) => {
			plus.io.resolveLocalFileSystemURL('_www/static/database/build', entry => {
				const directoryReader = entry.createReader();
				directoryReader.readEntries((entries) => {
					resolve(entries);
				});
			}, error => reject(error));
		});
	}
	
	/**
	 * 读取 SQL
	 * @param {Object} entry
	 */
	async readEntrySQL(entry) {
		return new Promise((resolve, reject) => {
			entry.file(f => {
				const reader = new plus.io.FileReader();
				reader.onloadend = (event) => {
					resolve(event.target.result);
				};
				reader.readAsText(f, 'utf-8');
			}, error => reject(error));
		});
	}
	
	/**
	 * 读取结构表的 DDL SQL
	 * 
	 */
	async readStructureSQL() {
		return new Promise((resolve, reject) => {
			plus.io.resolveLocalFileSystemURL('_www/static/database/structure.sql', entry => {
				this.readEntrySQL(entry)
					.then(t => resolve(t))
					.catch(e => reject(e));
			}, error => reject(error));
		});
	}
	
	/**
	 * 构建
	 * 
	 */
	async build() {
		const structureSQL = await this.readStructureSQL();
		await this.db.execute('myhold', structureSQL);
	}
}

export default new DB();
