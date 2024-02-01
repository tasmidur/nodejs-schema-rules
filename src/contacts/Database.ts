import { MySQLDatabase } from "../databases/MySQLDatabase"
import { PostgresDatabase } from "../databases/PostgresDatabase"
import { SqliteDatabase } from "../databases/SqliteDatabase"
import { DATABASE_MYSQL, DATABASE_POSTGRES, DATABASE_SQLITE } from "../utils/constants"

// Define the DatabaseStrategy interface
export interface IDatabase {
  connect(): Promise<void>
  query(sql: string): Promise<any>
  end(): Promise<void>
}

export interface IDatabaseConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
}

export interface IDatabaseBaseClassMap{
    [DATABASE_MYSQL]:typeof MySQLDatabase,
    [DATABASE_POSTGRES]:typeof PostgresDatabase,
    [DATABASE_SQLITE]:typeof SqliteDatabase
}

