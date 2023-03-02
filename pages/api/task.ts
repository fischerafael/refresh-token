// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers } = req;

  const authorization = headers.authorization;
  const [_, token] = authorization?.split(" ")!;

  try {
    const isVerified = verifyToken(token);
    console.log(isVerified);

    return res.status(200).json({ message: "Ok" });
  } catch (e: any) {
    return res.status(401).json({ message: "token_expired" });
  }
}

const verifyToken = (token: string) => {
  const verified = jwt.verify(token, "secret");
  return verified;
};
