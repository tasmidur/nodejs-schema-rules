import { IRequestSchemaClassMap } from './RequestSchemaClassMap'

export interface ITemplateSetting {
  fileName: string
  rules: string[]
  templateType: keyof IRequestSchemaClassMap
  stroreDir?: any
}
