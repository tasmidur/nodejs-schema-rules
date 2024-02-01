import {
  createPool,
  Pool, ConnectionConfig
} from 'mysql2/promise'
import { IDatabase } from '../contacts/Database'
import { errorMessage } from '../utils/messages'

export class MySQLDatabase implements IDatabase {
  private pool: Pool
  private connection: any

  constructor(config: ConnectionConfig) {
    this.pool = createPool(config)
  }

  async connect(): Promise<void> {
    try {
      this.connection = await this.pool.getConnection()
    } catch (error: any) {
      throw error
    }
  }

  async query(sql: string): Promise<any> {
    try {
      if (this.connection) {
        const [rows, fields] = await this.connection.query(sql)
        return rows
      } else {
        throw new Error(errorMessage('No valid connection available.'))
      }
    } catch (error: any) {
      throw error
    }
  }

  async end(): Promise<void> {
    try {
      if (this.connection) {
        this.connection.release()
      } else {
        throw new Error(errorMessage('Connection is not available.'))
      }
    } catch (error: any) {
      throw error
    }
  }
}
