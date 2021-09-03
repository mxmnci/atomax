import executeAction from "./executeAction";
import app from "./express";
import discordBot from "./discord/bot";
import { discordBotToken, mongoURI } from "./config";
import User from "./models/User";
import mongoose from "mongoose";

mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to Database"));

app.get("/", async (req, res) => {
  res.send("Atomax is functional! 🚀");
});

app.post("/webhook", async (req, res) => {
  try {
    const { discordId } = req.body;

    if (!discordBot.users.fetch(discordId)) {
      console.log("Discord ID is not valid!");
      return res
        .status(401)
        .send("You are not authorized to POST to this webhook!");
    }

    const user = await User.findOne({ discordId });

    if (!user) {
      console.log("User has not yet been initialized!");
      return res.status(404).send("User not found!");
    }

    executeAction(req.body, user);

    return res.status(200).send("OK");
  } catch (err) {
    console.error(err);
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
