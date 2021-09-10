import { SlashCommandBuilder } from "@discordjs/builders";
import User from "../../models/User";
import Command from "../../types/Command";
import { listActiveStocks } from "../../util/listActiveStocks";

export const activatestock: Command = {
  data: new SlashCommandBuilder()
    .setName("activatestock")
    .setDescription("Add a stock to the active stock list.")
    .addStringOption((option) =>
      option
        .setName("symbol")
        .setDescription("The symbol of the stock you want to activate")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const symbol = String(interaction.options.get("symbol").value);

      const user = await User.findOne({
        discordId: interaction.member.user.id
      });

      if (!symbol) {
        throw new Error("No symbol provided");
      }

      if (user.activeStocks.includes(symbol)) {
        throw new Error(
          `This symbol ${symbol} has already been added to your active stocks!`
        );
      }

      user.activeStocks.push(symbol);
      const savedUser = await user.save();

      interaction.reply({
        content: listActiveStocks(savedUser),
        ephemeral: false
      });
    } catch (err) {
      interaction.reply(err.message);
    }
  }
};
