import { Injectable, forwardRef, Inject } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
declare var window: any;
const SQL_DB_NAME = 'liquor.db';

@Injectable()
export class DatabaseService {
  databaseObj: SQLiteObject;

  readonly database_name: string = "liquor.db";
  database = null;
  tables_data: string[];
  userInfo
  dbInstance: any;
  public database_instance: any;
  branchCode: string
  //@Inject(forwardRef(() => MasterDataService)) private masterData: MasterDataService
  constructor(private sqlite: SQLite, private platform: Platform, private sqlitePorter: SQLitePorter, private http: HttpClient) {
    //this.database = window.openDatabase(this.database_name, '1.0', 'database', 5 * 1024 * 1024);
    // this.init()

  }

  async createDB(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: SQL_DB_NAME,
        location: 'default'
      })
        .then(async (db: SQLiteObject) => {
          this.databaseObj = db;
          await this.createTableWithSql();
          await this.createTable();

        })
        .catch(e => {
          console.log("error " + JSON.stringify(e))
        });
    });

  }

  async getOneDataByType(value, type) {
    return await this.database_instance.executeSql(new Query("SELECT * FROM master_data WHERE code=? AND type=? ORDER BY sort_order ASC", [value, type]))
  }


  async getOneItemData() {
    return await this.database_instance.executeSql(new Query("SELECT * FROM ITEM LIMIT 1"))
  }

  async createTable(): Promise<any> {
    for (var i = 0; i < this.tables_data.length; i++) {
      try {
        let dbtable = await this.database_instance.executeSql(new Query(this.tables_data[i]))

      } catch (error) {
        console.log("error " + JSON.stringify(error))
      }

    }
  }

  getRows(getRowsSql: any): Promise<any> {
    let returnData: any;
    let thisObj = this
    return new Promise(async (resolve, reject) => {
      await this.database_instance.executeSql(getRowsSql, [])
        .then((res) => {
          if (res.rows.length > 0) {
            returnData = res.rows;
          } else {
            returnData = 0;
          }
          resolve(returnData);
        })
        .catch(e => {
          console.log("error ", JSON.stringify(e))
        });
    });
  }

  async init() {
    let db: any;
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.database = await this.sqlite.create({ name: SQL_DB_NAME, location: 'default' })
    } else {
      this.database = window.openDatabase(SQL_DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
    }
    console.log('enter init')
    this.createTableWithSql();
    this.database_instance = await browserDBInstance(this.database);
    await this.createTable();
  }

  async createTables() {
    for (var i = 0; i < this.tables_data.length; i++) {
      let query = new Query(this.tables_data[i], []);
      await this.database_instance.executeSql(query);
    }
  }

  async refreshDatabase() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.database = await this.sqlite.create({ name: SQL_DB_NAME, location: 'default' })
    } else {
      this.database = window.openDatabase(SQL_DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
    }
    this.database_instance = await browserDBInstance(this.database);
    return true
  }

  public createTableWithSql() {

    this.tables_data = [
      // 'DROP TABLE UPLOAD_DATA',
      'CREATE TABLE IF NOT EXISTS CATEGORY_DATA(code VARCHAR(10),name VARCHAR(20),brand VARCHAR(25),size VARCHAR(20),stock VARCHAR(20))',
      'CREATE TABLE IF NOT EXISTS ITEM_DATA(code VARCHAR(10),name VARCHAR(20),brand VARCHAR(25),title VARCHAR(25),size VARCHAR(20),price VARCHAR(20),stock VARCHAR(20))',
      'CREATE TABLE IF NOT EXISTS SALE_DATA(code VARCHAR(10),name VARCHAR(20),brand VARCHAR(25),title VARCHAR(25),size VARCHAR(20),price VARCHAR(20),stock VARCHAR(20))',
    ];
  }

  async getCategoryTable() {
    return await this.database_instance.executeSql(new Query("SELECT * FROM CATEGORY_DATA"))
  }

  async InsertCategoryTable(data) {
    try {
      let sql = ""
      sql = "INSERT INTO CATEGORY_DATA (code,name,brand,size,stock) VALUES (?,?,?,?,?)";
      let query = new Query(sql, [data.code, data.name, data.brand, data.size, data.stock]);
      return this.database_instance.executeSql(query)
    } catch (error) {
      console.log(error);
    }
  }
 
  async checkCategory(data) {
    return this.database_instance.executeSql(new Query("SELECT CATEGORY_DATA WHERE code=?", [data.code]))
  }

}






export class Query {
  private _queryString: string;
  private _parameter: (string | number)[];
  constructor(queryString: string, parameter?: (string | number)[]) {
    this._queryString = queryString;
    if (parameter instanceof Array) {
      this._parameter = parameter;
    } else if (parameter === undefined) {
      this._parameter = [];
    } else {
      this._parameter = [parameter]
    }
  }

  get queryString() {
    return this._queryString;
  }

  get parameter() {
    return this._parameter;
  }

  getStatement(): any {
    if (this._parameter !== null) {
      return [this._queryString, this._parameter]
    } else {
      return this._queryString;
    }
  }
}


export const browserDBInstance = (db) => {
  return {
    executeSql: (query: Query) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(query.queryString, query.parameter, (tx, rs) => {
            let resultSet = [];
            for (let i = 0; i < rs.rows.length; i++) {
              resultSet.push(rs.rows.item(i));
            }
            resolve(resultSet)
            //resolve(rs)
          });
        });
      })
    },
    sqlBatch: (arr) => {
      return new Promise((r, rr) => {
        let batch = [];
        db.transaction((tx) => {
          for (let i = 0; i < arr.length; i++) {
            batch.push(new Promise((resolve, reject) => {
              tx.executeSql(arr[i], [], () => { resolve(true) })
            }))
            Promise.all(batch).then(() => r(true));
          }
        });
      })
    }
  }

}

export class DatabaseError implements Error {
  public name = 'DatabaseError';
  constructor(public message: string, public error: any) { }
  toString() {
    return this.name + ': ' + this.message + '\n' + this.error;
  }


}





