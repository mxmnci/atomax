import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import {
  discordBotClientId,
  discordBotGuildId,
  discordBotToken
} from "../config";
import * as commands from "./commands";

const botCommands = [];

for (const command of Object.keys(commands)) {
  botCommands.push(commands[command].data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(discordBotToken);

(async () => {
  try {
    const registeredCommands = (await rest.put(
      Routes.applicationGuildCommands(discordBotClientId, discordBotGuildId),
      {
        body: botCommands
      }
    )) as any;

    for (const command of registeredCommands) {
      console.log(`Command registered: /${command.name}`);
    }

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
