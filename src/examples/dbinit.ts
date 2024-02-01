import { DATABASE_MYSQL, DATABASE_POSTGRES, databaseClassMap } from "../utils/constants"
import {Database} from "../databases"
import { config } from "../config/config";
import { mySQLDataTypeTable, pgDataTypeTable, sqliteDataTypeTable } from "./sql";



export const databaseInt=async (databaeTpe:any)=>{
     if(!Object.keys(databaseClassMap).includes(databaeTpe)){
        throw new Error("The database type is invalid")
     }
     const databaseConfig=config.databases[databaeTpe]  
     const database=new Database(databaeTpe,databaseConfig).init()
     await database.connect();
     try {
        await database.query(createTableSql(databaeTpe));
     } catch (error:any) {
        console.log("Test Error: ",error);
        throw new Error(error.message)
     }finally{
        await database.end()
     }
    return true;
}

export const createTableSql=(dataType:any)=>{
   if(dataType===DATABASE_MYSQL){
     return mySQLDataTypeTable;
   }else if(dataType===DATABASE_POSTGRES){
    return pgDataTypeTable;
   }else{
     return sqliteDataTypeTable;
   }
}