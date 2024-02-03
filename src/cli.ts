#!/usr/bin/env ts-node

import { Argument, Option, program } from 'commander';
import { Executor } from './executor';
import { config as dotenvConfig } from 'dotenv';
import {
  DATABASE_MYSQL,
  DATABASE_POSTGRES,
  DATABASE_SQLITE,
  REQUEST_VALIDATION_TYPE_VINE,
  REQUEST_VALIDATION_TYPE_JOI,
  REQUEST_VALIDATION_TYPE_VALIDATORJS,
} from './utils/constants';
import { initSchema } from './utils/utils';

// Load environment variables from a .env file if present
dotenvConfig();

// Define the CLI program
program
  .version('1.0.0')
  .description('A simple CLI app for dynamic schema rules generation');

program
.command("init")
.action(()=>{
  initSchema();
})

program
  .addArgument(new Argument('<validation-library>', 'Specify the libraries such as joi, validatorJS and vine to generate basic validation rules (default is "joi")').choices([REQUEST_VALIDATION_TYPE_JOI, REQUEST_VALIDATION_TYPE_VALIDATORJS, REQUEST_VALIDATION_TYPE_VINE]).default(REQUEST_VALIDATION_TYPE_JOI))
  .addOption(new Option('-db, --database <database>', 'Specify the database').choices([DATABASE_MYSQL, DATABASE_POSTGRES, DATABASE_SQLITE]))
  .option('-c, --columns <columns>', 'Specify the column name of the table')
  .requiredOption('-t, --table <table>', 'Specify the table name')
  .action(async (schemaType,cmd) => {
    try {
      const { table, database, columns = ""} = cmd;   
      const options = {
        columns: columns.split(',').filter(Boolean),
        validationSchemaType: schemaType,
        requestFile:null,
      };
      
      // Execute the main logic
      await new Executor(table, database, options).execute();

    } catch (error:any) {
      console.error(error.message);
    } finally {
      process.exit();
    }
  });

program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('$ ndVr joi -t my_table -db mysql -c column1,column2');
});

// Parse the command line arguments
program.parse(process.argv);
