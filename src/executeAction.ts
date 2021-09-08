import { placeBuyOrder } from "./api/placeBuyOrder";
import { closePosition } from "./api/closePosition";
import User from "./types/User";
import WebhookData from "./types/WebhookData";
import { startTrading } from "./api/startTrading";
import { stopTrading } from "./api/stopTrading";

const executeAction = (data: WebhookData, user: User) => {
  const { action, qty, notional, symbol } = data;
  try {
    switch (action) {
      case "START_TRADING":
        console.log(`Starting trading ${data.symbol}...`);
        startTrading(data, user);
        break;
      case "STOP_TRADING":
        console.log(`Stopping trading for ${data.symbol}...`);
        stopTrading(data, user);
        break;
      case "BUY":
        console.log(`Placing buy order for ${data.symbol}...`);
        placeBuyOrder(
          {
            qty,
            notional,
            symbol
          },
          user
        );
        break;
      case "SELL":
        console.log(`Closing position for ${data.symbol}...`);
        closePosition({ symbol }, user);
        break;
      default:
        console.error("Unknown order type");
        break;
    }
  } catch (err) {
    console.error(err);
  }
};

export default executeAction;
