import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework';
import 'dotenv/config';
import '@sapphire/plugin-logger/register';
import './lib/db.js';
import './lib/starboard/aug.js';
import { starboardClient } from './lib/starboard/aug.js';
const client = new starboardClient();
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite);
(async () => {
	await client.login();
})();
