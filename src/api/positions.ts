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

    const positions = await alpacaClient.getPositions();

    if (!positions.some((position) => position.symbol === symbol)) {
      return channel.send(
        `TradingView indicated a Sell but you do not have any positions for ${symbol}. This is normal if you just bought into a stock.`
      );
    }

    const result = await alpacaClient.closePosition({
      symbol
    });

    channel.send(`Position closed!\n${objectToPrettyJSON(result)}`);
  } catch (err) {
    console.error(err);
  }
};
