import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions }from "@sapphire/framework";
import { botConfig } from '../../config.js';

@ApplyOptions<CommandOptions>({
	description: 'Configure StartBoard',
})
export class UserCommand extends Command {
	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		const subcommand = interaction.options.getSubcommand(true);
		if (subcommand === 'channel') {
		  return await this.channel(interaction);
		} else if (subcommand === 'stars') {
		  return await this.stars(interaction);
		} else if(subcommand === 'webhook') {
			return await this.webhook(interaction)
		}
		return interaction.reply('Invalid sub command');
	}

	private async channel(interaction: Command.ChatInputInteraction) {
		const config = await this.container.db.table(`config_${interaction.guildId}`);
		const channel = interaction.options.getChannel('selector');
		await config.set("channelId", `${channel?.id}`)
		interaction.reply(`Set the channel to ${channel}`)
	}
	
	private async stars(interaction: Command.ChatInputInteraction) {
		const config = await this.container.db.table(`config_${interaction.guildId}`);
		const stars = interaction.options.getNumber("amount");
		await config.set("stars", `${stars}`)
		interaction.reply(`Set the Stars to ${stars}`)
	}
	private async webhook(interaction: Command.ChatInputInteraction) {
		const config = await this.container.db.table(`config_${interaction.guildId}`);
		const enabled = interaction.options.getBoolean('enabled');
		config.set("webhook_enabled", enabled)
		if (enabled == true) {
			const url =  interaction.options.getString("url")
			config.set("webhook_url", url);
		}
		interaction.reply(`Changed webhook settings!`)
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addSubcommand((command) =>
					command
						.setName('channel')
						.setDescription(`Set the channel that ${botConfig.botName} will post to`)
						.addChannelOption((option) => option.setName('selector').setDescription('Select da channel').setRequired(true))
				)
				.addSubcommand((command) =>
					command
						.setName('stars')
						.setDescription(`Set the stars that ${botConfig.botName} will respond to`)
						.addNumberOption((option) => option.setName('amount').setDescription('amount of stars').setRequired(true))
				)
				.addSubcommand((command) =>
					command
						.setName('webhook')
						.setDescription(`Configure the webhook that ${botConfig.botName} will post to (disabled by default`)
						.addBooleanOption((option) => option.setName('enabled').setDescription('toggle the webhook').setRequired(true))
						.addStringOption((option) => option.setName("url").setDescription("Whats the webhook url (not needed if you disabled the webhook)"))
				)
		)
		{
			idHints: ['984540176133009448']
		}
	}
}
