import {
  IRequestSchemaClassMap,
} from '../contacts/RequestSchemaClassMap'
import { ITemplateSetting} from '../contacts/TemplateSetting'
import { requestSchemaClassMap } from '../utils/constants'

export class RequestSchemaGenerator {
  private requestSchemaType: keyof IRequestSchemaClassMap
  private templateSettings: ITemplateSetting

  constructor(templateSettings: ITemplateSetting) {
    this.requestSchemaType = templateSettings.templateType
    this.templateSettings = templateSettings
  }

  // Function to initialize a class based on the request validation type
  public initializeRequestSchemaGenerator(): InstanceType<IRequestSchemaClassMap[keyof IRequestSchemaClassMap]> {
    const RequestSchemaGeneratorClass = requestSchemaClassMap[this.requestSchemaType]
    if (RequestSchemaGeneratorClass) {
      return new RequestSchemaGeneratorClass(this.templateSettings).buildAndStore()
    } else {
      throw new Error(`Unsupported request validation type: ${String(this.requestSchemaType)}`)
    }
  }
}
