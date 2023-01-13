import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions, ApplicationCommandRegistry } from '@sapphire/framework';
import { botConfig } from '../../config.js';
import type { TextChannel } from 'discord.js';
@ApplyOptions<CommandOptions>({
	description: 'Configure StartBoard',
	preconditions: ['serverOwnerOnly']
})
export class UserCommand extends Command {
	public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		try {
			const subcommand = interaction.options.getSubcommand();
			if (subcommand === 'channel') {
				return await this.channel(interaction);
			} else if (subcommand === 'stars') {
				return await this.stars(interaction);
			} else if (subcommand === 'webhook') {
				return await this.webhook(interaction);
			} else {
				return interaction.reply('Invalid sub command');
			}
		} catch (err) {
			interaction.reply(`Error: ${err}`);
		}
	}

	private async channel(interaction: Command.ChatInputCommandInteraction) {
		try {
			const config = await this.container.db.table(`config_${interaction.guildId}`);
			const channel = interaction.options.getChannel('selector') as TextChannel;
			channel.permissionOverwrites.create(channel.guild.roles.everyone, { AddReactions: false });
			channel?.permissionOverwrites.create(`${this.container.client.application?.id}`, { SendMessages: true, ViewChannel: true });
			await config.set('channelId', `${channel?.id}`);
			interaction.reply(`Set the channel to ${channel}!`);
		} catch (err) {
			interaction.reply(`Error: ${err}`);
		}
	}

	private async stars(interaction: Command.ChatInputCommandInteraction) {
		try {
			const config = await this.container.db.table(`config_${interaction.guildId}`);
			const stars = interaction.options.getNumber('amount');
			await config.set('stars', `${stars}`);
			interaction.reply(`Set the amount of stars needed to ${stars}!`);
		} catch (err) {
			interaction.reply(`Error: ${err}`);
		}
	}
	private async webhook(interaction: Command.ChatInputCommandInteraction) {
		try {
			const config = await this.container.db.table(`config_${interaction.guildId}`);
			const enabled = interaction.options.getBoolean('enabled');
			config.set('webhook_enabled', enabled);
			if (enabled == true) {
				const url = interaction.options.getString('url');
				config.set('webhook_url', url);
			}
			interaction.reply(`Changed webhook settings!`);
		} catch (err) {
			interaction.reply(`Error: ${err}`);
		}
	}
	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addSubcommand((command) =>
					command
						.setName('channel')
						.setDescription(`Set the channel that ${botConfig.botName} will post to!`)
						.addChannelOption((option) => option.setName('selector').setDescription('Select da channel').setRequired(true))
				)
				.addSubcommand((command) =>
					command
						.setName('stars')
						.setDescription(`Set the amount of stars that ${botConfig.botName} will respond to!`)
						.addNumberOption((option) => option.setName('amount').setDescription('amount of stars').setRequired(true))
				)
				.addSubcommand((command) =>
					command
						.setName('webhook')
						.setDescription(`Configure the webhook that ${botConfig.botName} will use to post starboard messages!`)
						.addBooleanOption((option) => option.setName('enabled').setDescription('toggle the webhook').setRequired(true))
						.addStringOption((option) => option.setName('url').setDescription('Enter the webhook URL.'))
				)
		);
		{
			idHints: ['984540176133009448', '1000429158515613806'];
		}
	}
}
