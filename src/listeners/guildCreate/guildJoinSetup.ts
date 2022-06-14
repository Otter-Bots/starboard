import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Guild } from 'discord.js';

@ApplyOptions<ListenerOptions>({
  event: "guildCreate"
})
export class UserEvent extends Listener {
  public async run(guild: Guild) {
    const config = await this.container.db.table(`config_${guild.id}`);
    await config.set("stars", 4)
    await config.set("webhook_enabled", false)
  }
}
