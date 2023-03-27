// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export const adminPermission = [
  {
    action: ["C", "R", "U", "D"],
    subject: "home"
  },
  {
    action: ["C", "R", "U", "D"],
    subject: "article-manager"
  },
  {
    action: ["C", "R", "U", "D"],
    subject: "admin-manager"
  },
];

export const memberPermission = [
  {
    action: ["C", "R"],
    subject: "home"
  },
  {
    action: ["C", "R", "U"],
    subject: "article-manager"
  },
  {
    action: ["R"],
    subject: "admin-manager"
  },
  {
    action: ["U"],
    subject: "test-update",
    conditions: { authorId: 1 },
    fields: ["title", "content"]
  }
];

export type ILoginResponse = {
  success: boolean,
  data?: any;
  message?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILoginResponse>
) {
  const { username, password } = JSON.parse(req.body);
  const HTTPMethod = req.method;

  // 判斷請求種類
  switch (HTTPMethod) {
  case "POST":
    if ((username !== "admin" && username !== "member") || password !== "password") {
      res.status(200).json({
        success: false,
        message: "account or password incorrect"
      });
      return;
    }
    // 依照不同的 Username 給予權限
    res.status(200).json({
      success: true,
      data: {
        jwt: "fakeJwtToken",
        account: username,
        permission: username === "admin" ? adminPermission : memberPermission
      }
    });
    break;
  default:
    res.status(200).json({
      success: false,
      data: null
    });
    break;
  }
}
