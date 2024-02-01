import { errorMessage } from '../utils/messages'
import { IValidationSchema } from '../contacts/ValidationRule'
import { SqliteDatabase } from '../databases/SqliteDatabase';

export class SchemaOperationForSqlite {
  public integerTypes: any = {
    integer: { min: '-9223372036854775808', max: '9223372036854775807' },
  }

  private databaseConfig: any;
  private database: SqliteDatabase;
  private table: string;
  private selectedColumns: string[];
  private skipColumns: string[]


  constructor(table: string, databaseConfig: any, selectedColumns: string[], skipColumns: string[]) {
    this.table = table;
    this.databaseConfig = databaseConfig;
    this.database = new SqliteDatabase(this.databaseConfig);
    this.selectedColumns = selectedColumns;
    this.skipColumns = skipColumns;
  }

  private async getTableSchema(): Promise<any[]> {
    await this.database.connect();
    let schema: any[] = [];
    try {
      const tableExist = await this.database.query(`SELECT name FROM sqlite_master WHERE type='table' AND name='${this.table}';`) 
      if (!tableExist.length) {
        throw new Error(errorMessage(`The ${this.table} table is not exist!`))
      }
      schema= (await this.database.query(`PRAGMA table_info('${this.table}')`)) ?? []
    } catch (error: any) {
      console.error(error.message)
    } finally {
      // Close the database connection
      await this.database.end();
    }
    return schema;
  }

  public async generateColumnRules(): Promise<any> {
    const rules: IValidationSchema = {}
    let tableSchema = await this.getTableSchema();  
    if (this.skipColumns.length || this.selectedColumns.length) {
      tableSchema = tableSchema.filter(({ name }) => {
        return this.selectedColumns.length
          ? this.selectedColumns.includes(name)
          : !this.skipColumns.includes(name)
      })
    }

    tableSchema.forEach(({ name, type, notnull, dflt_value, pk }) => {
      if (Boolean(pk)) {
        return
      }

      let columnRules = []
      let dataType = type.toLowerCase()

      switch (true) {
        case dataType === 'tinyint(1)':
          columnRules.push('integer')
          break
        case dataType.includes('varchar') || dataType === 'text':
          columnRules.push('string')
          if (dataType.includes('varchar'))
            columnRules.push('max:' + parseInt(dataType.replace(/\D/g, ''), 10))
          break
        case dataType.includes('int'):
          columnRules.push('integer')
          columnRules.push('min:' + this.integerTypes.integer.min)
          columnRules.push('max:' + this.integerTypes.integer.max)
          break
        case dataType.includes('real') ||
          dataType.includes('numeric') ||
          dataType.includes('float'):
          // Add more specific validation as needed
          columnRules.push('numeric')
          break
        case dataType.includes('date') || dataType === 'time':
          columnRules.push('date')
          break
        default:
          // Skip BLOB for now
          break
      }
      columnRules.push(Boolean(notnull) ? 'nullable' : 'required')
      rules[name] = columnRules
    })
    return rules
  }
}
