import { Client, Collection, Intents } from "discord.js";
import Command from "../types/Command";
import * as commands from "./commands";

const client = Object.assign(
  new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES]
  }),
  {
    commands: new Collection<string, Command>()
  }
);

for (const command of Object.keys(commands)) {
  client.commands.set(commands[command].data.name, commands[command]);
}

export default client;
