// import { AlpacaClient } from "@master-chief/alpaca";
import app from "./express";

// const client = new AlpacaClient({
//   credentials: {
//     key: process.env.ALPACA_KEY_ID,
//     secret: process.env.ALPACA_SECRET_KEY,
//     paper: true
//   },
//   rate_limit: true
// });

app.get("/", (_req, res) => {
  res.send("Atomax is functional!");
});

app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    if (!process.env.SECRET) {
      throw new Error(
        "The SECRET environment variable is undefined. Please provide a value."
      );
    }

    if (!data.secret || data.secret !== process.env.SECRET) {
      return res.status(401).send("Unauthorized");
    }

    switch (data.order) {
      case "BUY":
        console.log("BUY");
        break;
      case "SELL":
        console.log("SELL");
        break;
      default:
        console.log("UNKNOWN");
        break;
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});
