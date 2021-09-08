import { SlashCommandBuilder } from "@discordjs/builders";
import { AlpacaClient } from "@master-chief/alpaca";
import User from "../../models/User";
import Command from "../../types/Command";

export const setup: Command = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Create a connection between Alpaca and Discord")
    .addStringOption((option) =>
      option
        .setName("apikey")
        .setDescription("Your Alpaca API key")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("apisecret")
        .setDescription("Your Alpaca API secret")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("papertrading")
        .setDescription("Would your like to use paper trading?")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const APIKEY = String(interaction.options.get("apikey").value);
      const APISECRET = String(interaction.options.get("apisecret").value);
      const PAPERTRADING = Boolean(
        interaction.options.get("papertrading").value
      );

      const alpacaClient = new AlpacaClient({
        credentials: {
          key: APIKEY,
          secret: APISECRET,
          paper: PAPERTRADING
        },
        rate_limit: true
      });

      const account = await alpacaClient.getAccount();

      const existingUser = await User.findOne({
        discordId: interaction.member.user.id
      });

      if (existingUser) {
        existingUser.alpacaApiKey = APIKEY;
        existingUser.alpacaSecretKey = APISECRET;
        existingUser.alpacaPaperTrading = PAPERTRADING;
        await existingUser.save();
        return interaction.reply({
          content: `Your Alpaca credentials have been updated!\n\nBuying power: $${account.buying_power}\nEquity: $${account.equity}\nPaper trading: ${PAPERTRADING}`,
          ephemeral: true
        });
      }

      const user = new User({
        discordId: interaction.member.user.id,
        alpacaApiKey: APIKEY,
        alpacaSecretKey: APISECRET,
        alpacaPaperTrading: PAPERTRADING
      });

      await user.save();

      return interaction.reply({
        content: `Your Alpaca credentials have been linked to your Discord account!\n\nBuying power: $${account.buying_power}\nEquity: $${account.equity}\nPaper trading: ${PAPERTRADING}`,
        ephemeral: true
      });
    } catch (err) {
      console.error(err);
      interaction.reply({
        content: `Something went wrong`,
        ephemeral: true
      });
    }
  }
};
