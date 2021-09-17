import { AlpacaClient } from "@master-chief/alpaca";
import User from "../types/User";

export const getAlpacaClient = (user: User): AlpacaClient => {
  const alpacaClient = new AlpacaClient({
    credentials: {
      key: user.alpacaApiKey,
      secret: user.alpacaSecretKey,
      paper: user.alpacaPaperTrading
    },
    rate_limit: true
  });

  return alpacaClient;
};
