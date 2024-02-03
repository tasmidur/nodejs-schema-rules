"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const constants_1 = require("../utils/constants");
class Database {
    constructor(databaeTpe, databaseConfig) {
        this.databaseType = databaeTpe;
        this.databaseConfig = databaseConfig;
    }
    // Function to initialize a class based on the request validation type
    init() {
        const DatabaseClass = constants_1.databaseClassMap[this.databaseType];
        if (DatabaseClass) {
            return new DatabaseClass(this.databaseConfig);
        }
        else {
            throw new Error(`Unsupported database: ${String(this.databaseType)}`);
        }
    }
}
exports.Database = Database;
