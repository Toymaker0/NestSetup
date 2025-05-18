import { Injectable } from '@nestjs/common';
import { DbProvider } from 'src/Database/db';

@Injectable()
export class UserService {

    constructor(
        private readonly db: DbProvider,

    ) { }

    async createUser(payLoad: any) {
        try {
            const query = await this.db
                .getDb()
                .table("Users")
                .insert(payLoad)
                .returning('id')
            return await query
        } catch (error) {
            console.log(error);

        }
    }
}
