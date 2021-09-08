import { ClosePosition } from "@master-chief/alpaca";
import User from "../types/User";
import { getAlpacaClient } from "../util/getAlpacaClient";
import { getTextChannel } from "../util/getTextChannel";
import objectToPrettyJSON from "../util/objectToPrettyJSON";

export const closePosition = async (params: ClosePosition, user: User) => {
  const { symbol } = params;

  const channel = getTextChannel("882463600629923921");

  try {
    if (!user.activeStocks.includes(symbol)) {
      throw new Error(
        `A sell order was sent for ${symbol} but it is not in your active stocks.`
      );
    }

    const alpacaClient = getAlpacaClient(user);

    const positions = await alpacaClient.getPositions();

    if (!positions.some((position) => position.symbol === symbol)) {
      return channel.send(
        `TradingView indicated a Sell but you do not have any positions for ${symbol}. This is normal if you just started watching a stock with Atomax.`
      );
    }

    const result = await alpacaClient.closePosition({
      symbol
    });

    channel.send(`Position closed!\n${objectToPrettyJSON(result)}`);
  } catch (err) {
    channel.send(err.message);
  }
};
