// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { adminPermission, memberPermission, ILoginResponse } from "@/pages/api/login";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILoginResponse>
) {
  const { account, jwtToken } = JSON.parse(req.body);
  const HTTPMethod = req.method;

  // 判斷請求種類
  switch (HTTPMethod) {
  case "POST":
    if ((account !== "admin" && account !== "member") || jwtToken !== "fakeJwtToken") {
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
        jwt: jwtToken,
        account,
        permission: account === "admin" ? adminPermission : memberPermission
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
