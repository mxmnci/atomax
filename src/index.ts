import mongoose from "mongoose";
import executeAction from "./executeAction";
import app from "./express";
import discordBot from "./discord/bot";
import { discordBotToken, mongoURI } from "./config";
import User from "./models/User";
import { getTextChannel } from "./util/getTextChannel";

mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to Database"));

app.get("/", async (req, res) => {
  res.send("Atomax is functional! 🚀");
});

app.post("/webhook", async (req, res) => {
  const channel = getTextChannel("882463600629923921");

  try {
    const { discordId } = req.body;

    console.log(`test`, req.body);

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
      ephemeral: false
    });
  }
});

discordBot.login(discordBotToken);
