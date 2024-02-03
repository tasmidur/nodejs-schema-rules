"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSchemaClassMap = exports.databaseClassMap = exports.schemaOperationClass = exports.DATABASE_SQLITE = exports.DATABASE_POSTGRES = exports.DATABASE_MYSQL = exports.REQUEST_VALIDATION_TYPE_VALIDATORJS = exports.REQUEST_VALIDATION_TYPE_JOI = exports.REQUEST_VALIDATION_TYPE_VINE = exports.CLASS_NAME_SUFFIX = void 0;
const MySQLDatabase_1 = require("../databases/MySQLDatabase");
const PostgresDatabase_1 = require("../databases/PostgresDatabase");
const SqliteDatabase_1 = require("../databases/SqliteDatabase");
const vine_request_schema_generator_1 = require("../request-schema-generator/vine.request.schema.generator");
const joi_request_schema_generator_1 = require("../request-schema-generator/joi.request.schema.generator");
const validatorjs_request_schema_generator_1 = require("../request-schema-generator/validatorjs.request.schema.generator");
const SchemaOperationForMysql_1 = require("../schemas-operations/SchemaOperationForMysql");
const SchemaOperationForPostgres_1 = require("../schemas-operations/SchemaOperationForPostgres");
const SchemaOperationForSqlite_1 = require("../schemas-operations/SchemaOperationForSqlite");
exports.CLASS_NAME_SUFFIX = `{{className}}RequestValidator`;
exports.REQUEST_VALIDATION_TYPE_VINE = 'vine';
exports.REQUEST_VALIDATION_TYPE_JOI = 'joi';
exports.REQUEST_VALIDATION_TYPE_VALIDATORJS = 'validatorJs';
exports.DATABASE_MYSQL = "mysql";
exports.DATABASE_POSTGRES = "postgres";
exports.DATABASE_SQLITE = "sqlite";
exports.schemaOperationClass = {
    [exports.DATABASE_MYSQL]: SchemaOperationForMysql_1.SchemaOperationForMysql,
    [exports.DATABASE_POSTGRES]: SchemaOperationForPostgres_1.SchemaOperationForPostgres,
    [exports.DATABASE_SQLITE]: SchemaOperationForSqlite_1.SchemaOperationForSqlite,
};
exports.databaseClassMap = {
    [exports.DATABASE_MYSQL]: MySQLDatabase_1.MySQLDatabase,
    [exports.DATABASE_POSTGRES]: PostgresDatabase_1.PostgresDatabase,
    [exports.DATABASE_SQLITE]: SqliteDatabase_1.SqliteDatabase
};
exports.requestSchemaClassMap = {
    [exports.REQUEST_VALIDATION_TYPE_VINE]: vine_request_schema_generator_1.VineRequestSchemaGenerator,
    [exports.REQUEST_VALIDATION_TYPE_JOI]: joi_request_schema_generator_1.JoiRequestSchemaGenerator,
    [exports.REQUEST_VALIDATION_TYPE_VALIDATORJS]: validatorjs_request_schema_generator_1.ValidatorJsRequestSchemaGenerator,
};
