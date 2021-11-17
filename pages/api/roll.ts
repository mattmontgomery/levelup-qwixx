import { NextApiRequest, NextApiResponse } from "next";

import Pusher from "pusher";
import { Game } from "../../app/lib/game";
export default async function Roll(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (
    !(
      process.env.PUSHER_APP_ID &&
      process.env.PUSHER_APP_KEY &&
      process.env.PUSHER_APP_SECRET &&
      process.env.PUSHER_APP_CLUSTER
    )
  ) {
    res.status(500);
    return;
  }
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
  });
  await pusher.trigger("levelup", "roll", {
    message: Game.rollDice(),
  });
  res.json({
    ok: 1,
  });
}
