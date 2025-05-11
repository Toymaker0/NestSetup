import { Injectable, Scope } from '@nestjs/common';
import * as Knex from 'knex';
import { SchemaInit } from '../seedData/initiate';
import sequelize from './sequelize';

@Injectable({ scope: Scope.REQUEST })
export class DbManageService {
    private knexInstance: any;
    constructor(
       
        public schemaInit=new SchemaInit()
    ) {
        let dbConfig = {
            client: 'mysql',
            connection: {
                host: "localhost",
                port: 3306,
                user: "myuser",
                password: "mypassword",
                database: "mydatabase",
            },
            pool: { min: 0, max: 3 }

        }
        this.knexInstance = Knex(dbConfig);
    }

    getDb() {
        return this.knexInstance;
    }

    closeConnections() {
        this.knexInstance && this.knexInstance.destroy();
    }

    async authenticateConnection() {
        try {
            await sequelize.authenticate()
            console.log('Connection has been established successfully.');
            this.schemaInit.schemeTable()
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        };
    };

    
}
