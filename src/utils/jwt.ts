// @ts-ignore
import { isJwtExpired } from "jwt-check-expiration";

export class JWT {
  isExpired(token: string) {
    return isJwtExpired(token);
  }
}
