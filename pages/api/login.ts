// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method === "POST") {
    const { email, password } = body;

    if (email === "test@gmail.com" && password === "test") {
      return res.status(200).json(createAccessAndRefreshToken());
    }

    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(405).json({ message: "Not Implemented" });
}

export const createAccessAndRefreshToken = () => {
  const access = createAccessToken("test@gmail.com", "test");
  const refresh = createRefresh("test@gmail.com");
  return { access, refresh };
};

const createAccessToken = (
  email: string,
  password: string,
  expiresIn: string = "10s"
) => {
  const token = jwt.sign(
    {
      email,
      password,
    },
    "secret",
    {
      expiresIn: expiresIn,
    }
  );
  return token;
};

const createRefresh = (email: string) => {
  const token = jwt.sign(
    {
      email,
    },
    "secret",
    {
      expiresIn: "1d",
    }
  );
  return token;
};
