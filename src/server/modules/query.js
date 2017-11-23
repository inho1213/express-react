function as(name, alias) {
    return (alias && name != alias) ? `\`${name}\` as \`${alias}\`` : `\`${name}\``;
}

function escape(column) {
    return column.split('.').map(value => {
        if (value == "*") {
            return value;
        }

        return `\`${value}\``;
    }).join('.');
}

function identity(value) {
    return value;
}

function whereCondition(params) {
    function column(field, transform = identity) {
        const conditions = [transform(escape(field))];

        function value(decorator = identity) {
            return function value(val) {
                if (Array.isArray(val)) {
                    conditions.push(decorator(`${val.map(v => {
                        params.push(v);
                        return '?';
                    }).join(', ')}`));
                } else {
                    params.push(val);
                    conditions.push(decorator('?'));
                }

                return conditions.join(' ');
            };
        }

        function column(decorator = identity) {
            return function column(col) {
                if (Array.isArray(col)) {
                    conditions.push(decorator(`${col.map(c => escape(c)).join(', ')}`));
                } else {
                    conditions.push(decorator(escape(col)));
                }

                return conditions.join(' ');
            }
        }

        function withDecorator(decorator = identity) {
            return {
                column(col, transform = identity) {
                    return column(decorator)(transform(col));
                },
                value(val, transform = identity) {
                    return value(decorator)(transform(val));
                },
                subquery(callback) {
                    const subquery = callback({
                        sql: null,
                        params: [],

                        from: from
                    });

                    conditions.push(`(${subquery.sql})`);
                    params.push(...subquery.params);
                }
            }
        };

        return {
            like() {
                conditions.push('LIKE');
                return withDecorator(v => `CONCAT('%', ${v}, '%')`);
            },
            
            startsWith() {
                conditions.push('LIKE');
                return withDecorator(v => `CONCAT(${v}, '%')`);
            },
            
            endsWith() {
                conditions.push('LIKE');
                return withDecorator(v => `CONCAT('%', ${v})`);
            },

            eq() {
                conditions.push('=');
                return withDecorator();
            },

            notEq() {
                conditions.push('!=');
                return withDecorator();
            },

            in() {
                conditions.push('IN');
                return withDecorator(v => `(${v})`);
            },

            notIn() {
                conditions.push('NOT IN');
                return withDecorator(v => `(${v})`);
            },

            lt() {
                conditions.push('<');
                return withDecorator();
            },

            lte() {
                conditions.push('<=');
                return withDecorator();
            },

            gt() {
                conditions.push('>');
                return withDecorator();
            },

            gte() {
                conditions.push('>=');
                return withDecorator();
            },

            between() {
                const decorator = v => `${v[0]} AND ${v[1]}`;

                conditions.push('BETWEEN');

                return {
                    column(from, to, transform = identity) {
                        return column(decorator)(transform([from, to]));
                    },

                    value(from, to, transform = identity) {
                        return value(decorator)(transform([from, to]));
                    }
                };
            },

            isNull() {
                conditions.push('IS NULL');
                return conditions.join(' ');
            },

            isNotNull() {
                conditions.push('IS NOT NULL');
                return conditions.join(' ');
            }
        }
    }

    function and(conditions) {
        return `${conditions.join(' AND ')}`;
    }

    function or(conditions) {
        return `(${conditions.join(' OR ')})`;
    }

    return {
        column,
        and,
        or
    }
}

function mixin(thisArg, arg) {
    return Object.assign({
        sql: thisArg.sql,
        params: thisArg.params
    }, arg);
}

function doJoin(type, table, alias) {
    if (typeof table === 'function') {
        const subquery = table({
            sql: null,
            params: [],

            from: from
        });

        this.sql = `${this.sql} ${type} (${subquery.sql}) AS \`${alias}\``;
        this.params.push(...subquery.params);
    } else {
        this.sql = `${this.sql} ${type} ${as(table, alias)}`;
    }

    return mixin(this, {
        on,
        where,
        groupBy,
        having,
        orderBy,
        limit,
        select
    });
}

function join(table, alias) {
    return doJoin.bind(this)('JOIN', table, alias);
}

function innerJoin(table, alias) {
    return doJoin.bind(this)('INNER JOIN', table, alias);
}

function leftJoin(table, alias) {
    return doJoin.bind(this)('LEFT JOIN', table, alias);
}

function rightJoin(table, alias) {
    return doJoin.bind(this)('RIGHT JOIN', table, alias);
}

function on(callback) {
    this.sql = `${this.sql} ON ${callback(whereCondition(this.params))}`;

    return mixin(this, {
        join,
        innerJoin,
        leftJoin,
        rightJoin,
        where,
        groupBy,
        having,
        orderBy,
        limit,
        select
    });
}

function where(callback) {
    const condition = callback(whereCondition(this.params));

    if (condition) {
        this.sql = `${this.sql} WHERE ${condition}`;
    }

    return mixin(this, {
        groupBy,
        having,
        orderBy,
        limit,
        select
    });
}

