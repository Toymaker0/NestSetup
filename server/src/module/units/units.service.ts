import { Injectable } from '@nestjs/common';
import { DbProvider } from 'src/Database/db';
import { McrudModel } from '../cmn/mcrudModel';

@Injectable()
export class UnitsService {

    constructor(
        private readonly db: DbProvider,
        private readonly mcrud:McrudModel

    ){}

    public async getUnits(){
        try {
            const query = await this.mcrud.read(['id','unitName'],'Units',{isBlock:0})
            return await query

        } catch (error) {
            throw error
        }
    }
}
