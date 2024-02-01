import { ITemplateSetting } from '../contacts/TemplateSetting'
import * as fs from 'fs'
import * as path from 'path'
import { IRequestSchemaGenerator } from '../contacts/RequestSchemaGenerator'
import { buildTemplateContent, getClassName, snakeToCamel, storeFile } from '../utils/utils'
import { CLASS_NAME_SUFFIX } from '../utils/constants'

const templateSource = fs.readFileSync(
  path.resolve(__dirname, '../templates/validatorjs.template'),
  'utf8',
)

export class ValidatorJsRequestSchemaGenerator
  implements IRequestSchemaGenerator
{
  private templateSetting: ITemplateSetting
  private className: any
  private storeDir: any
  constructor(templateSetting: ITemplateSetting) {
    this.templateSetting = templateSetting
    this.storeDir = templateSetting?.stroreDir
    if (this.templateSetting?.fileName) {
      this.className = getClassName(
        {
          className: snakeToCamel(this.templateSetting.fileName),
        },
        CLASS_NAME_SUFFIX
      )
    }
  }
  public buildAndStore(): any {
    const pasedRules = JSON.stringify(this.parse(this.templateSetting.rules),null,2)
    if (this.storeDir && this.className) {
      const content = buildTemplateContent(templateSource, {
        CLASS_NAME: this.className,
        RULES: pasedRules,
      })
      storeFile(content, this.className, this.storeDir)
    }
    return pasedRules;
  }

  private parse= (columnRules:any)=>{
    return Object.entries(columnRules).reduce((result:any, [columnName, columnArray]:any) => {
      const updatedColumnArray = columnArray.reduce((acc:any, item:any) => {
        if (["nullable","required"].includes(item)) {
          acc.unshift(item);
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
      result[columnName] = updatedColumnArray;
      return result;
    }, {});
  }
}
