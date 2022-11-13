import { starboardUtils } from "./utils.js";
import { container, SapphireClient, LogLevel } from "@sapphire/framework";
import { starboardEvents } from "./event.js";
import type EventEmitter from "events";

const starboard = {
    utils: []
}
container.starboard = starboard;
container.starboard.utils = starboardUtils;
container.starboardEvents = starboardEvents;

declare module "@sapphire/pieces" {
    interface Container {
        starboard: any,
        starboardEvents: EventEmitter
    }
}

export class starboardClient extends SapphireClient {
    public starboardEvents: EventEmitter;
    public constructor() {
		super({
            intents: [
                'GUILDS',
                'GUILD_MESSAGES',
                'GUILD_PRESENCES',
                'GUILD_MESSAGE_REACTIONS'
            ],
            partials: [
                'REACTION',
                'MESSAGE'
            ],
            loadDefaultErrorListeners: true,
            loadMessageCommandListeners: true,
            logger: {
                level: LogLevel.Info
            },
            shards: "auto", 
		});
        this.starboardEvents = starboardEvents
}
}
declare module "discord.js" {
    interface Client {
        starboardEvents: EventEmitter
    }
}