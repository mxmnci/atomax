import User from "../types/User";

export const listActiveStocks = (user: User) => {
  return `Active stocks: ${
    user.activeStocks.length > 0 ? user.activeStocks.toString() : "none"
  }`;
};
