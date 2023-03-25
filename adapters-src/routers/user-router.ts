import express, { Request, Response, Error } from "express"
import { DeleteAccount, Login, Logout, Signup } from "../../business-src/interfaces/useCases/user"

export default function UserRouter(
    signupUseCase: Signup,
    logoutUseCase: Logout,
    loginUseCase: Login,
    deleteAccountUseCase: DeleteAccount
) {
    const router = express.Router()

    // implement a method(s) that'll create, check and delete token from sessions

    router.post('/signup', async (req: Request, res: Response) => {
        try {
            await signupUseCase.verifyAuth(req.body.email, req.body.password)
            res.statusCode = 200
            res.json({ message: "Account authentication was successful." })
        } catch (err) {
            res.status(500).send({ message: "Error verifying authentication. "})
        }

        try {
            await signupUseCase.execute(req.body.email, req.body.password)
            res.statusCode = 201
            res.json({ message: "New user account created." })
        } catch (err) {
            res.status(500).send({ message: "Error saving data. "})
        }
    })

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const user = await loginUseCase.execute(req.body.email, req.body.password)

            res.status(200).send(user)
        } catch (err: Error) {
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    
    router.post('/', async (req: Request, res: Response) => {
        try {
            await logoutUseCase.execute(req.body.email, req.body.password)
            
        } catch (err) {
            res.status(500).send({ message: "Error saving data." })
        }
    })
}