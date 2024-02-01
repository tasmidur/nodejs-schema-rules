import { databaseInt } from "../src/examples/dbinit";
import { DATABASE_MYSQL, DATABASE_POSTGRES, DATABASE_SQLITE } from "../src/utils/constants";

test.only('Sqlite database connection check', async () => {
  const connection=await databaseInt(DATABASE_SQLITE);
  expect(connection).toBeTruthy()
});

test.only('MySQL database connection check', async () => {
  const connection=await databaseInt(DATABASE_MYSQL);
  expect(connection).toBeTruthy()
});

test.only('Postgres database connection check', async () => {
  const connection=await databaseInt(DATABASE_POSTGRES);
  expect(connection).toBeTruthy()
});






