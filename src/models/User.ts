import mongoose from "mongoose";
import User from "../types/User";

const userSchema = new mongoose.Schema<User>({
  discordId: { type: String, required: true, unique: true },
  alpacaApiKey: { type: String, required: true },
  alpacaSecretKey: { type: String, required: true },
  alpacaPaperTrading: { type: Boolean, required: true },
  createdAt: { type: Date, required: true, default: new Date(Date.now()) }
});

export default mongoose.model<User>("User", userSchema);
