import Repository, { RepositoryResponse } from "../Repository";

abstract class AuthRepository extends Repository {
  abstract signup(
    name: string,
    email: string,
    password: string
  ): Promise<RepositoryResponse>;

  abstract login(name: string, password: string): Promise<RepositoryResponse>;

  abstract googleAuth(tokenId: string): Promise<RepositoryResponse>;
}

export default AuthRepository;
