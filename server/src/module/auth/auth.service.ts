import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { DbProvider } from 'src/Database/db';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly db: DbProvider,
    private jwtService: JwtService
  ) { }


  generateToken(payload: any): string {
    console.log(payload);

    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }

  async login(payLoad: any) {

    let query = await this.db
      .getDb()
      .table("Users")
      .select(['userName', 'password', 'firstName', 'lastName', 'roleId', 'isBlock', 'createdAt', 'updatedAt'])
      .whereLike("userName", `%${payLoad.userName}%`)
      .first();
        console.log(query);

    const auth = await this.comparePasswords(payLoad.password, query.password)
    
    if (auth) {
      delete query.password
      const userData = this.generateToken({ ...query })
      return { auth: true, userData }
    }
    else {
      return { auth: false }
    }
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword); // Returns true/false
  }

  async handlePassword(payLoad: any) {
    try {
      if (payLoad?.password == payLoad?.confirmPass) {
        const password = payLoad.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        payLoad.password = hash
        delete payLoad.confirmPass
        return payLoad
      }
    } catch (error) {

    }

  }
}
