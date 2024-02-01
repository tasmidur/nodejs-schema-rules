
import { Executor } from '../src/executor';
import { DATABASE_POSTGRES, REQUEST_VALIDATION_TYPE_JOI, REQUEST_VALIDATION_TYPE_VALIDATORJS, REQUEST_VALIDATION_TYPE_VINE } from '../src/utils/constants';
import { tableName } from '../src/examples/sql';

const options = {
  columns: [],
  validationSchemaType:REQUEST_VALIDATION_TYPE_VALIDATORJS,
  requestFile:"examples/form-validation"
} 

test.only('ValidatorJs schema generate only schema rules  from DATABASE_POSTGRES', async () => {
  const otherOpt={
    ...options,
    requestFile:null
  }
  const executor=new Executor(tableName,DATABASE_POSTGRES,otherOpt);
  expect(await executor.execute()).toBeTruthy()
});

test.only('ValidatorJs schema generate with selected columns  from DATABASE_POSTGRES', async () => {
  const otherOpt={
    ...options,
    columns:["name","age","height"],
    requestFile:`${options.requestFile}/${DATABASE_POSTGRES}/${REQUEST_VALIDATION_TYPE_VALIDATORJS}/ValidatorJSTestWithSelectedColumn`
  }
  const executor=new Executor(tableName,DATABASE_POSTGRES,otherOpt);
  expect(await executor.execute()).toBeTruthy()
});

test.only('ValidatorJs schema generate without selected columns  from DATABASE_POSTGRES', async () => {
  const otherOpt={
    ...options,
    requestFile:`${options.requestFile}/${DATABASE_POSTGRES}/${REQUEST_VALIDATION_TYPE_VALIDATORJS}/ValidatorJSTestWithoutSelectedColumn`
  }
  const executor=new Executor(tableName,DATABASE_POSTGRES,otherOpt);
  expect(await executor.execute()).toBeTruthy()
});


test.only('JOI schema generate only schema rules  from DATABASE_POSTGRES', async () => {
  const otherOpt={
    ...options,
    validationSchemaType:REQUEST_VALIDATION_TYPE_JOI,
    requestFile:null
  }
  const executor=new Executor(tableName,DATABASE_POSTGRES,otherOpt);
  expect(await executor.execute()).toBeTruthy()
});

test.only('JOI schema generate with selected columns  from DATABASE_POSTGRES', async () => {
  const otherOpt={
    ...options,
    columns:["name","age","height"],
    validationSchemaType:REQUEST_VALIDATION_TYPE_JOI,
    requestFile:`${options.requestFile}/${DATABASE_POSTGRES}/${REQUEST_VALIDATION_TYPE_VALIDATORJS}/JOITestWithSelectedColumn`
  }
  const executor=new Executor(tableName,DATABASE_POSTGRES,otherOpt);
  expect(await executor.execute()).toBeTruthy()
});

test.only('JOI schema generate without selected columns  from DATABASE_POSTGRES', async () => {
  const otherOpt={
    ...options,
    validationSchemaType:REQUEST_VALIDATION_TYPE_JOI,
    requestFile:`${options.requestFile}/${DATABASE_POSTGRES}/${REQUEST_VALIDATION_TYPE_VALIDATORJS}/JOITestWithoutSelectedColumn`
  }
  const executor=new Executor(tableName,DATABASE_POSTGRES,otherOpt);
  expect(await executor.execute()).toBeTruthy()
});


test.only('Vine Js schema generate only schema rules  from DATABASE_POSTGRES', async () => {
  const otherOpt={
    ...options,
    validationSchemaType:REQUEST_VALIDATION_TYPE_VINE,
    requestFile:null
  }
  const executor=new Executor(tableName,DATABASE_POSTGRES,otherOpt);
  expect(await executor.execute()).toBeTruthy()
});

test.only('Vine Js schema generate with selected columns  from DATABASE_POSTGRES', async () => {
  const otherOpt={
    ...options,
    columns:['int_column','float_column','date_column','varchar_column'],
    validationSchemaType:REQUEST_VALIDATION_TYPE_VINE,
    requestFile:`${options.requestFile}/${DATABASE_POSTGRES}/${REQUEST_VALIDATION_TYPE_VALIDATORJS}/VineJsTestWithSelectedColumn`
  }
  const executor=new Executor(tableName,DATABASE_POSTGRES,otherOpt);
  expect(await executor.execute()).toBeTruthy()
});

test.only('Vine Js schema generate without selected columns  from DATABASE_POSTGRES', async () => {
  const otherOpt={
    ...options,
    validationSchemaType:REQUEST_VALIDATION_TYPE_VINE,
    requestFile:`${options.requestFile}/${DATABASE_POSTGRES}/${REQUEST_VALIDATION_TYPE_VALIDATORJS}/VineJsTestWithoutSelectedColumn`
  }
  const executor=new Executor(tableName,DATABASE_POSTGRES,otherOpt);
  expect(await executor.execute()).toBeTruthy()
});