function groupBy(columns) {
    this.sql = `${this.sql} GROUP BY ${columns.map(column => `${escape(column)}`).join(', ')}`;

    return mixin(this, {
        having,
        orderBy,
        limit,
        select
    });
}

function having(callback) {
    this.sql = `${this.sql} HAVING ${callback(whereCondition(this.params))}`;

    return mixin(this, {
        orderBy,
        limit,
        select

    });
}

function orderBy(columns) {
    this.sql = `${this.sql} ORDER BY ${Object.keys(columns).map(column => `${escape(column)} ${columns[column].toUpperCase()}`).join(', ')}`;

    return mixin(this, {
        limit,
        select
    });
}

function limit(offset, size) {
    this.sql = `${this.sql} LIMIT ?, ?`;

    this.params.push(offset);
    this.params.push(size);

    return mixin(this, {
        select
    });
}

function select(callback) {
    if (callback == null) {
        return {
            sql: `SELECT * ${this.sql}`,
            params: this.params
        };
    }

    const columns = [];
    const params = [];

    callback({
        column(col, alias, decorator = identity) {
            columns.push(`${decorator(escape(col))}${alias ? ` AS ${escape(alias)}` : ''}`);
        },

        count(column, alias, isDistinct = false) {
            columns.push(`${aggregate('COUNT', column, alias, isDistinct)}`);
        },

        sum(column, alias, isDistinct = false) {
            columns.push(`${aggregate('SUM', column, alias, isDistinct)}`)
        },

        avg(column, alias, isDistinct = false) {
            columns.push(`${aggregate('AVG', column, alias, isDistinct)}`)
        },

        min(column, alias, isDistinct = false) {
            columns.push(`${aggregate('MIN', column, alias, isDistinct)}`)
        },

        max(column, alias, isDistinct = false) {
            columns.push(`${aggregate('MAX', column, alias, isDistinct)}`)
        },

        subquery(callback, alias) {
            const subquery = callback({
                sql: null,
                params: [],

                from: from
            });

            columns.push(`(${subquery.sql})${alias ? ` AS ${escape(alias)}` : ''}`);
            params.push(...subquery.params);
        }
    });
    
    params.push(...this.params);
    
    return {
        sql: `SELECT ${columns.join(', ')} ${this.sql}`,
        params
    };
}

function aggregate(type, column, alias, isDistinct = false) {
    return `${type}(${isDistinct ? 'DISTINCT ' : ''}${column ? escape(column) : '*'})${alias ? ` AS \`${alias}\`` : ''}`;
}

function columns(cols) {
    this.sql = `${this.sql} (${cols.map(col => escape(col)).join(', ')})`;

    return mixin(this, {
        values
    });
}

function values(vals) {
    this.sql = `${this.sql} VALUES (${vals.map(val => {
        this.params.push(val);
        return '?';
    }).join(', ')})`;

    return  {
        sql: this.sql,
        params: this.params
    };
}

function into(isReplace = false) {
    return function into(table) {
        this.sql = `${isReplace ? 'REPLACE' : 'INSERT'} INTO ${table} ${this.sql}`;

        return  {
            sql: this.sql,
            params: this.params
        };
    }
}

function set(columns) {
    this.sql = `${this.sql} SET ${Object.keys(columns).map(column => {
        this.params.push(columns[column]);
        return `${escape(column)} = ?`;
    }).join(', ')}`;

    return mixin(this, {
        where(callback) {
            where.bind(this)(callback);

            return  {
                sql: this.sql,
                params: this.params
            };
        }
    });
}

function from(table, alias) {
    if (typeof table === 'function') {
        const subquery = table({
            sql: null,
            params: [],

            from: from
        });
        
        this.sql = `FROM (${subquery.sql}) AS \`${alias}\``;
        this.params.push(...subquery.params);
    } else {
        this.sql = `FROM ${as(table, alias)}`;
    }

    return mixin(this, {
        join,
        innerJoin,
        leftJoin,
        rightJoin,
        where,
        groupBy,
        having,
        orderBy,
        limit,
        select
    });
}

export default function query() {
    return {
        sql: null,
        params: [],
        
        from: from,
        
        insert(param, isReplace = false) {
            if (typeof param === 'string') {
                this.sql = `${isReplace ? 'REPLACE' : 'INSERT'} INTO ${param}`;

                return mixin(this, {
                    columns,
                    values
                });
            }

            const cols = [];
            const vals = Object.keys(param).map(key => {
                cols.push(escape(key));
                this.params.push(param[key]);
                return '?';
            });

            this.sql = `(${cols.join(', ')}) VALUES (${vals.join(', ')})`;

            return mixin(this, {
                into: into(isReplace)
            });
        },

        delete(table) {
            this.sql = `DELETE FROM ${table}`;

            return mixin(this, {
                where(callback) {
                    where.bind(this)(callback);

                    return {
                        sql: this.sql,
                        params: this.params
                    }
                }
            });
        },

        update(table) {
            this.sql = `UPDATE ${table}`;

            return mixin(this, {
                set
            });
        }
    };
};