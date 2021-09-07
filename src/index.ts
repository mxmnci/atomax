import executeAction from "./executeAction";
import app from "./express";
import discordBot from "./discord/bot";
import { discordBotToken, mongoURI } from "./config";
import User from "./models/User";
import mongoose from "mongoose";
import { TextChannel } from "discord.js";

mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to Database"));

app.get("/", async (req, res) => {
  res.send("Atomax is functional! 🚀");
});

app.post("/webhook", async (req, res) => {
  const channel = discordBot.channels.cache.get("882463600629923921");

  if (!(channel instanceof TextChannel)) {
    return console.error("Not a text channel!");
  }

  try {
    const { discordId } = req.body;

    await discordBot.users.fetch(discordId);

    channel.send(`Processing request for <@!${discordId}>`);

    const user = await User.findOne({ discordId });

    executeAction(req.body, user);

    return res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    channel.send(`Something went wrong: ${err.message}`);
    return res.status(500).send("Internal Server Error");
  }
});

discordBot.once("ready", () => {
  console.log("Discord bot is ready 🚀");
});

discordBot.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = discordBot.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true
    });
  }
});

discordBot.login(discordBotToken);
