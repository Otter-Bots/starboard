import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions} from '@sapphire/framework';
import { blue, bold } from 'colorette';
@ApplyOptions<ListenerOptions>({
  event: "ready",
  once: true
})
export class UserEvent extends Listener {
  public run() {
    console.log(bold(blue("StarBoard!")))
  }
}
