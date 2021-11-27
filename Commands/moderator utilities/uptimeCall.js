const { MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "uptime",
  description: "Display's the amount of time P-CEP Utilities has been online",
  execute(interaction) {
    let uptimeSeconds = process.uptime();
    let hours = Math.floor(uptimeSeconds / (60 * 60));
    let minutes = Math.floor((uptimeSeconds % (60 * 60)) / 60);
    let seconds = Math.floor(uptimeSeconds % 60);
    let day = Math.floor(hours / 24);
    if (hours >= 24) {
      hours = hours - 24;
    }

    let embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Uptime:')
    .setDescription(`${day} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);

    interaction.followUp({ embeds: [embed] });
  },
};
