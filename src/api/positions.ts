import { ClosePosition } from "@master-chief/alpaca";
import { alpacaClient } from "../config";

export const closePosition = async (params: ClosePosition) => {
  const { symbol } = params;

  try {
    const result = await alpacaClient.closePosition({
      symbol: symbol
    });

    console.log("Position closed!", result);
  } catch (err) {
    console.error(err);
  }
};
