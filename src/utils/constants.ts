import { IDatabaseBaseClassMap } from "../contacts/Database";
import { IRequestSchemaClassMap } from "../contacts/RequestSchemaClassMap";
import { ISchemaOperationClassMap } from "../contacts/SchemaOperationClassMap";
import { MySQLDatabase } from "../databases/MySQLDatabase";
import { PostgresDatabase } from "../databases/PostgresDatabase";
import { SqliteDatabase } from "../databases/SqliteDatabase";
import { VineRequestSchemaGenerator } from "../request-schema-generator/vine.request.schema.generator";
import { JoiRequestSchemaGenerator } from "../request-schema-generator/joi.request.schema.generator";
import { ValidatorJsRequestSchemaGenerator } from "../request-schema-generator/validatorjs.request.schema.generator";
import { SchemaOperationForMysql } from "../schemas-operations/SchemaOperationForMysql";
import { SchemaOperationForPostgres } from "../schemas-operations/SchemaOperationForPostgres";
import { SchemaOperationForSqlite } from "../schemas-operations/SchemaOperationForSqlite";

export const CLASS_NAME_SUFFIX = `{{className}}RequestValidator`

export const REQUEST_VALIDATION_TYPE_VINE = 'vine'
export const REQUEST_VALIDATION_TYPE_JOI = 'joi'
export const REQUEST_VALIDATION_TYPE_VALIDATORJS = 'validatorJs'

export const DATABASE_MYSQL="mysql";
export const DATABASE_POSTGRES="postgres";
export const DATABASE_SQLITE="sqlite";

export const schemaOperationClass: ISchemaOperationClassMap = {
    [DATABASE_MYSQL]:SchemaOperationForMysql,
    [DATABASE_POSTGRES]:SchemaOperationForPostgres,
    [DATABASE_SQLITE]:SchemaOperationForSqlite,
  }

export const databaseClassMap:IDatabaseBaseClassMap={
     [DATABASE_MYSQL]:MySQLDatabase,
     [DATABASE_POSTGRES]:PostgresDatabase,
     [DATABASE_SQLITE]:SqliteDatabase
}

export const requestSchemaClassMap: IRequestSchemaClassMap = {
    [REQUEST_VALIDATION_TYPE_VINE]: VineRequestSchemaGenerator,
    [REQUEST_VALIDATION_TYPE_JOI]: JoiRequestSchemaGenerator,
    [REQUEST_VALIDATION_TYPE_VALIDATORJS]: ValidatorJsRequestSchemaGenerator,
}

