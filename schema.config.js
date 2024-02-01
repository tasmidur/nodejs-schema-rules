require("dotenv").config();
const schemaConfig = {
  defaultDatabase: 'sqlite',
  databases: {
    postgres: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '123456',
      database: 'testing'
    },
    mysql: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '123456',
      database: 'schema_builder'
    },
    sqlite: { database: './schema_builder.db' }
  },
  skipColumns: [ 'created_at', 'updated_at', 'deleted_at' ],
  validationSchemaType: 'joi'
};
module.exports = schemaConfig;