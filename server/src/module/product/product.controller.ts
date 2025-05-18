import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/get')
  public async getProduct(){
    try {
      return await this.productService.getProduct()
    } catch (error) {
      
    }
  }
}
