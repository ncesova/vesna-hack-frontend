import { $api } from "@/api/api-clients";

export interface UserRequestDTO {
  email: string;
  password: string;
  name: string;
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
  static async login(data: Omit<UserRequestDTO, "name">): Promise<number> {
    const response = await $api.post("/user/auth/login", data);
    return response.status;
  }

  static async register(data: UserRequestDTO): Promise<number> {
    const response = await $api.post("/user/auth/register", data);
    return response.status;
  }

  static async getUser(): Promise<UserResponseDTO> {
    const response = await $api.get<UserResponseDTO>("/user/me");
    return response.data;
  }

  static async logout(): Promise<number> {
    const response = await $api.post("/user/auth/logout");
    return response.status;
  }
}
