import { Cookie } from "@/src/utils/cookie";
import { JWT } from "@/src/utils/jwt";
import axios from "axios";

export const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});

api.interceptors.request.use(
  async (req) => {
    const token = tokens.get();
    const accesToken = token?.access;
    const refreshToken = token?.refresh;
    if (!accesToken || !refreshToken) throw new Error();

    const res = await authServices.refresh(refreshToken);

    console.log("OLD ACCESS", token?.access);
    console.log("OLD ACCESS STATUS IS EXPIRED", jwt.isExpired(token.access));

    console.log("NEW ACCESS", res?.access);
    console.log("OLD ACCESS STATUS IS EXPIRED", jwt.isExpired(res?.access));
    
    return req;
  },
  (err) => err
);

export class AuthServices {
  async login(
    email: string,
    password: string
  ): Promise<{ access: string; refresh: string }> {
    const { data } = await api.post(`/login`, {
      email: email,
      password: password,
    });
    return data;
  }

  async refresh(refresh: string): Promise<{ access: string }> {
    const { data } = await api.post(`/refresh`, {
      refresh: refresh,
    });
    return data;
  }

  async getSomething(access: string): Promise<{ message: string }> {
    const { data } = await api.get(`/task`, {
      headers: {
        ["Authorization"]: `Bearer ${access}`,
      },
    });
    return data;
  }
}

export class TaskServices {
  async get(access: string) {
    const { data } = await api.get<{ message: string }>(`/task`, {
      headers: {
        ["Authorization"]: `Bearer ${access}`,
      },
    });
    return data;
  }
}

const jwt = new JWT();
const tokens = new Cookie("@refresh-token-app");
const authServices = new AuthServices();
