import axios from "axios";

export const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});

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
