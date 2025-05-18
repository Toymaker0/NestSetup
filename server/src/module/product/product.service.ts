import { Injectable } from '@nestjs/common';
import { McrudModel } from '../cmn/mcrudModel';

@Injectable()
export class ProductService {
    constructor(
        private mcrud: McrudModel
    ) { }

    public async getProduct() {
        try {
            let products = await this.mcrud.read(['id', 'prodName', 'unitId'], 'products', { isValid: 1 })
            console.log(products);
            return products

        } catch (error) {
            console.log(error);

        }
    }

}