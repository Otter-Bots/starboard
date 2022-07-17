import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions} from '@sapphire/framework';
import { MessageReaction, TextChannel, WebhookClient } from 'discord.js';

@ApplyOptions<ListenerOptions>({
  event: "starboardRemoveMsg",
  emitter: "starboardEvents"
})
export class UserEvent extends Listener {
  public async run(reaction: MessageReaction) {
    try {
    const tracked = await this.container.db.table(`tracked_${reaction.message.guildId}`);
    const config = await this.container.db.table(`config_${reaction.message.guildId}`);
    if (await config.get("webhook_enabled") == true) {
      const webhook = await config.get("webhook_url");
      this.container.logger.info(`Deleted message from starboard \n GuildID: ${reaction.message.guildId} \n MessageID: ${reaction.message.id} \n Tracked Message ID ${await tracked.get(`_${reaction.message.id}`)}`);
      const webhookClient = new WebhookClient({url: webhook});
      webhookClient.deleteMessage(await tracked.get(`_${reaction.message.id}`));
      await tracked.delete(`_${reaction.message.id}`)
      await tracked.pull(`array`,`${reaction.message.id}`)
    } else {
      const { client } = this.container
      const msgId = await tracked.get(`_${reaction.message.id}`);
      const channelId = await config.get("channelId");
      const channel = client.channels.cache.get(channelId) as TextChannel;
      (await (await channel?.messages.fetch(msgId)).delete());
      await tracked.delete(`_${reaction.message.id}`)
      await tracked.pull(`array`,`${reaction.message.id}`)
    }
  } catch (err) {
   reaction.message.channel.send(`Error: ${err}`);
  }
  }
}
