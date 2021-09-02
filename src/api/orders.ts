import { AlpacaClient } from "@master-chief/alpaca";
import { User } from "../models/User";
import BuyOrder from "../types/BuyOrder";

export const placeBuyOrder = async (params: BuyOrder, user: User) => {
  const { qty, notional, symbol } = params;

  try {
    const alpacaClient = new AlpacaClient({
      credentials: {
        key: user.alpacaApiKey,
        secret: user.alpacaSecretKey,
        paper: user.alpacaPaperTrading
      },
      rate_limit: true
    });

    if (qty && notional) {
      throw new Error("Please specify only a quantity or a notional amount!");
    }

    if (!qty && !notional) {
      throw new Error("Please specify either a quantity or a notional amount!");
    }

    const result = await alpacaClient.placeOrder({
      symbol,
      ...(qty && { qty }),
      ...(notional && { notional }),
      side: "buy",
      type: "market",
      time_in_force: "day"
    });

    console.log("Order placed!", result);
  } catch (err) {
    console.error(err);
  }
};
