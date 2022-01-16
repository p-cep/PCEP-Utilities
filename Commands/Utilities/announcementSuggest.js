const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
const suggustionsChannelId = '926743021008068608'
module.exports = {
  name: "announcement",
  description:
    "suggust an announcement to a moderator that will be posted in announcements",
  options: [
    {
      name: "announcement",
      description: "what do you want to say?",
      type: "STRING",
      required: "true",
    },
  ],
  async execute(interaction) {
    const announcement = interaction.options.getString("announcement");

    const errEmbed = new MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Oops! The maximum length of an announcement is 2048 characters!"
      );
      if (announcement.length > 2048) return interaction.followUp({ embeds: [errEmbed] });

    const successEmbed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(
        "Your response has been saved. A moderator will review your application"
      );
    interaction.followUp({ embeds: [successEmbed] });

    const applicationEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("New Announcement Suggustment")
      .setAuthor(
        `${interaction.user.tag}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setDescription(`${announcement}`)
      .setFooter(
        `${moment(interaction.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`
      );

    const buttons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`1${interaction.user.id}`)
          .setLabel("Accept")
          .setStyle("SUCCESS")
      )
      .addComponents(
        new MessageButton()
        .setCustomId(`0${interaction.user.id}`)
        .setLabel("Deny")
        .setStyle("DANGER")
      );
       channel = interaction.guild.channels.cache.find(c => c.id === suggustionsChannelId); 
       return channel.send({ embeds: [applicationEmbed], components: [buttons] }); 
  },
};