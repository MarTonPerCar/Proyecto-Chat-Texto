import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initDB(): Promise<void> {
    if (this.db) return;

    this.db = await this.sqlite.createConnection('favoritos', false, 'no-encryption', 1, false);
    await this.db.open();

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS favoritos (
        uid TEXT PRIMARY KEY
      );
    `);
  }

  async esFavorito(uid: string): Promise<boolean> {
    await this.initDB();
    if (!this.db) return false;

    const res = await this.db.query('SELECT uid FROM favoritos WHERE uid = ?', [uid]);
    return res.values !== undefined && res.values.length > 0;
  }

  async agregar(uid: string): Promise<void> {
    await this.initDB();
    if (!this.db) return;

    await this.db.run('INSERT OR IGNORE INTO favoritos(uid) VALUES(?)', [uid]);
  }

  async eliminar(uid: string): Promise<void> {
    await this.initDB();
    if (!this.db) return;

    await this.db.run('DELETE FROM favoritos WHERE uid = ?', [uid]);
  }

  async getTodosFavoritos(): Promise<string[]> {
    await this.initDB();
    if (!this.db) return [];

    const res = await this.db.query('SELECT uid FROM favoritos');
    return res.values?.map(row => row.uid) || [];
  }
}
