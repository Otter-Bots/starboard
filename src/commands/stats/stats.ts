import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions, ApplicationCommandRegistry }from "@sapphire/framework";
import { botConfig } from '../../config.js';
import { CommandInteraction, MessageEmbed} from 'discord.js';
@ApplyOptions<CommandOptions>({
	description: 'Get stats about the bot',
})
export class UserCommand extends Command {
	public async chatInputRun(interaction: CommandInteraction) {
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${botConfig.botName} | Stats`)
        .setDescription(`${botConfig.botName} is a bot made by Otter Bots`)
        .addFields(
            { name: 'Users', value: `${this.container.client.users.cache.size}`, inline: true },
            { name: 'Channels', value: `${this.container.client.channels.cache.size}`, inline: true },
            { name: 'Guilds', value: `${this.container.client.guilds.cache.size}`, inline: true }
        )
        .setTimestamp()
        interaction.reply({embeds: [embed]});
	}
	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
		)
		{
			idHints: ['1000429157043404850', '1000431134791958589']
		}
	}
}
