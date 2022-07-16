import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import { MessageReaction, TextChannel, WebhookClient } from 'discord.js';

@ApplyOptions<ListenerOptions>({
  event: "starboardRemoveMsg",
  emitter: "starboardEvents"
})
export class UserEvent extends Listener {
  public async run(reaction: MessageReaction) {
    const tracked = await this.container.db.table(`tracked_${reaction.message.guildId}`);
    const config = await this.container.db.table(`config_${reaction.message.guildId}`);
    if (config.get("webhook_enabled") == true) {
      const webhook = config.get("webhook_url");
      const webhookClient = new WebhookClient(webhook);
      webhookClient.delete(tracked.get(`_${reaction.message.id}`));
      tracked.delete(`_${reaction.message.id}`)
      tracked.pull(`array`,`${reaction.message.id}`)
    } else {
      const { client } = this.container
      const msgId = await tracked.get(`_${reaction.message.id}`);
      const channelId = await config.get("channelId");
      const channel = client.channels.cache.get(channelId) as TextChannel;
      (await (await channel?.messages.fetch(msgId)).delete());
      await tracked.delete(`_${reaction.message.id}`)
      await tracked.pull(`array`,`${reaction.message.id}`)
    }
  }
}
