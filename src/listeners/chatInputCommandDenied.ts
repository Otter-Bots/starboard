import { ApplyOptions } from '@sapphire/decorators';
import { ChatInputCommandDeniedPayload, Listener, ListenerOptions } from '@sapphire/framework';
import type { UserError } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({})
export class UserEvent extends Listener {
  public run(error: UserError, { interaction}: ChatInputCommandDeniedPayload) {
    return interaction.reply(error.message);
  }
}
