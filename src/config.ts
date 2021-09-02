import { AlpacaClient } from "@master-chief/alpaca";
import dotenv from "dotenv";

dotenv.config();

export const webhookSecret = process.env.WEBHOOK_SECRET || "";
export const port = process.env.PORT || 5678;
export const alpacaApiKey = process.env.ALPACA_API_KEY || "";
export const alapacaApiSecret = process.env.ALPACA_API_SECRET || "";
export const alpacaPaperTrading =
  process.env.ALPACA_PAPER_TRADING === "true" || false;

export const alpacaClient = new AlpacaClient({
  credentials: {
    key: alpacaApiKey,
    secret: alapacaApiSecret,
    paper: alpacaPaperTrading
  },
  rate_limit: true
});
