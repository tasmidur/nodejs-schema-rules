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
exports.SchemaOperationForSqlite = void 0;
const messages_1 = require("../utils/messages");
const SqliteDatabase_1 = require("../databases/SqliteDatabase");
class SchemaOperationForSqlite {
    constructor(table, databaseConfig, selectedColumns, skipColumns) {
        this.integerTypes = {
            integer: { min: '-9223372036854775808', max: '9223372036854775807' },
        };
        this.table = table;
        this.databaseConfig = databaseConfig;
        this.database = new SqliteDatabase_1.SqliteDatabase(this.databaseConfig);
        this.selectedColumns = selectedColumns;
        this.skipColumns = skipColumns;
    }
    getTableSchema() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.connect();
            let schema = [];
            try {
                const tableExist = yield this.database.query(`SELECT name FROM sqlite_master WHERE type='table' AND name='${this.table}';`);
                if (!tableExist.length) {
                    throw new Error((0, messages_1.errorMessage)(`The ${this.table} table is not exist!`));
                }
                schema = (_a = (yield this.database.query(`PRAGMA table_info('${this.table}')`))) !== null && _a !== void 0 ? _a : [];
            }
            catch (error) {
                console.error(error.message);
            }
            finally {
                // Close the database connection
                yield this.database.end();
            }
            return schema;
        });
    }
    generateColumnRules() {
        return __awaiter(this, void 0, void 0, function* () {
            const rules = {};
            let tableSchema = yield this.getTableSchema();
            if (this.skipColumns.length || this.selectedColumns.length) {
                tableSchema = tableSchema.filter(({ name }) => {
                    return this.selectedColumns.length
                        ? this.selectedColumns.includes(name)
                        : !this.skipColumns.includes(name);
                });
            }
            tableSchema.forEach(({ name, type, notnull, dflt_value, pk }) => {
                if (Boolean(pk)) {
                    return;
                }
                let columnRules = [];
                let dataType = type.toLowerCase();
                switch (true) {
                    case dataType === 'tinyint(1)':
                        columnRules.push('integer');
                        break;
                    case dataType === 'boolean':
                        columnRules.push('boolean');
                        break;
                    case dataType.includes('varchar') || dataType === 'text':
                        columnRules.push('string');
                        if (dataType.includes('varchar'))
                            columnRules.push('max:' + parseInt(dataType.replace(/\D/g, ''), 10));
                        break;
                    case dataType.includes('int'):
                        columnRules.push('integer');
                        columnRules.push('min:' + this.integerTypes.integer.min);
                        columnRules.push('max:' + this.integerTypes.integer.max);
                        break;
                    case dataType.includes('real') ||
                        dataType.includes('numeric') ||
                        dataType.includes('float'):
                        // Add more specific validation as needed
                        columnRules.push('numeric');
                        break;
                    case dataType.includes('date') || dataType == 'timestamp' || dataType == 'time':
                        columnRules.push('date');
                        break;
                    default:
                        // Skip BLOB for now
                        break;
                }
                columnRules.push(!Boolean(notnull) ? 'nullable' : 'required');
                rules[name] = columnRules;
            });
            return rules;
        });
    }
}
exports.SchemaOperationForSqlite = SchemaOperationForSqlite;
