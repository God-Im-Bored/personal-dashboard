/*

abstraction layer that separates db CRUD methods from a db service implementation

*/

import { User } from "../../entities/user"

export interface UserRepository {
    signup(): Promise<boolean>
    deleteAccount(): Promise<boolean>
    login(): Promise<boolean>
    logout(): Promise<boolean>
}

