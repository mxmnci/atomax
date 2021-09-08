import User from "../types/User";
import WebhookData from "../types/WebhookData";
import { getTextChannel } from "../util/getTextChannel";
import { listActiveStocks } from "../util/listActiveStocks";

export const startTrading = async (data: WebhookData, user: User) => {
  const channel = getTextChannel("882463600629923921");

  try {
    if (!data.symbol) {
      throw new Error("No symbol provided");
    }

    if (user.activeStocks.includes(data.symbol)) {
      throw new Error(
        `This symbol ${data.symbol} has already been added to your active stocks!`
      );
    }

    user.activeStocks.push(data.symbol);
    const savedUser = await user.save();

    channel.send(listActiveStocks(savedUser));
  } catch (err) {
    console.error(err);
    channel.send(`Something went wrong ${err.message}`);
  }
};
