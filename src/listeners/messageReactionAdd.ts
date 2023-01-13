import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { MessageReaction } from 'discord.js';
@ApplyOptions<ListenerOptions>({
	event: 'messageReactionAdd'
})
export class UserEvent extends Listener {
	public async run(reaction: MessageReaction) {
		try {
			if (reaction.partial) {
				// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
				try {
					await reaction.fetch();
				} catch (e) {
					this.container.starboardEvents.emit('starboardMessageReactionAddError', e);
					return;
				}
			}
			const config = await this.container.db.table(`config_${reaction.message.guildId}`);
			const tracked = await this.container.db.table(`tracked_${reaction.message.guildId}`);
			await this.container.starboard.utils.trackedAllCheck(reaction.message.guildId);
			const trackedAll = await tracked.get(`array`);
			if (reaction.emoji.name == '⭐') {
				if (trackedAll.includes(reaction.message.id as any)) {
					this.container.starboardEvents.emit('starboardUpdateMsg', reaction);
				} else {
					if (reaction.count >= (await config.get('stars'))) {
						if ((await config.get('channelId')) == null) {
							this.container.starboardEvents.emit('starboardChannelNull', reaction);
						} else {
							this.container.starboardEvents.emit('starboardNewMsg', reaction);
						}
					}
				}
			}
		} catch (e) {
			this.container.starboardEvents.emit('starboardMessageReactionAddError', e);
		} finally {
			this.container.starboardEvents.emit('starboardMessageReactionAddFinished');
		}
	}
}
