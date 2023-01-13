import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
@ApplyOptions<ListenerOptions>({
	event: 'starboardMessageReactionAddFinished',
	emitter: 'starboardEvents'
})
export class UserEvent extends Listener {
	public run() {
		return;
	}
}
