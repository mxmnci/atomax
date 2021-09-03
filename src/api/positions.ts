import { AlpacaClient, ClosePosition } from "@master-chief/alpaca";
import { TextChannel } from "discord.js";
import { User } from "../models/User";
import discordBot from "../discord/bot";
import objectToPrettyJSON from "../util/objectToPrettyJSON";

export const closePosition = async (params: ClosePosition, user: User) => {
  const { symbol } = params;

  const channel = discordBot.channels.cache.get("882463600629923921");

  if (!(channel instanceof TextChannel)) {
    return console.error("Not a text channel!");
  }

  try {
    const alpacaClient = new AlpacaClient({
      credentials: {
        key: user.alpacaApiKey,
        secret: user.alpacaSecretKey,
        paper: user.alpacaPaperTrading
      },
      rate_limit: true
    });

    const result = await alpacaClient.closePosition({
      symbol
    });

    channel.send(`Position closed!\n${objectToPrettyJSON(result)}`);
  } catch (err) {
    console.error(err);
  }
};
