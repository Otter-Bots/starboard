import { container } from '@sapphire/framework';
import { MySQLDriver, QuickDB } from 'quick.db';
/* const db = new QuickDB();
container.db = db;
declare module '@sapphire/pieces' {
	interface Container {
		db: any;
	}
} */
if (process.env.NODE_ENV == 'dev') {
	const db = new QuickDB();
	container.db = db;
} else {
	const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

	const mysql = new MySQLDriver({
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASS,
		database: DB_NAME
	});
	(async () => {
		await mysql.connect();
		const db = new QuickDB({ driver: mysql });
		container.db = db;
	})();
}
declare module '@sapphire/pieces' {
	interface Container {
		db: any;
	}
}
