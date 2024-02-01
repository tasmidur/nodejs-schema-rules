import { config } from './config/config'
import {
  schemaOperationClass
} from './utils/constants'
import { RequestSchemaGenerator } from './request-schema-generator'
import { ITemplateSetting } from './contacts/TemplateSetting'
import { ISchemaOperationClassMap } from './contacts/SchemaOperationClassMap'
import { successMessage } from './utils/messages'
import * as path from 'path'

export class Executor {
  private table: string
  private databaseType: (keyof ISchemaOperationClassMap)
  private databaseConfig: any
  private options: any
  private skipColumns: string[] = []
  private selectedColumns: string[] = []
  private stroreDir: any;
  private templateType: any;
  private requestFile: any;

  constructor(table: string, databaseType?: string, options?: any) {  
    this.table = table
    this.databaseType = databaseType ?? config.defaultDatabase
    this.databaseConfig = config.databases[this.databaseType]
    this.options = options;
    this.skipColumns = config.skipColumns;
    this.templateType = this.options?.validationSchemaType ?? config.validationSchemaType;
    this.requestFile = this.table;
    this.stroreDir = config?.requestValidatorPath??null;

    if (this.options?.requestFile) {
      const filePath = this.options?.requestFile;
      this.requestFile = path.basename(filePath);
      this.stroreDir = path.dirname(filePath);
    }
    if (
      this.options &&
      this.options?.columns &&
      this.options.columns.length > 0
    ) {
      this.selectedColumns = this.options?.columns
      this.skipColumns = this.skipColumns.filter((skipColumn:any) => !this.options?.columns.includes(skipColumn),
      )
    }
  }

  public async execute(): Promise<boolean> {
    try {
      const columnRules = await this.initializeSchemaOperation().generateColumnRules();
      const templateSetting: ITemplateSetting = {
        fileName: this.requestFile,
        rules: columnRules,
        templateType: this.templateType,
        stroreDir: null //this.stroreDir,
      }

      const rules = new RequestSchemaGenerator(templateSetting).initializeRequestSchemaGenerator();
       
      console.log('\n')
      console.log(
        `🚀 Schema Base Validation rules for "${this.templateType}" generated! 🚀`,
      )
      console.log(
        `Copy and paste these rules into your validation location, such as controller, form request, or any applicable place 😊`,
      )
      console.log(
        '______________________________________________________________________________________________________________________',
      )
      console.log('\n')
      console.log(successMessage(rules))
      console.log('\n')

    } catch (error: any) {
      console.error(error.message)
    } finally {
    
    }
    return true;
  }
  private initializeSchemaOperation(): InstanceType<ISchemaOperationClassMap[keyof ISchemaOperationClassMap]> {
    const SchemaOperationClass = schemaOperationClass[this.databaseType]  
    if (SchemaOperationClass) {
      return new SchemaOperationClass(this.table, this.databaseConfig, this.selectedColumns, this.skipColumns)
    } else {
      throw new Error(`Unsupported request validation type: ${this.databaseType}`)
    }
  }
}
