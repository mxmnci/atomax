import { AlpacaClient } from "@master-chief/alpaca";
import User from "../models/User";

const discordIdToAlpacaClient = async (discordId: string) => {
  try {
    const user = await User.findOne({ discordId });

    const alpacaClient = new AlpacaClient({
      credentials: {
        key: user.alpacaApiKey,
        secret: user.alpacaSecretKey,
        paper: user.alpacaPaperTrading
      },
      rate_limit: true
    });

    return alpacaClient;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default discordIdToAlpacaClient;
