import { NextApiRequest, NextApiResponse } from "next";

export default async function Roll(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  res.json({
    ok: 1,
  });
}
