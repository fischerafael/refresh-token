import cookie from "js-cookie";

export class Cookie {
  constructor(private key: string = "@test") {}

  set(value: any) {
    cookie.set(this.key, JSON.stringify(value));
  }

  get() {
    try {
      return JSON.parse(cookie.get(this.key));
    } catch (e) {
      return undefined;
    }
  }

  delete() {
    cookie.remove(this.key);
  }
}
