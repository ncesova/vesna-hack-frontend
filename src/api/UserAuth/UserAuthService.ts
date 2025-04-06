import { $api, removeTokens, setTokens } from "@/api/api-clients";

export interface UserRequestDTO {
  email: string;
  password: string;
  name: string;
}

export interface TokenResponseDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserResponseDTO {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  initials: string;
}

export default class UserAuthService {
  static async login(data: Omit<UserRequestDTO, "name">): Promise<void> {
    const response = await $api.post<TokenResponseDTO>("/user/auth/login", data);
    const { accessToken, refreshToken } = response.data;
    setTokens(accessToken, refreshToken);
  }

  static async register(data: UserRequestDTO): Promise<void> {
    const response = await $api.post<TokenResponseDTO>("/user/auth/register", data);
    const { accessToken, refreshToken } = response.data;
    setTokens(accessToken, refreshToken);
  }

  static async refreshToken(refreshToken: string): Promise<TokenResponseDTO> {
    const response = await $api.post<TokenResponseDTO>("/user/auth/refresh", { refreshToken });
    const tokens = response.data;
    setTokens(tokens.accessToken, tokens.refreshToken);
    return tokens;
  }

  static async getUser(): Promise<UserResponseDTO> {
    const response = await $api.get<UserResponseDTO>("/user/me");
    return response.data;
  }

  static async logout(): Promise<void> {
    await $api.post("/user/auth/logout");
    removeTokens();
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  }
}
