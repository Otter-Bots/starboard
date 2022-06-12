import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
@ApplyOptions<ListenerOptions>({
  event: "starboardChannelNull",
  emitter: "starboardEvents"
})
export class UserEvent extends Listener {
  public run(reaction: any) {
    reaction.message.channel.send('ERROR: starboard channel not set!,\n set it using `/config channel <channel>`')
  }
}
