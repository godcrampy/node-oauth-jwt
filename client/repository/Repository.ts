export interface RepositoryResponse {
  status: number;
  body: any;
}

export interface UserDAO {
  name: string;
  email: string;
  token: string;
  auth_provider: string;
}

abstract class Repository {
  baseUrl: string = process.env.BASE_URL || "";
}

export default Repository;
