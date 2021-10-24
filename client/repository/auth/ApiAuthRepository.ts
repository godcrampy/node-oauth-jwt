import { RepositoryResponse } from "../Repository";
import AuthRepository from "./AuthRepository";

class ApiAuthRepository extends AuthRepository {
  async signup(
    name: string,
    email: string,
    password: string
  ): Promise<RepositoryResponse> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = { name, email, password };

    const requestOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };
    const res = await fetch(`${this.baseUrl}/api/auth/signup`, requestOptions);
    const status = res.status;
    const json = await res.json();

    return { status, body: json };
  }

  async login(email: string, password: string): Promise<RepositoryResponse> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = { email, password };

    const requestOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };
    const res = await fetch(`${this.baseUrl}/api/auth/login`, requestOptions);
    const status = res.status;
    const json = await res.json();

    return { status, body: json };
  }
}

export default ApiAuthRepository;
