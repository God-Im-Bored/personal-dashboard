import { UserRepository } from "../../interfaces/data-access/user.data-access"
import { Signup } from "../../interfaces/useCases/user/index"

export class UserSignup implements Signup {
    userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(email: String, password: String): Promise<boolean> {
        const response = await this.userRepository.signup(email, password)
        return response;
    }
}