import { Message, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
//import { botConfig } from "../../config.js";
import { container } from '@sapphire/framework';

class utils {
	public embed(message: Message, stars: string /*, config: any | undefined*/) {
		//if (config.get("webhook_enabled") == true) {
		//    const embed = new MessageEmbed()
		//   .setColor('RANDOM')
		//    .setTitle("Starboard")
		//    .setDescription(message)
		//    .addField("Stars", stars, true)
		//    .setFooter({text: `Powered by: ${botConfig.botName}`})
		//    return embed
		//} else {
		/* const embed = new EmbedBuilder()
            .setColor(Colors.Orange)
            .setTitle("Starboard")
            .setDescription(message.content)
            .addFields(
                {name: "Stars", value: `${stars}`, inline: true},
                {name: "Message URL", value: `${message.url}`, inline: false}
            )
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()}) */
		const embed = new EmbedBuilder()
			.setColor(Colors.Orange)
			.setTitle(`:star: ${stars}`)
			.setDescription(message.content)
			.setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
			.setFooter({ text: `Message ID: ${message.id}` })
			.setTimestamp();
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Original Message').setURL(message.url)
		);
		return { embeds: [embed], components: [row] };
		// }
	}
	public async trackedAllCheck(guildId: string | null) {
		const tracked = await container.db.table(`tracked_${guildId}`);
		const trackedAll = await tracked.get(`array`);
		if (trackedAll == null) {
			await tracked.set('array', []);
			return;
		} else {
			return;
		}
	}
}
export const starboardUtils = new utils();
