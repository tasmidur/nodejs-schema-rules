import { VineRequestSchemaGenerator } from '../request-schema-generator/vine.request.schema.generator'
import { JoiRequestSchemaGenerator } from '../request-schema-generator/joi.request.schema.generator'
import { ValidatorJsRequestSchemaGenerator } from '../request-schema-generator/validatorjs.request.schema.generator'
import {
  REQUEST_VALIDATION_TYPE_VINE,
  REQUEST_VALIDATION_TYPE_JOI,
  REQUEST_VALIDATION_TYPE_VALIDATORJS,
} from '../utils/constants'

export interface IRequestSchemaClassMap {
  [REQUEST_VALIDATION_TYPE_VINE]: typeof VineRequestSchemaGenerator
  [REQUEST_VALIDATION_TYPE_JOI]: typeof JoiRequestSchemaGenerator
  [REQUEST_VALIDATION_TYPE_VALIDATORJS]: typeof ValidatorJsRequestSchemaGenerator
}


