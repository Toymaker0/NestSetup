import MoniterModel from "../model/moniter/Moniter";
import productModel from "../model/product/product";
import productAmtModel from "../model/productAmt/productAmt";
import TimeModel from "../model/timeTable/timeTable";
import unitModel from "../model/unit/unit";
import UserModel from "../model/user/user";
import userDefaultData from "./require/Users";



export class SchemaInit {

    constructor() { }

    async schemeTable() {
        //user Table

        try {

            await UserModel.sync({ alter: true });
                await UserModel.bulkCreate(userDefaultData);
            await MoniterModel.sync({ alter: true });
            await productModel.sync({ alter: true });
            await productAmtModel.sync({ alter: true });
            await TimeModel.sync({ alter: true });
            await unitModel.sync({ alter: true });

        } catch (error) {
            console.log("error in creating Table",error);
            
        }
        
    }
}