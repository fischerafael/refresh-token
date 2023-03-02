// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { createAccessAndRefreshToken } from "./login";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method === "POST") {
    const { refresh } = body;

    try {
      verifyToken(refresh);
      const accessAndRefresh = createAccessAndRefreshToken();
      return res.status(200).json({
        access: accessAndRefresh.access,
      });
    } catch (e) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  return res.status(405).json({ message: "Not Implemented" });
}

const verifyToken = (token: string) => {
  const verified = jwt.verify(token, "secret");
  return verified;
};
