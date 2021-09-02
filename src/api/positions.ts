import { AlpacaClient, ClosePosition } from "@master-chief/alpaca";
import { User } from "../models/User";

export const closePosition = async (params: ClosePosition, user: User) => {
  const { symbol } = params;

  try {
    const alpacaClient = new AlpacaClient({
      credentials: {
        key: user.alpacaApiKey,
        secret: user.alpacaSecretKey,
        paper: user.alpacaPaperTrading
      },
      rate_limit: true
    });

    const result = await alpacaClient.closePosition({
      symbol
    });

    console.log("Position closed!", result);
  } catch (err) {
    console.error(err);
  }
};
