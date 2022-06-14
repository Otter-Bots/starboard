import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { MessageReaction } from 'discord.js';

@ApplyOptions<ListenerOptions>({
  event: "messageReactionRemove"
})
export class UserEvent extends Listener {
  public async run(reaction: MessageReaction) {
    if (reaction.partial) {
      // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
      try {
        await reaction.fetch();
      } catch (e) {
        this.container.starboardEvents.emit("starboardMessageReactionRemoveError", e)
        return;
      }
    }
    const config = await this.container.db.table(`config_${reaction.message.guildId}`);
    if (reaction.emoji.name == "⭐") {
      if (reaction.count >= await config.get("stars")) {
        this.container.starboardEvents.emit("starboardUpdateMsg", reaction)
      } else {
        this.container.starboardEvents.emit("starboardRemoveMsg", reaction)
      }
    }
  }
}