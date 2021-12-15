const { MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "uptime",
  description: "Display's the amount of time P-CEP Utilities has been online",
  execute(interaction) {
    let seconds = process.uptime();
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var day = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hours = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var minutes = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var seconds = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""; 

    let embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Uptime:')
    .setDescription(`${day} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);

    interaction.followUp({ embeds: [embed] });
  },
};
