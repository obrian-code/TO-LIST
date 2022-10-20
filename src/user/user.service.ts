import { Injectable } from "@nestjs/common";

export type User = any;

@Injectable()

export class UserService {


    private readonly users = [
        {

            email: 'test@test.com',
            password: 'test123456789'
        }
    ]



    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.email === username)
    }
}