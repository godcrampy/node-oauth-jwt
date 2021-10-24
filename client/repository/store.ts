import ApiAuthRepository from "./auth/ApiAuthRepository";
import AuthRepository from "./auth/AuthRepository";

export const authRepository: AuthRepository = new ApiAuthRepository();
