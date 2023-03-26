import express, { Request, Response } from "express";
import {
  DeleteAccount,
  Login,
  Logout,
  Signup,
} from "../../business-src/interfaces/useCases/user";

export default function UserRouter(
  signupUseCase: Signup,
  logoutUseCase: Logout,
  loginUseCase: Login,
  deleteAccountUseCase: DeleteAccount
) {
  const router = express.Router();

  // implement a method(s) that'll create, check and delete token from sessions

  router.post("/signup", async (req: Request, res: Response) => {
    if (!(await signupUseCase.verifyAuth(req.body.email, req.body.password))) {
      res.status(400).send({
        message: "Data entry not valid. Try again.",
      });
    } else {
      return res.status(200);
    }

    try {
      console.log(req.body.email, req.body.password);
      await signupUseCase.execute(req.body.email, req.body.password);
      res.statusCode = 201;
      res.json({ message: "New user account created." });
    } catch (err) {
      return res.status(500).json({ message: "Error saving data." });
    }
  });

  router.get("/login", async (req: Request, res: Response) => {
    try {
      const user = await loginUseCase.execute(
        req.body.email,
        req.body.password
      );

      // req.session.id = user.id
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send({ message: "Error fetching data" });
    }
  });

  router.post("/logout", async (req: Request, res: Response) => {
    try {
      await logoutUseCase.execute(req.body.email, req.body.password);
      // req.logout()
      // req.session.destroy()
      // res.sendStatus(204)
    } catch (err) {
      res.status(500).send({ message: "Error saving data." });
    }
  });

  return router;
}

module.exports = UserRouter;
