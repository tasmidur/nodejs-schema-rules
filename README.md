# NodeJS Schema Rules

[![NPM Downloads](https://img.shields.io/npm/dw/nodejs-schema-rules )](https://www.npmjs.com/package/nodejs-schema-rules)
[![npm](https://img.shields.io/npm/v/nodejs-schema-rules)](https://www.npmjs.com/package/nodejs-schema-rules)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The CLI tool automatically generates basic validation rules for popular libraries such as [JOI](https://www.npmjs.com/package/joi),    [ValidatorJS](https://www.npmjs.com/package/validatorjs) and [@vinejs/vine](https://www.npmjs.com/package/@vinejs/vine) rules based on your database table schema. These rules serve as a convenient starting point, allowing you to refine and enhance them to suit your specific needs.


## Installation
Installing nodejs-schema-rules globally to access `ndVr` CLI 
```bash
npm install nodejs-schema-rules -g
yarn add global nodejs-schema-rules
```
Then run `ndVr init` for initialization of  `schema.config.js` file then modify as your requirement.

```bash
ndVr init
```

Modify the `schema.config.js`

```javascript
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
```

## Usage

  The `ndVr joi -t my_table -db mysql -c column1,column2` command generates validation rules for a specified database table and its columns. It creates a validation rules based on the chosen validation libraries like `joi`, "validatorjs", "vine". The generated rules can be used to enforce data integrity and validate incoming requests in your application.

  Options:
  - -db, --database: Specify the type of database (e.g., `mysql`, `postgres`, `sqlite`).
  - -t, --table: Specify the name of the database table for which rules should be generated.
  - -c, --columns: Specify the column names of the table to generate rules for.
  - -h, --help: Display help for the command.

  Examples:
  - Generate rules for a MySQL table named `users` with columns `id` and `name`:

    ```bash
    ndVr joi -t users -db mysql -c id,name
    ```

  - Generate rules for a PostgreSQL table named `users` with a validation library `validatorJs`:

      ```bash
    ndVr validatorJs -t users -db mysql -c id,name
      ```
  
  as same as for sqlite.

Let's say you've the table structure:

```sql
CREATE TABLE data_types (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    height REAL,
    is_student BOOLEAN,
    birthdate DATE,
    registration_timestamp TIMESTAMP,
    description BLOB
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Generate rules for a whole table

Now if you run:

```bash
ndVr joi -db sqlite -t data_types
```

You'll get:
```
🚀 Schema Base Validation rules for "joi" generated! 🚀
Copy and paste these rules into your validation location, such as controller, form request, or any applicable place 😊
______________________________________________________________________________________________________________________


{ 
  name: Joi.string().required(),
  age: Joi.integer().min(-9223372036854775808).max(9223372036854775807).required(),
  height: Joi.number().required(),
  is_student: Joi.required(),
  birthdate: Joi.date().required(),
  registration_timestamp: Joi.required(),
  description: Joi.required(), 
}

```

### Generate rules for specific columns

You can also explicitly specify the columns:

```bash
ndVr joi -db sqlite -t data_types -c name,age
```

Which gives you:
```

🚀 Schema Base Validation rules for "joi" generated! 🚀
Copy and paste these rules into your validation location, such as controller, form request, or any applicable place 😊
______________________________________________________________________________________________________________________

{ 
  name: Joi.string().required(),
  age: Joi.integer().min(-9223372036854775808).max(9223372036854775807).required(), 
}

```

### Always skip columns

To always skip columns add it in the `schema-config.js` file, under `skipColumns` attribute.

```javascript
skipColumns: (process.env.SKIP_COLUMNS || 'created_at,updated_at,deleted_at').split(',')
```


## Supported Drivers

Supported database drivers are MySQL, PostgreSQL, and SQLite.

Validation rules may vary based on the selected driver due to differences in supported data types and range specifications.

## Testing

```bash
yarn test
```
## Author
👤 **Md Tasmidur Rahman <tasmidurrahman@gmail.com> (https://tasmidur.netlify.app)**

* Linkedin: [@tasmidur](https://www.linkedin.com/in/tasmidur/)
* Github: [@tasmidur](https://github.com/tasmidur)
* Medium: [@tasmidur](https://medium.com/@tasmidur)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/tasmidur/nodejs-dynamic-validation-rules/issues)

## Show your support

Give a ⭐️ if this project helped you!

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.