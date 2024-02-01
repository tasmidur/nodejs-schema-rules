import { ITemplateSetting } from '../contacts/TemplateSetting'
import * as fs from 'fs'
import * as path from 'path'
import { IRequestSchemaGenerator } from '../contacts/RequestSchemaGenerator'
import {
  buildTemplateContent,
  getClassName,
  snakeToCamel,
  storeFile,
} from '../utils/utils'

import { CLASS_NAME_SUFFIX } from '../utils/constants'

const templateSource = fs.readFileSync(
  path.resolve(__dirname, '../templates/vine.template'),
  'utf8',
)

export class VineRequestSchemaGenerator implements IRequestSchemaGenerator {
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
    const pasedRules = `{ \n${this.parse(this.templateSetting.rules)} \n}`
    if (this.storeDir && this.className) {
      const content = buildTemplateContent(templateSource, {
        CLASS_NAME: this.className,
        RULES: pasedRules,
      })
      storeFile(content, this.className, this.storeDir)
    }
    return pasedRules;
  }

  private parse = (rules: any) => {
    console.log(rules);
    
    return Object.keys(rules)
      .map((key: string) => {
        const schemaRules = (this.templateSetting.rules as any)[key]
        let concatedRules = schemaRules
          .map((_item: any) => {
            let rule = ``
            switch (true) {
              case _item === 'string':
                rule = '.string()'
                break
              case _item=='integer':
                rule = '.integer()'
                break
              case _item=='numeric':
                rule = '.number()'
                break
              case _item=='date':
                rule = '.date()'
                break
              case  _item.includes('bool'):
                rule = '.boolean()'
                break
              case  /^in:/.test(_item):
                const value = _item.split(':')[1].split(",").join(",")
                rule = `.enum([${value}])`
                break
              case _item.includes('max'): {
                const value = _item.split(':')[1] ?? 1
                rule = `.maxLength(${value})`
                break
              }
              case _item.includes('min'): {
                const value = _item.split(':')[1] ?? 1
                rule = `.minLength(${value})`
                break
              }
              case _item=='nullable':
                rule = '.optional()'
                break
              default:
                rule = '.any()'
                break
            }
            return rule
          })
          .join('')
        return `   ${key}: vine${concatedRules},`
      })
      .join('\n')
  }
}
