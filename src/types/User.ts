import mongoose from "mongoose";

export default interface User extends mongoose.Document {
  discordId: string;
  alpacaApiKey: string;
  alpacaSecretKey: string;
  alpacaPaperTrading: boolean;
  createdAt: Date;
  activeStocks: string[];
}
