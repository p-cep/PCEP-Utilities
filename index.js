const { Client, Collection } = require('discord.js');
var cron = require('node-cron');
const client = new Client({ intents: 32767 });
module.exports = client;
const { token } = require('./config.json');

client.commands = new Collection();
client.setMaxListeners(20);
const colorTask = require('./tasks/colorChangeTask.js');
const newsTask = require('./tasks/news.js');
cron.schedule("*/10 * * * *", () => {
    colorTask();
});
cron.schedule("*/1 * * * *", () => {
    newsTask();
});
['Events', 'Commands'].forEach(handler => {
require(`./Handlers/${handler}`)(client);
});

client.login(token);
