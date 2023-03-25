import { User } from '../../../entities/user'

export interface Login {
    execute(email:String, password:String): Promise<User>
}