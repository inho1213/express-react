import mysql from 'mysql';

const env = require(`../../../env/${process.env.NODE_ENV || 'development'}.json`);
const pool = mysql.createPool(env.datasource);

function getQuery(connection) {
    return function(sql, params) {
        return new Promise((resolve, reject) => {
            if (typeof sql === 'object') {
                params = sql.params;
                sql = sql.sql;
            }

            connection.query(sql, params || [], (error, results, fields) => {
                if (error) {
                    reject(error, connection);
                } else {
                    resolve(results, fields);
                }
            })
        });
    }
}

export default {
    query(sql, params) {
        return getQuery(pool)(sql, params);
    },

    transactional(queries) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject(error);
                }

                connection.beginTransaction((error) => {
                    if (error) {
                        connection.release();
                        reject(error);
                    }

                    resolve(connection);
                });
            });
        }).then(connection => {
            const transaction = getQuery(connection);
            
            if (Array.isArray(queries)) {
                return Promise.all(queries.map(query => transaction(query)))
                    .then(values => {
                        return {
                            error: null,
                            result: values,
                            connection
                        };
                    })
                    .catch(error => {
                        return {
                            error,
                            result: null,
                            connection
                        };
                    });
            }

            return queries(transaction)
                .then(result => {
                    return {
                        error: null,
                        result,
                        connection
                    }
                })
                .catch(error => {
                    return {
                        error,
                        result: null,
                        connection
                    }
                });
        }).then((result) => {
            const { error, connection } = result;

            if (error) {
                connection.rollback(() => {
                    connection.release();
                });
            } else {
                connection.commit((error) => {
                    if (error) {
                        connection.rollback(() => {
                            connection.release();
                        });
                    } else {
                        connection.release();
                    }
                });
            }

            return result;
        });
    },
    
    close() {
        pool.end(error => console.log(error));
    }
};