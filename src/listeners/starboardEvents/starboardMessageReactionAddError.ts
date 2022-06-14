import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
@ApplyOptions<ListenerOptions>({
  event: "starboardMessageReactionAddError",
  emitter: "starboardEvents"
})
export class UserEvent extends Listener {
  public run(error: any) {
    console.log(error)
  }
}
