import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DbProvider } from 'src/Database/db';

@Injectable()
export class McrudModel {

    constructor(
        private readonly db: DbProvider,
    ) { }

    create(table, datas, primarykey) {
                
        if (table && datas) {
            return this.db.getDb().table(table).insert(datas).returning(primarykey);
        }
    }


    update(table, datas, condition) {

        if (table && datas) {
            return this.db.getDb().table(table).where(condition).update(datas);
        }
    }


    async read(select: any = "*", table, condition = {}) {
        return this.db.getDb().select(select).from(table).where(condition);
    }

    readAll(select: any, table: string) {
        return this.db.getDb().select(select).from(table);
    }


    async get(select: any = "*", table, condition = null) {
        const result = await this.db.getDb().select(select).from(table).where(condition).first();
        return result ?? false;
    }


    delete(table, condition) {
        return this.db.getDb().from(table).del().where(condition);

    }

    async createBatch(table, datas, chunkSize = 100) {
        // const chunkSize = 100;
        return this.db.getDb().batchInsert(table, datas, chunkSize);
        // return this.db.get().batchInsert(table, datas, chunkSize).returning(primarykey);
    }


    readIn(select: any = "*", table, column, values = []) {
        return this.db.getDb().select(select).from(table).whereIn(column, values);

    }

    deleteBatch(table, ids, primarykey) {
        return this.db.getDb().from(table).whereIn(primarykey, ids).del();
    }

    updateBatch(table, ids, datas, primarykey) {
        return this.db.getDb().from(table).whereIn(primarykey, ids).update(datas);
    }
}
