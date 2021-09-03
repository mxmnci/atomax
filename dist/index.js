"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executeAction_1 = __importDefault(require("./executeAction"));
const express_1 = __importDefault(require("./express"));
const bot_1 = __importDefault(require("./discord/bot"));
const config_1 = require("./config");
const User_1 = __importDefault(require("./models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(config_1.mongoURI);
const db = mongoose_1.default.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to Database"));
express_1.default.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Atomax is functional! 🚀");
}));
express_1.default.post("/webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { discordId } = req.body;
        if (!bot_1.default.users.fetch(discordId)) {
            console.log("Discord ID is not valid!");
            return res
                .status(401)
                .send("You are not authorized to POST to this webhook!");
        }
        const user = yield User_1.default.findOne({ discordId });
        if (!user) {
            console.log("User has not yet been initialized!");
            return res.status(404).send("User not found!");
        }
        (0, executeAction_1.default)(req.body, user);
        return res.status(200).send("OK");
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}));
bot_1.default.once("ready", () => {
    console.log("Discord bot is ready 🚀");
});
bot_1.default.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    const command = bot_1.default.commands.get(interaction.commandName);
    if (!command)
        return;
    try {
        yield command.execute(interaction);
    }
    catch (err) {
        console.error(err);
        yield interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true
        });
    }
}));
bot_1.default.login(config_1.discordBotToken);
//# sourceMappingURL=index.js.map