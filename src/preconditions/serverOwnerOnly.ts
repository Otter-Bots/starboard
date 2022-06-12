import { Precondition } from '@sapphire/framework';
import type { Interaction, } from 'discord.js';;

export class UserPrecondition extends Precondition {
  public chatInputRun(interaction: Interaction) {
    return interaction.user.id == interaction.guild?.ownerId ? this.ok() : this.error({ message: 'This can only be used by the guild owner'})
  }
}

declare module '@sapphire/framework' {
  interface Preconditions {
    serverOwnerOnly: never;
  }
}
