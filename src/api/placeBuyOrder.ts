import BuyOrder from "../types/BuyOrder";
import objectToPrettyJSON from "../util/objectToPrettyJSON";
import User from "../types/User";
import { getTextChannel } from "../util/getTextChannel";
import { getAlpacaClient } from "../util/getAlpacaClient";

export const placeBuyOrder = async (params: BuyOrder, user: User) => {
  const { qty, notional, symbol } = params;

  const channel = getTextChannel("882463600629923921");

  try {
    if (!user.activeStocks.includes(symbol)) {
      throw new Error(
        `A buy order was sent for ${symbol} but it is not in your active stocks.`
      );
    }

    const alpacaClient = getAlpacaClient(user);

    const positions = await alpacaClient.getPositions();

    if (positions.some((position) => position.symbol === symbol)) {
      return channel.send(
        `There was an attempt to buy ${symbol} but you already own it!`
      );
    }

    if (qty && notional) {
      throw new Error("Please specify only a quantity or a notional amount!");
    }

    if (!qty && !notional) {
      throw new Error("Please specify either a quantity or a notional amount!");
    }

    const asset = await alpacaClient.getSnapshot({ symbol });
    const latestClosePrice = asset.minuteBar.c;
    const stopLossPrice = latestClosePrice - latestClosePrice * 0.0225;

    const result = await alpacaClient.placeOrder({
      symbol,
      ...(qty && { qty }),
      ...(notional && { notional }),
      side: "buy",
      type: "market",
      time_in_force: "day",
      stop_loss: {
        stop_price: stopLossPrice
      }
    });

    channel.send(`Buy order placed!\n${objectToPrettyJSON(result)}`);
  } catch (err) {
    channel.send(err.message);
  }
};
