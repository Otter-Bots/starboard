import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions, ApplicationCommandRegistry } from '@sapphire/framework';
import { botConfig } from '../../config.js';
import { CommandInteraction, EmbedBuilder, Colors } from 'discord.js';
@ApplyOptions<CommandOptions>({
	description: 'Get stats about Starboard!'
})
export class UserCommand extends Command {
	public async chatInputRun(interaction: CommandInteraction) {
		const embed = new EmbedBuilder()
			.setColor(Colors.Orange)
			.setTitle(`${botConfig.botName} | Stats`)
			.setDescription(
				`${botConfig.botName} is an advanced starboard bot with many useful features that are designed to carry out your server's starboard needs. Find the source code at https://git.otterbots.xyz/starboard.`
			)
			.addFields(
				{ name: 'Users', value: `${this.container.client.users.cache.size}`, inline: true },
				{ name: 'Channels', value: `${this.container.client.channels.cache.size}`, inline: true },
				{ name: 'Guilds', value: `${this.container.client.guilds.cache.size}`, inline: true }
			)
			.setTimestamp();
		await interaction.reply({ embeds: [embed] });
	}
	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description));
		{
			idHints: ['1000429157043404850', '1000431134791958589'];
		}
	}
}
