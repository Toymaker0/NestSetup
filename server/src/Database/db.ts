import { Injectable, Inject, Scope } from '@nestjs/common';

import * as Knex from 'knex';

@Injectable({ scope: Scope.REQUEST })
export class DbProvider {
    private knexInstance: any;

    constructor(
        // @Inject(REQUEST) private readonly request: Request,
        // private readonly configService: ConfigService,
    ) {
        // const tenantDb = this.request['tenantDb'];
        // let dbConfig = this.configService.get(`database.clients.${tenantDb}`);
        // if (!dbConfig) {
        let dbConfig = {
            client: 'mysql',
            connection: {
                host: "localhost",
                port: 3306,
                user: "root",
                password: "rootpassword",
                database: "server",
            },
            pool: { min: 0, max: 3 }

            // }
            //   throw new Error(`No database configuration found for tenant: ${tenantDb}`);
        }
        this.knexInstance = Knex(dbConfig);
    }

    getDb() {
        return this.knexInstance;
    }

    closeConnections() {
        this.knexInstance && this.knexInstance.destroy();
      }
      
}
