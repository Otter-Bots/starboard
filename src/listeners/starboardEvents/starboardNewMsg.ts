import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { TextChannel } from 'discord.js';
@ApplyOptions<ListenerOptions>({
  event: "starboardNewMsg",
  emitter: "starboardEvents"
})
export class UserEvent extends Listener {
  public async run(reaction: any) {
    const config = await this.container.db.table(`config_${reaction.message.guildId}`);
    const tracked = await this.container.db.table(`tracked_${reaction.message.guildId}`);
    const embed = this.container.starboard.utils.embed(`${reaction.message.content}`, `${reaction.count}`, config);
    const channelId = await config.get("channelId")
    const channel = this.container.client.channels.cache.get(channelId) as TextChannel;
    const msg = await channel.send({ embeds: [embed]})
    await tracked.set(`_${reaction.message.id}`, msg.id)
    await tracked.push(`array`,`${reaction.message.id}`)
  }
}
