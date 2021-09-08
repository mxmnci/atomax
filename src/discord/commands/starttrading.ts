import { SlashCommandBuilder } from "@discordjs/builders";
import { webhookURL } from "../../config";
import Command from "../../types/Command";
import objectToPrettyJSON from "../../util/objectToPrettyJSON";

export const starttrading: Command = {
  data: new SlashCommandBuilder()
    .setName("starttrading")
    .setDescription("Create a webhook that stops trading until resumed.")
    .addStringOption((option) =>
      option
        .setName("symbol")
        .setDescription("The symbol of the stock you want to start trading")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const tradingViewAlertMessage = {
        discordId: interaction.member.user.id,
        action: "START_TRADING",
        symbol: String(interaction.options.get("symbol").value)
      };

      interaction.reply({
        content: `To start trading whenever a TradingView alert fires you must check the "Webhook URL" option and paste in this link: ${webhookURL}\n\nThen paste the code below into the "message" section of the alert. You can change the "Alert name" to whatever you want.\n\n${objectToPrettyJSON(
          tradingViewAlertMessage
        )}`,
        ephemeral: true
      });
    } catch (err) {
      console.error(err);
    }
  }
};
