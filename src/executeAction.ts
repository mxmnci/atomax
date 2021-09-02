import { User } from "./models/User";
import { placeBuyOrder } from "./api/orders";
import { closePosition } from "./api/positions";
import WebhookData from "./types/WebhookData";

const executeAction = (data: WebhookData, user: User) => {
  const { action, qty, notional, symbol } = data;
  switch (action) {
    case "BUY":
      console.log("Placing buy order...");
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
      console.log("Closing position...");
      closePosition({ symbol }, user);
      break;
    default:
      console.error("Unknown order type");
      break;
  }
};

export default executeAction;
