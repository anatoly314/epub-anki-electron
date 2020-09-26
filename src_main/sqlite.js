import path from 'path';
import sqlite3 from 'sqlite3';

let db;

export const initSqlite = () => {
    let sqliteFile = path.resolve(__dirname, 'sqlite.db');

    db = new sqlite3.Database(sqliteFile, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.error('error', err);
        }
        console.log(`Connected to the ${sqliteFile} database.`);
    });
}
