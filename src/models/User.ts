import mongoose from "mongoose";

export interface User {
  discordId: string;
  alpacaApiKey: string;
  alpacaSecretKey: string;
  alpacaPaperTrading: boolean;
  createdAt: Date;
}

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  alpacaApiKey: { type: String, required: true },
  alpacaSecretKey: { type: String, required: true },
  alpacaPaperTrading: { type: Boolean, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
});

export default mongoose.model("User", userSchema);
