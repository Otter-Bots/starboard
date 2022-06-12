import { MessageEmbed } from "discord.js";
//import { botConfig } from "../../config.js";
import { container } from "@sapphire/framework";

class utils {
    public embed(message: string, stars: string/*, config: any | undefined*/) {
        //if (config.get("webhook_enabled") == true) {
        //    const embed = new MessageEmbed()
        //   .setColor('RANDOM')
        //    .setTitle("Starboard")
        //    .setDescription(message)
        //    .addField("Stars", stars, true)
        //    .setFooter({text: `Powered by: ${botConfig.botName}`})
        //    return embed
        //} else {
            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Starboard")
            .setDescription(message)
            .addField("Stars", stars, true)
            return embed
       // }
    }
    public async trackedAllCheck(guildId: string | null) {
       const tracked = await container.db.table(`tracked_${guildId}`);
        const trackedAll = await tracked.get(`array`);
        if (trackedAll == null) {
            await tracked.set("array", []);
            return
        } else {
            return
        }
    }
}
export const starboardUtils = new utils()
