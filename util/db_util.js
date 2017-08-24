'use strict';
const mysql = require('mysql');
const defaultDbConf = require('../config').DB_CONFIG;
const winston = require('winston');

class DbUtil {
  constructor(dbConf = defaultDbConf) {
    try {
      this.pool = mysql.createPool(dbConf);
      winston.info('create pool success');
    } catch (err) {
      winston.error('error in mysql constructor()', err);
    }
  }

  getConnection() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          winston.error('error in mysql getConnection()', err);
          reject(err);
          return;
        }
        connection.config.queryFormat = function(query, values) {
          if (!values) {
            return query;
          }
          return query.replace(/\:(\w+)/g, function(txt, key) {
            if (values.hasOwnProperty(key)) {
              return this.escape(values[key]);
            }
            return txt;
          }.bind(this));
        };
        resolve(connection);
      });
    });
  }

  /**
   * Escape sql parameters to prevent the sql injection
   * @param  {string} query sql to be execute
   * @param  {object} values value object
   * @return {object} result
   */
  queryEscape(query, values) {
    let sql = values ? query.replace(/\:(\w+)/g, (txt, key) => {
      if (values.hasOwnProperty(key)) {
        return this.pool.escape(values[key]);
      }
      return txt;
    }) : query;
    winston.info('queryEscape()', sql);
    return this.query(sql);
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, (err, rows, fields) => {
        if (err) {
          winston.error('error in mysql query()', err);
          reject(err);
          return;
        }
        winston.info('query()', rows);
        resolve(rows);
      });
    });
  }
};

module.exports = new DbUtil();
