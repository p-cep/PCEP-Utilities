const fs = require("fs");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "setcount",
  description: "Sets the current count",
  options: [
    {
      name: "count",
      description: "what number do you want the count to be set to?",
      type: "NUMBER",
      required: true,
    },
  ],
  execute(interaction) {
    const errEmbed = new MessageEmbed()
      .setColor("RED")
      .setDescription("You do not have permission to change the count!");
    const perms = interaction.member.roles.cache.some((r) => r.name === "Mod");
    if (!perms) return interaction.followUp({ embeds: [errEmbed] });
    fs.readFile("./json/counting.json", "utf-8", (err, data0) => {
      if (err) {
        console.log(err);
      } else {
        let data = JSON.parse(data0);
        let count = interaction.options.getNumber("count");
        data[0].currentCount = count;

        const embed = new MessageEmbed()
          .setDescription(`the count has been set to ${data[0].currentCount}`)
          .setColor("RANDOM");

        interaction.followUp({ embeds: [embed] });

        fs.writeFile("./json/counting.json", JSON.stringify(data), (err) => {
          if (err) console.log(err);
        });
      }
    });
  },
};
