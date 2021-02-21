import dayjs from 'dayjs';

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

const db = new DB();

/**
 * 客户端
 * 
 */
export class DBClient {
	constructor(name) {
		this.name = name;
	}
	
	async execute(sql) {
		return await db.execute(this.name, sql);
	}
	
	async query(sql) {
		return await db.query(this.name, sql);
	}
	
	async find(sql, defaultValue) {
		const rows = await this.query(sql);
		if (rows.length == 0) return defaultValue || null;
		return rows[0];
	}
}

export const myhold = new DBClient('myhold');

/**
 * 数据库构造器。
 * 
 */
export class DBBuilder {
	/**
	 * 初始化
	 * 
	 * @param {Object} name
	 */
	constructor(name) {
	    this.db = new DBClient(name);
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
	
	async applyBuildFile(entry) {
		// 获取 ID 并验证是否已经执行。
		const id = Number(entry.name.match(/^\d+/)[0]);
		const structure = await this.db.query(`
			SELECT * FROM mh_structure
			WHERE id = ${id}
		`);
		if (structure.length > 0) return true;
		
		// 未执行的执行并写入。
		const startAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
		const sql = await this.readEntrySQL(entry);
		await this.db.execute(sql);
		const endAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
		await this.db.execute(`
		INSERT INTO mh_structure
		(
			id, filename, start_at, end_at
		)
		VALUES
		(
			${id}, '${entry.name}', '${startAt}', '${endAt}'
		)
		`);
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
		await this.db.execute(structureSQL);
		const entries = await this.listBuildFile();
		for (let entry of entries) {
			await this.applyBuildFile(entry);
		}
	}
}

export default db;
