import { Sign } from "crypto";
import request from "supertest";
import { User } from "../../../business-src/entities";
import { Signup } from "../../../business-src/interfaces/useCases/user/user-signup";
import { Login } from "../../../business-src/interfaces/useCases/user/user-login";
import { Logout } from "../../../business-src/interfaces/useCases/user/user-logout";
import { DeleteAccount } from "../../../business-src/interfaces/useCases/user/user-delete-account";
import UserRouter from "../user-router";
import server from "./test-server";

class MockUserSignUpUseCase implements Signup {
  verifyAuth(email: String, password: String): Promise<boolean> {
    throw new Error("Authorization method not implemented");
  }
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
    test("POST /api/signup verifyAuth()", async () => {
      const userData = {
        id: "1",
        email: "john_doe@gmail.com",
        password: "123456",
        firstName: "John",
        lastName: "Doe",
        getFullName: "John Doe",
        birthday: "940101",
        isAdmin: false,
        createdAt: null,
      };


      jest
        .spyOn(mockUserSignUpUseCase, "verifyAuth")
        .mockImplementation(() => {
            throw new Error()
        });

      const response = await request(server).post("/api/signup").send(userData);
      expect(response.status).toBe(200);
    });

    test("POST /api/signup execute()", async () => {
      const userData = {
        id: "1",
        email: "john_doe@gmail.com",
        password: "123456",
        firstName: "John",
        lastName: "Doe",
        getFullName: "John Doe",
        birthday: "940101",
        isAdmin: false,
        createdAt: null,
      };

      jest
        .spyOn(mockUserSignUpUseCase, "execute")
        .mockImplementation(() => Promise.reject('error'));

      const response = await request(server).post("/api/signup").send(userData);
      expect(response.status).toBe(201);
    });
  });
});
