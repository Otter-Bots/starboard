import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { TextChannel } from 'discord.js';
@ApplyOptions<ListenerOptions>({
  event: "starboardUpdateMsg",
  emitter: "starboardEvents"
})
export class UserEvent extends Listener {
  public async run(reaction: any) {
    const tracked = await this.container.db.table(`tracked_${reaction.message.guildId}`);
    const config = await this.container.db.table(`config_${reaction.message.guildId}`);
    const { client } = this.container
    const msgId = await tracked.get(`_${reaction.message.id}`);
    const channelId = await config.get("channelId");
    const channel = client.channels.cache.get(channelId) as TextChannel;
    const embed = this.container.starboard.utils.embed(`${reaction.message.content}`, `${reaction.count}`, config);
    await (await channel?.messages.fetch(msgId)).edit({ embeds: [embed]});
  }
}
