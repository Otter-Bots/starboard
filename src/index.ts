import { SapphireClient } from "@sapphire/framework";
import "dotenv/config";
const client = new SapphireClient({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES'
    ],

});
client.login()
console.log("Started!")
void client;
