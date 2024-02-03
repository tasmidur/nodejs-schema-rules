"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = void 0;
const validateConfig = (config) => {
    // Validate defaultDatabase
    if (!config.defaultDatabase) {
        throw new Error('Default database not specified in the configuration.');
    }
    // Validate databases
    const { databases } = config;
    if (!databases || typeof databases !== 'object') {
        throw new Error('Invalid or missing "databases" property in the configuration.');
    }
    // Validate at least one database is provided
    if (!databases.postgres && !databases.mysql && !databases.sqlite) {
        throw new Error('At least one database configuration (postgres, mysql, or sqlite) must be provided in schema.config.js file in your working directory');
    }
    // Validate postgres configuration
    if (databases === null || databases === void 0 ? void 0 : databases.postgres) {
        const { host, port, user, password, database } = databases.postgres;
        if (!host || !port || !user || !password || !database) {
            throw new Error('Incomplete PostgreSQL configuration. All properties (host, port, user, password, database) are required.');
        }
    }
    // Validate mysql configuration
    if (databases === null || databases === void 0 ? void 0 : databases.mysql) {
        const { host, port, user, password, database } = databases === null || databases === void 0 ? void 0 : databases.mysql;
        if (!host || !port || !user || !password || !database) {
            throw new Error('Incomplete MySQL configuration. All properties (host, port, user, password, database) are required.');
        }
    }
    // Validate sqlite configuration
    if (databases === null || databases === void 0 ? void 0 : databases.sqlite) {
        const { database } = databases.sqlite;
        if (!database) {
            throw new Error('Incomplete SQLite configuration. The "database" property is required.');
        }
    }
    // Validate skipColumns
    if ((config === null || config === void 0 ? void 0 : config.skipColumns) && !Array.isArray(config.skipColumns)) {
        throw new Error('Invalid "skipColumns" property. It should be an array.');
    }
    return config;
};
exports.validateConfig = validateConfig;
