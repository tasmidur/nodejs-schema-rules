import { ConnectionConfig as MySQLConnectionConfig } from 'mysql2/promise';
import { IDatabaseBaseClassMap, IDatabaseConfig } from "../contacts/Database";
import { databaseClassMap } from "../utils/constants";
import { ClientConfig as PostgresClientConfig } from 'pg';

export class Database{
    private databaseType:(keyof IDatabaseBaseClassMap);
    private databaseConfig:MySQLConnectionConfig|PostgresClientConfig|any;

    constructor(databaeTpe:(keyof IDatabaseBaseClassMap),databaseConfig: IDatabaseConfig) {
        this.databaseType=databaeTpe;
		    this.databaseConfig = databaseConfig;
	}
      // Function to initialize a class based on the request validation type
   public init(): InstanceType<IDatabaseBaseClassMap[keyof IDatabaseBaseClassMap]> {
    const DatabaseClass = databaseClassMap[this.databaseType]
    if (DatabaseClass) {
      return new DatabaseClass(this.databaseConfig)
    } else {
      throw new Error(`Unsupported database: ${String(this.databaseType)}`)
    }
  }

}