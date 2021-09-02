import { SlashCommandBuilder } from "@discordjs/builders";
import { webhookURL } from "../../config";
import Command from "../../types/Command";
import objectToPrettyJSON from "../util/objectToPrettyJSON";

export const buy: Command = {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Create a buy order for use with TradingView Alerts")
    .addStringOption((option) =>
      option
        .setName("symbol")
        .setDescription("The symbol of the stock you want to buy")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("notional")
        .setDescription("The notional value of the stock you want to buy")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const tradingViewAlertMessage = {
        discordId: interaction.member.user.id,
        action: "BUY",
        symbol: String(interaction.options.get("symbol").value),
        notional: Number(interaction.options.get("notional").value)
      };

      interaction.reply({
        content: `To execute buy orders whenever a TradingView alert fires you must check the "Webhook URL" option and paste in this link: ${webhookURL}\n\nThen paste the code below into the "message" section of the alert. You can change the "Alert name" to whatever you want.\n\n${objectToPrettyJSON(
          tradingViewAlertMessage
        )}`,
        ephemeral: false
      });
    } catch (err) {
      console.error(err);
    }
  }
};
