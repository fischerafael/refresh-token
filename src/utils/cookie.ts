import cookie from "js-cookie";

export class Cookie {
  constructor(private key: string = "@test") {}

  set(value: any) {
    cookie.set(this.key, JSON.stringify(value));
  }

  get() {
    try {
      const tokens = cookie.get(this.key);
      if (!tokens) {
        throw new Error("No Token");
      }
      return JSON.parse(tokens);
    } catch (e) {
      return undefined;
    }
  }

  delete() {
    cookie.remove(this.key);
  }
}
