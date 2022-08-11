import { Precondition } from '@sapphire/framework';
import type { Interaction, } from 'discord.js';;

export class UserPrecondition extends Precondition {
  public chatInputRun(interaction: Interaction) {
    if (process.env.NODE_ENV == "dev") {
      return this.ok()
    } else if (interaction.user.id == interaction.guild?.ownerId) {
      return this.ok()
    } else {
      return this.error({ message: 'This can only be used by the guild owner!'})
    }
    //return interaction.user.id == interaction.guild?.ownerId ? this.ok() : this.error({ message: 'This can only be used by the guild owner!'})
  }
}

declare module '@sapphire/framework' {
  interface Preconditions {
    serverOwnerOnly: never;
  }
}
