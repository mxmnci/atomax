import { SlashCommandBuilder } from "@discordjs/builders";
import User from "../../models/User";
import Command from "../../types/Command";
import { listActiveStocks } from "../../util/listActiveStocks";

export const activestocks: Command = {
  data: new SlashCommandBuilder()
    .setName("activestocks")
    .setDescription("List your active stocks"),
  async execute(interaction) {
    try {
      const user = await User.findOne({
        discordId: interaction.member.user.id
      });

      return interaction.reply({
        content: listActiveStocks(user),
        ephemeral: false
      });
    } catch (err) {
      console.error(err);
    }
  }
};
