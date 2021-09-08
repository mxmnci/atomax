import User from "../types/User";
import WebhookData from "../types/WebhookData";
import { getAlpacaClient } from "../util/getAlpacaClient";
import { getTextChannel } from "../util/getTextChannel";
import { listActiveStocks } from "../util/listActiveStocks";

export const stopTrading = async (data: WebhookData, user: User) => {
  const channel = getTextChannel("882463600629923921");

  try {
    if (!data.symbol) {
      throw new Error("No symbol provided");
    }

    if (!user.activeStocks.includes(data.symbol)) {
      throw new Error(
        `The symbol ${data.symbol} is not in your active stocks!`
      );
    }

    const alpacaClient = getAlpacaClient(user);
    const currentPostions = await alpacaClient.getPositions();

    const stockIndex = user.activeStocks.indexOf(data.symbol);
    user.activeStocks.splice(stockIndex, 1);
    const savedUser = await user.save();

    if (currentPostions.some((position) => position.symbol === data.symbol)) {
      await alpacaClient.closePosition({ symbol: data.symbol });
      return channel.send(
        `Position for ${
          data.symbol
        } has been closed and it has been removed from your active stocks.\n\n Active stocks: ${listActiveStocks(
          savedUser
        )}`
      );
    }

    return channel.send(listActiveStocks(savedUser));
  } catch (err) {
    console.error(err);
    channel.send(`Something went wrong ${err.message}`);
  }
};
