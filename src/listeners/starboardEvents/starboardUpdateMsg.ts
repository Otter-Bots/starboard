import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import { TextChannel, WebhookClient } from 'discord.js';
@ApplyOptions<ListenerOptions>({
  event: "starboardUpdateMsg",
  emitter: "starboardEvents"
})
export class UserEvent extends Listener {
  public async run(reaction: any) {
    try {
    const tracked = await this.container.db.table(`tracked_${reaction.message.guildId}`);
    const config = await this.container.db.table(`config_${reaction.message.guildId}`);
    if (await config.get("webhook_enabled") == true) {
      const webhook = await config.get("webhook_url");
      const embed = this.container.starboard.utils.embed(reaction.message, reaction.count);
      const webhookClient = new WebhookClient({url: webhook});
      await webhookClient.editMessage(await tracked.get(`_${reaction.message.id}`), embed);
    } else {
    const { client } = this.container
    const msgId = await tracked.get(`_${reaction.message.id}`);
    const channelId = await config.get("channelId");
    const channel = client.channels.cache.get(channelId) as TextChannel;
    const embed = this.container.starboard.utils.embed(reaction.message, `${reaction.count}`, config);
    await (await channel?.messages.fetch(msgId)).edit(embed);
    }
  } catch (err) {
    reaction.message.channel.send(`Error: ${err}`);
  }
  }
}
