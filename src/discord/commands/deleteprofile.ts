import { SlashCommandBuilder } from "@discordjs/builders";
import User from "../../models/User";
import Command from "../../types/Command";

export const deleteprofile: Command = {
  data: new SlashCommandBuilder()
    .setName("deleteprofile")
    .setDescription("Delete all data associated with Atomax"),
  async execute(interaction) {
    try {
      await User.deleteOne({ discordId: interaction.member.user.id });

      return interaction.reply({
        content: "Your account data has been deleted successfully!",
        ephemeral: true
      });
    } catch (err) {
      console.error(err);
    }
  }
};
