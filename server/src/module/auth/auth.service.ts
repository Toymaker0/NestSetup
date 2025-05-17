import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { DbProvider } from 'src/Database/db';
@Injectable()
export class AuthService {

  constructor(private readonly db: DbProvider) { }

  async login(payLoad: any) {
    let query = await this.db
      .getDb()
      .table("Users")
      .select(['userName', 'password', 'firstName', 'lastName', 'roleId', 'isBlock', 'createdAt', 'updatedAt'])
      .whereLike("userName", `%${payLoad.userName}%`)
      .first();

    const auth = await this.comparePasswords(payLoad.password, query.password)
    if (auth) {
      delete query.password
      return query
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
        //    async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        //     return bcrypt.compare(plainPassword, hashedPassword); // Returns true/false
        //   }
      }
    } catch (error) {

    }

  }

  async createAuth(payLoad: any) {
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
