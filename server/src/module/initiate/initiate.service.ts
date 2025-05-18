import { Injectable } from '@nestjs/common';
import { McrudModel } from "src/module/cmn/mcrudModel";
import MoniterModel from '../Initiate-module/model/moniter/Moniter';
import productModel from '../Initiate-module/model/product/product';
import productAmtModel from '../Initiate-module/model/productAmt/productAmt';
import TimeModel from '../Initiate-module/model/timeTable/timeTable';
import unitModel from '../Initiate-module/model/unit/unit';
import UserModel from '../Initiate-module/model/user/user';
import userDefaultData from '../Initiate-module/seedData/Users';

@Injectable()
export class InitiateService {
    constructor(private mcrud: McrudModel) { }

    async schemeTable() {
        //user Table

        try {

            await UserModel.sync({ alter: true });
           // let user = await this.mcrud.readAll(['userName'], 'Users')
            await UserModel.bulkCreate(userDefaultData);

            await MoniterModel.sync({ alter: true });
            await productModel.sync({ alter: true });
            await productAmtModel.sync({ alter: true });
            await TimeModel.sync({ alter: true });
            await unitModel.sync({ alter: true });

        } catch (error) {
            console.log("error in creating Table", error);

        }

    }
}
