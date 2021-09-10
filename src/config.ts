import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 5678;
export const alpacaApiKey = process.env.ALPACA_API_KEY || "";
export const alapacaApiSecret = process.env.ALPACA_API_SECRET || "";
export const alpacaPaperTrading =
  process.env.ALPACA_PAPER_TRADING === "true" || false;
export const discordBotToken = process.env.DISCORD_BOT_TOKEN || "";
export const discordBotClientId = process.env.DISCORD_BOT_CLIENT_ID || "";
export const discordBotGuildId = process.env.DISCORD_BOT_GUILD_ID || "";
export const mongoURI = process.env.MONGO_URI || "";
export const webhookURL = process.env.WEBHOOK_URL || "";
