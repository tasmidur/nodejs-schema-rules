Dynamic NodeJS Schema Validation Rules Generator

Introduction
Are you tired of writing validation rules for your database tables manually? Introducing <strong>nodejs-schema-rules</strong>, a powerful CLI tool that automates the generation of basic validation rules for popular libraries such as <a target="_new" href="https://www.npmjs.com/package/joi">JOI</a>, <a target="_new" href="https://www.npmjs.com/package/validatorjs">ValidatorJS</a>, and <a target="_new" href="https://www.npmjs.com/package/@vinejs/vine">@vinejs/vine</a>. These rules are based on your database table schema, providing a convenient starting point that you can refine and enhance to suit your specific needs.

In this blog post, we will explore the installation, configuration, and usage of nodejs-schema-rules. Whether you are working with MySQL, PostgreSQL, or SQLite databases, this tool offers a unified solution, making dynamic schema-based validation accessible and efficient. Stay tuned to discover how nodejs-schema-rules can enhance your development workflow and contribute to the overall reliability of your Node.js applications.

Installation
Install <strong>nodejs-schema-rules</strong> globally to access the <code>ndVr</code> CLI:
```bash
npm install nodejs-schema-rules -g
# or
yarn add global nodejs-schema-rules
```
After installation, initialize the <code>schema.config.js</code> file:
```bash
ndVr init
```
Modify the generated <code>schema.config.js</code> file according to your database configuration:
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
Usage
Use the <code>ndVr</code> CLI to generate validation rules for your database tables. For example:
```bash
ndVr joi -t my_table -db mysql -c column1,column2
```
This command generates validation rules for the specified database table (<code>my_table</code>) and its columns (<code>column1</code> and <code>column2</code>). You can choose the database type (<code>mysql</code>, <code>postgres</code>, <code>sqlite</code>) and the validation library (<code>joi</code>, <code>validatorjs</code>, <code>vine</code>). The generated rules can be used to enforce data integrity and validate incoming requests in your application.
Options:
<li><strong>-db, --database:</strong> Specify the type of database (e.g., <code>mysql</code>, <code>postgres</code>, <code>sqlite</code>).</li><li><strong>-t, --table:</strong> Specify the name of the database table for which rules should be generated.</li><li><strong>-c, --columns:</strong> Specify the column names of the table to generate rules for.</li><li><strong>-h, --help:</strong> Display help for the command.</li>
Examples:
<li><p>Generate rules for a MySQL table named <code>users</code> with columns <code>id</code> and <code>name</code>:</p><pre><div class="dark bg-black rounded-md"><div class="flex items-center relative text-token-text-secondary bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg>Copy code</button></span></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">ndVr joi -t <span class="hljs-built_in">users</span> -db mysql -c <span class="hljs-built_in">id</span>,name
</code></div></div></pre></li><li><p>Generate rules for a PostgreSQL table named <code>users</code> with the validation library <code>validatorJs</code>:</p><pre><div class="dark bg-black rounded-md"><div class="flex items-center relative text-token-text-secondary bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg>Copy code</button></span></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">ndVr validatorJs -t <span class="hljs-built_in">users</span> -db postgres -c <span class="hljs-built_in">id</span>,name
</code></div></div></pre></li><li><p>Generate rules for a SQLite table named <code>users</code>:</p><pre><div class="dark bg-black rounded-md"><div class="flex items-center relative text-token-text-secondary bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg>Copy code</button></span></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">ndVr vine -t <span class="hljs-built_in">users</span> -db sqlite -c <span class="hljs-built_in">id</span>,name
</code></div></div></pre></li>
Schema Configuration:
If you have a table structure like this:

```sql
CREATE TABLE data_types (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    height REAL,
    is_student BOOLEAN,
    birthdate DATE,
    registration_timestamp TIMESTAMP,
    description BLOB,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```
Generate rules for a whole table:
```bash
ndVr joi -db sqlite -t data_types
```
Output:
```javascript
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
Generate rules for specific columns:
```bash
ndVr joi -db sqlite -t data_types -c name,age
```
Output:
```javascript
{ 
  name: Joi.string().required(),
  age: Joi.integer().min(-9223372036854775808).max(9223372036854775807).required(), 
}
```
Always skip columns:
Add the columns to skip in the <code>schema-config.js</code> file, under the <code>skipColumns</code> attribute:
```javascript
skipColumns: (process.env.SKIP_COLUMNS || 'created_at,updated_at,deleted_at').split(',')
```
Supported Drivers
Supported database drivers are MySQL, PostgreSQL, and SQLite. Validation rules may vary based on the selected driver due to differences in supported data types and range specifications.
Testing

```bash
yarn test
```

By incorporating nodejs-schema-rules into your workflow, you not only enhance the integrity of your data but also contribute to a more efficient and maintainable codebase. The generated rules serve as a solid foundation, allowing developers to focus on refining and enhancing validation logic for their specific use cases.

