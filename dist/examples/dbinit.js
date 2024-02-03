"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableSql = exports.databaseInt = void 0;
const constants_1 = require("../utils/constants");
const databases_1 = require("../databases");
const config_1 = require("../config/config");
const sql_1 = require("./sql");
const databaseInt = (databaeTpe) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Object.keys(constants_1.databaseClassMap).includes(databaeTpe)) {
        throw new Error("The database type is invalid");
    }
    const databaseConfig = config_1.config.databases[databaeTpe];
    const database = new databases_1.Database(databaeTpe, databaseConfig).init();
    yield database.connect();
    try {
        yield database.query((0, exports.createTableSql)(databaeTpe));
    }
    catch (error) {
        console.log("Test Error: ", error);
        throw new Error(error.message);
    }
    finally {
        yield database.end();
    }
    return true;
});
exports.databaseInt = databaseInt;
const createTableSql = (dataType) => {
    if (dataType === constants_1.DATABASE_MYSQL) {
        return sql_1.mySQLDataTypeTable;
    }
    else if (dataType === constants_1.DATABASE_POSTGRES) {
        return sql_1.pgDataTypeTable;
    }
    else {
        return sql_1.sqliteDataTypeTable;
    }
};
exports.createTableSql = createTableSql;
