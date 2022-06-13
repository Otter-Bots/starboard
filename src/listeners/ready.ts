import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions, type Store} from '@sapphire/framework';
import { createBanner } from '@skyra/start-banner';
import { botConfig } from '../config.js';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { blue } from 'colorette';
@ApplyOptions<ListenerOptions>({
  event: "ready",
  once: true
})
export class UserEvent extends Listener {
  public run() {
    console.log(
      createBanner(
        {
          name: [
            gradient.pastel.multiline(figlet.textSync(botConfig.botName))
          ],
          extra: [
            gradient.pastel(`NODE_ENV=${process.env.NODE_ENV}`),
            `${this.printStoreDebugInformation()}`
          ]
        }
      )
    )
  }
  private printStoreDebugInformation() {
    const { client, logger } = this.container;
    const stores = [...client.stores.values()];
    const last = stores.pop()!;

    for (const store of stores) logger.info(this.styleStore(store));
    logger.info(this.styleStore(last));
  }

  private styleStore(store: Store<any>) {
   return `${gradient.passion(`Loaded`)} ${process.env.NODE_ENV == "dev" ? blue(`${store.name}`) : gradient.pastel(`${store.name}`)}`
  }
}
