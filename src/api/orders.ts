import { alpacaClient } from "../config";
import BuyOrder from "../types/BuyOrder";

export const placeBuyOrder = async (params: BuyOrder) => {
  const { qty, notional, symbol } = params;

  try {
    if (qty && notional) {
      throw new Error("Please specify only a quantity or a notional amount!");
    }

    if (!qty && !notional) {
      throw new Error("Please specify either a quantity or a notional amount!");
    }

    const result = await alpacaClient.placeOrder({
      symbol: symbol,
      ...(qty && { qty: qty }),
      ...(notional && { notional: notional }),
      side: "buy",
      type: "market",
      time_in_force: "day"
    });

    console.log("Order placed!", result);
  } catch (err) {
    console.error(err);
  }
};
