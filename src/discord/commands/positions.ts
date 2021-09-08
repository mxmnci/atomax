import { SlashCommandBuilder } from "@discordjs/builders";
import { AlpacaClient } from "@master-chief/alpaca";
import User from "../../models/User";
import Command from "../../types/Command";
import objectToPrettyJSON from "../../util/objectToPrettyJSON";

export const positions: Command = {
  data: new SlashCommandBuilder()
    .setName("positions")
    .setDescription("List your Alpaca account's current positions"),
  async execute(interaction) {
    try {
      const user = await User.findOne({
        discordId: interaction.member.user.id
      });

      if (!user) {
        return interaction.reply("User not initialized!");
      }

      const alpacaClient = new AlpacaClient({
        credentials: {
          key: user.alpacaApiKey,
          secret: user.alpacaSecretKey,
          paper: user.alpacaPaperTrading
        },
        rate_limit: true
      });

      const positions = await alpacaClient.getPositions();

      interaction.reply({
        content: `Positions: \n${objectToPrettyJSON(positions)}`,
        ephemeral: true
      });
    } catch (err) {
      console.error(err);
    }
  }
};
