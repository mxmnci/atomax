import { AlpacaClient } from "@master-chief/alpaca";
import app from "./express";

const client = new AlpacaClient({
  credentials: {
    key: process.env.ALPACA_KEY_ID,
    secret: process.env.ALPACA_SECRET_KEY,
    paper: true
  },
  rate_limit: true
});

app.get("/", (_req, res) => {
  res.send("Atomax is functional!");
});

app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    if (data.secret !== process.env.SECRET) {
      return res.status(401).send("Unauthorized");
    }

    const account = await client.getAccount();

    console.log(account);

    return res.status(200).json(account);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});
