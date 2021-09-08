import { SlashCommandBuilder } from "@discordjs/builders";
import Command from "../../types/Command";

export const start: Command = {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Learn how to start trading with Atomax"),
  async execute(interaction) {
    try {
      interaction.reply({
        content:
          "To begin trading you are going to need a few things. \n\nFirst go to https://alpaca.markets and get your API Key as well as your API Secret. \n\nSecond, go to https://tradingview.com and create an account. Sign up for the free trial or pay for the $15/mo premium version. Find a stock/coin that you want and head over to indicators and choose Supertrend by KivancOzbilgic. After that, setup two alerts. One for Supertrend Buy and one for Supertrend Sell. When you are ready, use my /setup command to begin the setup process.",
        ephemeral: true
      });
    } catch (err) {
      console.error(err);
    }
  }
};
