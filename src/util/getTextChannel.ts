import { channel } from "diagnostics_channel";
import { TextChannel } from "discord.js";
import discordBot from "../discord/bot";

export const getTextChannel = (channelId: string): TextChannel => {
  const channel = discordBot.channels.cache.get(channelId);
  if (!(channel instanceof TextChannel)) {
    throw new Error(`Channel ${channelId} is not a text channel`);
  }

  return channel;
};
