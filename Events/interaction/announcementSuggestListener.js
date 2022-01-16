const { MessageEmbed } = require("discord.js");
const suggestionsChannelId = "926743021008068608";
const { announcementChannelId } = require('../../settings.json')
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isButton()) {
      if (interaction.channel.id === suggestionsChannelId) {
        const message = interaction.message.embeds[0].description;
        const buttonResult = interaction.customId.charAt(0);
        const authorId = interaction.customId.slice(1);
        const user = client.users.cache.get(authorId);
        const channel = interaction.guild.channels.cache.find(
          (c) => c.id === announcementChannelId
        );

        const noPerms = new MessageEmbed()
          .setTitle("Error!")
          .setDescription(
            "Oh no! you dont have permissions to use this command."
          )
          .setColor("RED");

        const canInitPoll = interaction.member.roles.cache.some(
          (r) => r.name === "Moderators"
        );

        if (!canInitPoll) return interaction.followUp({ embeds: [noPerms] });

        const announcementEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("New Announcement!")
          .setDescription(message)
          .setFooter(`From ${user.tag}`);

        if (buttonResult == "0") {
          const decline = new MessageEmbed()
            .setColor("RED")
            .setTitle("Announcement Declined:")
            .setDescription(message)
            .setFooter(`Declined by: ${interaction.user.tag}`)
            .setAuthor(`Proposed by: ${user.tag}`);

          interaction.message.delete();
          interaction.channel.send({ embeds: [decline] });

          const declineAuthor = new MessageEmbed()
            .setColor("RED")
            .setTitle("Sorry!")
            .setDescription(
              `<@${authorId}> Your announcement proposal was declined by a server moderator.`
            );

          try {
            return user.send({ embeds: [declineAuthor] });
          } catch {
            return;
          }
        } else if (buttonResult == "1") {
          const accept = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Announcement Accepted:")
            .setDescription(message)
            .setFooter(`Accepted by: ${interaction.user.tag}`)
            .setAuthor(`Proposed by: ${user.tag}`);

          interaction.message.delete();
          interaction.channel.send({ embeds: [accept] });

          const acceptAuthor = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Congrats!")
            .setDescription(
              `<@${user.id}> Your announcement proposal has been accepted by a server moderator!`
            );

          try {
            user.send({ embeds: [acceptAuthor] });
          } catch {
            return;
          }

          return channel.send({ embeds: [announcementEmbed] });
        } else {
          return console.log("you royally messed up your code Michael");
        }
      }
    }
  },
};
