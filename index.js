import newsTask from './tasks/news.js';
import env from 'dotenv';
import cron from 'node-cron';
import { Client, Collection } from 'discord.js';
env.config()
const client = new Client({ intents: 32767 });
client.commands = new Collection();
client.setMaxListeners(20);
export default client;
['Events.js', 'Commands.js'].forEach(handler => {
import(`./Handlers/${handler}`).then(file => file.default(client));
});
cron.schedule("*/1 * * * *", () => {
    newsTask();
});
client.login(process.env.token);