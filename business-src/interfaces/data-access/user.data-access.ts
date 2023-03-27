/*

abstraction layer that separates db CRUD methods from a db service implementation

*/

import { User } from "../../entities/user"

export interface UserRepository {
    // verifyAuth(email:String, password:String): Promise<boolean>
    signup(email:String, password:String): Promise<boolean>
    deleteAccount(email:String, password:String): Promise<boolean>
    login(email:String, password:String): Promise<User>
    logout(email:String, password:String): Promise<boolean>
}

