import app from "./express";
import { placeBuyOrder } from "./api/orders";
import { closePosition } from "./api/positions";
import isWebhookSecretValid from "./util/isWebhookSecretValid";

app.post("/webhook", async (req, res) => {
  try {
    const { order, secret, qty, notional, symbol } = req.body;

    if (!isWebhookSecretValid(secret)) {
      return res.status(401).send("Invalid secret!");
    }

    switch (order) {
      case "BUY":
        console.log("Placing buy order...");
        placeBuyOrder({
          qty,
          notional,
          symbol
        });
        break;
      case "SELL":
        console.log("Closing position...");
        closePosition({ symbol });
        break;
      default:
        console.error("Unknown order type");
        break;
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});
