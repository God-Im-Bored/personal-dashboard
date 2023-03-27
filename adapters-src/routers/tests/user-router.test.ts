import request from "supertest";
import { User } from "../../../business-src/entities";
import { Signup } from "../../../business-src/interfaces/useCases/user/user-signup";
import { Login } from "../../../business-src/interfaces/useCases/user/user-login";
import { Logout } from "../../../business-src/interfaces/useCases/user/user-logout";
import { DeleteAccount } from "../../../business-src/interfaces/useCases/user/user-delete-account";
import UserRouter from "../user-router";
import server from "./test-server";

class MockUserSignUpUseCase implements Signup {
  //   verifyAuth(email: String, password: String): Promise<boolean> {
  //     throw new Error("Authorization method not implemented");
  //   }
  execute(email: String, password: String): Promise<boolean> {
    throw new Error("Execute method not implemented");
  }
}

class MockUserLoginUseCase implements Login {
  execute(email: String, password: String): Promise<User> {
    throw new Error("Execute method not implemented");
  }
}

class MockUserLogoutUseCase implements Logout {
  execute(email: String, password: String): Promise<boolean> {
    throw new Error("Execute method not implemented");
  }
}

class MockUserDeleteAccountUseCase implements DeleteAccount {
  execute(): Promise<boolean> {
    throw new Error("Execute method not implemented");
  }
}

describe("User Router", () => {
  let mockUserSignUpUseCase: MockUserSignUpUseCase;
  let mockUserLoginUseCase: MockUserLoginUseCase;
  let mockUserLogoutUseCase: MockUserLogoutUseCase;
  let mockUserDeleteAccountUseCase: MockUserDeleteAccountUseCase;
  const userData = {
    id: "1",
    email: "john_doe@gmail.com",
    password: "123456",
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    birthday: "940101",
    isAdmin: false,
    createdAt: null,
  };

  beforeAll(() => {
    mockUserSignUpUseCase = new MockUserSignUpUseCase();
    mockUserLoginUseCase = new MockUserLoginUseCase();
    mockUserLogoutUseCase = new MockUserLogoutUseCase();
    mockUserDeleteAccountUseCase = new MockUserDeleteAccountUseCase();

    server.use(
      "/api",
      UserRouter(
        mockUserSignUpUseCase,
        mockUserLogoutUseCase,
        mockUserLoginUseCase,
        mockUserDeleteAccountUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("User signs up [creates an account]", () => {
    test("successful POST /signup returns 201 for new user signup usecase", async () => {
      jest
        .spyOn(mockUserSignUpUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).post("/api/signup").send(userData);
      expect(response.status).toBe(201);
    });
    test("unsuccessful POST /signup returns 500 for new user signup use-case", async () => {
      jest
        .spyOn(mockUserSignUpUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

        const response = await request(server).post("/api/signup").send(userData)
        expect(response.status).toBe(500)
    });
  });

  describe("User logs into account", () => {
    test("successful GET /login returns 200 and user object for user login use-case", async () => {
        jest.spyOn(mockUserLoginUseCase, "execute").mockImplementation(() => Promise.resolve(userData))

        const response = await request(server).get("/api/login").send(userData)
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual(userData)
    })
    test("unsuccessful GET /login returns 500 and error message for user login use-case", async () => {
        jest.spyOn(mockUserLoginUseCase, "execute").mockImplementation(() => Promise.reject(Error()))

        const response = await request(server).get("/api/login").send(userData)

        expect(response.status).toBe(500)
        expect(response.body).toEqual({ message: "Error fetching data." })
    })
  })
});
