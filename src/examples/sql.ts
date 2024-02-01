
const tableName="schema_types";

const pgDataTypeTable=`
CREATE TABLE IF NOT EXISTS ${tableName} (
    id SERIAL PRIMARY KEY,
    varchar_column VARCHAR(255),
    char_column CHAR(10),
    int_column INT,
    bigint_column BIGINT,
    decimal_column DECIMAL(10, 2),
    float_column FLOAT,
    double_column DOUBLE PRECISION,
    date_column DATE,
    timestamp_column TIMESTAMP,
    boolean_column BOOLEAN,
    text_column TEXT,
    blob_column BYTEA,
    json_column JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const mySQLDataTypeTable=`
CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    varchar_column VARCHAR(255),
    char_column CHAR(10),
    int_column INT,
    bigint_column BIGINT,
    decimal_column DECIMAL(10, 2),
    float_column FLOAT,
    double_column DOUBLE,
    date_column DATE,
    timestamp_column TIMESTAMP,
    boolean_column BOOLEAN,
    enum_column ENUM('1', '2', '3'),
    text_column TEXT,
    blob_column BLOB,
    json_column JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

const sqliteDataTypeTable=`
CREATE TABLE IF NOT EXISTS ${tableName} (
    id INTEGER PRIMARY KEY,
    varchar_column TEXT,
    float_column REAL,
    boolean_column BOOLEAN,
    date_column DATE,
    timestamp_column TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
`;

export{
    tableName,
    pgDataTypeTable,
    mySQLDataTypeTable,
    sqliteDataTypeTable
}
