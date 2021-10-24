import { RepositoryResponse } from "../Repository";
import AuthRepository from "./AuthRepository";

class MockAuthRepository extends AuthRepository {
  async signup(): Promise<RepositoryResponse> {
    await new Promise((f) => setTimeout(f, 1000));
    return { status: 201, body: { msg: "User Registered" } };
  }

  async login(email: string): Promise<RepositoryResponse> {
    await new Promise((f) => setTimeout(f, 1000));
    return {
      status: 200,
      body: {
        name: "John Doe",
        email,
        auth_provider: "email",
        token: "abc.pqr.xyz",
      },
    };
  }
  async googleAuth(): Promise<RepositoryResponse> {
    await new Promise((f) => setTimeout(f, 1000));
    return {
      status: 200,
      body: {
        name: "John Doe",
        email: "john@example.com",
        auth_provider: "google",
        token: "abc.pqr.xyz",
      },
    };
  }
}

export default MockAuthRepository;
