import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({
  event: "starboardMessageReactionRemoveError",
  emitter: "starboardEvents"
})
export class UserEvent extends Listener {
  public run() {}
}
