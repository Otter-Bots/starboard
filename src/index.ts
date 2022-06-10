import { ApplicationCommandRegistries, RegisterBehavior, SapphireClient } from "@sapphire/framework";
import "dotenv/config";
import "@sapphire/plugin-logger/register";
import "./lib/db.js"
const client = new SapphireClient({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES'
    ],
    loadDefaultErrorListeners: true,
});
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite)
client.login();