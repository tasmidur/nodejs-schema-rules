import { errorMessage } from '../utils/messages'
import { IValidationSchema } from '../contacts/ValidationRule'
import { PostgresDatabase } from '../databases/PostgresDatabase';
import { ClientConfig } from 'pg';

export class SchemaOperationForPostgres {
  public integerTypes: any = {
    smallint: { min: '-32768', max: '32767' },
    integer: { min: '-2147483648', max: '2147483647' },
    bigint: { min: '-9223372036854775808', max: '9223372036854775807' },
  }

  private databaseConfig: ClientConfig;
  private database: PostgresDatabase;
  private table: string;
  private selectedColumns: string[];
  private skipColumns: string[]


  constructor(table: string, databaseConfig: ClientConfig, selectedColumns: string[], skipColumns: string[]) {
    this.table = table;
    this.databaseConfig = databaseConfig;
    this.database = new PostgresDatabase(this.databaseConfig);
    this.selectedColumns = selectedColumns;
    this.skipColumns = skipColumns;
  }

  private async getTableSchema(): Promise<any[]> {
    await this.database.connect();
    let schema: any;
    try {
      const tableExist = await this.database.query(
        `SELECT COUNT(table_name) as total_table FROM information_schema.tables WHERE table_name = '${this.table}';`,
      )
      if (tableExist.rows[0]?.total_table==undefined||tableExist.rows[0]?.total_table=='0') {
        throw new Error(errorMessage(`The ${this.table} table is not exist!`))
      }
      schema = await this.database.query(`
                      SELECT table_name,column_name, data_type, character_maximum_length, is_nullable, column_default
                      FROM 
                      information_schema.columns
                      WHERE 
                      table_name = '${this.table}' 
                      ORDER BY ordinal_position ASC;
          `);  

    } catch (error: any) {
      console.error(error.message)
    } finally {
      // Close the database connection
      await this.database.end();
    }
    return schema?.rows??[];
  }

  public async generateColumnRules(): Promise<any> {
    const rules: IValidationSchema = {}
    let tableSchema = await this.getTableSchema()

    if (this.skipColumns.length || this.selectedColumns.length) {
      tableSchema = tableSchema.filter(({ column_name }) => {
        return this.selectedColumns.length
          ? this.selectedColumns.includes(column_name)
          : !this.skipColumns.includes(column_name)
      })
    }

    tableSchema.forEach(
      ({
        table_name,
        column_name,
        data_type,
        character_maximum_length,
        is_nullable,
        column_default
      }) => {
        if (column_default&&column_default.includes('nextval')) {
          return;
        }

        let columnRules = []
        let type = data_type

        switch (true) {
          case type === 'boolean':
            columnRules.push('boolean')
            break
          case type.includes('char'):
            columnRules.push('string')
            columnRules.push('max:' + character_maximum_length ?? '255')
            break
          case type === 'text':
            columnRules.push('string')
            break
          case type.includes('int'):
            columnRules.push('integer')
            columnRules.push('min:' + this.integerTypes.integer.min.toString())
            columnRules.push('max:' + this.integerTypes.integer.max.toString())
            break
          case type.includes('double') ||
            type.includes('decimal') ||
            type.includes('numeric') ||
            type.includes('real'):
            columnRules.push('numeric')
            break
          case type.includes('date') || type.includes('time'):
            columnRules.push('date')
            break
          case type.includes('json'):
            columnRules.push('json')
            break
          default:
            // Skip for other type
            break
        }
        columnRules.push(is_nullable === 'YES' ? 'nullable' : 'required')
        rules[column_name] = columnRules
      },
    )
    return rules
  }
}
