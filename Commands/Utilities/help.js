const { MessageEmbed } = require("discord.js");
const client = require("../../index.js");
const { guildId } = require("../../config.json");
module.exports = {
  name: "help",
  description: "info about PCEP-Utilities",
  options: [
    {
      name: "specificfunction",
      description:
        "If you would like more detailed information on a function, please select it here",
      required: false,
      type: "STRING",
      choices: [
        {
          name: "polls",
          value: "polls",
        },
        {
          name: "survey",
          value: "survey",
        },
        {
          name: "admin",
          value: "admin",
        },
      ],
    },
  ],
  async execute(interaction) {
    if (interaction.options.getString("specificfunction") === "polls") {
      const embed = new MessageEmbed()
        .setTitle("Polls Help")
        .setColor("RANDOM")
        .addFields(
          {
            name: "/poll create",
            value:
              "To create a poll, use /poll create. You can define up to 10 answers, a channel to send the poll, and 5 roles to restrict the poll to.",
            inline: false,
          },
          {
            name: "/poll end",
            value:
              "To end a poll, use /poll end. When you end a poll, users can no longer respond to a poll and the results are saved.",
            inline: false,
          },
          {
            name: "/poll displayresults",
            value:
              "To display the results of a poll, use /poll displayresults. You can choose if you want the results to be availble only to you, and what channel you want them to be posted in. You can only Display the latest 10 ended polls.",
            inline: false,
          }
        );
      interaction.followUp({ embeds: [embed] });
    } else if (interaction.options.getString("specificfunction") === "survey") {
      const embed = new MessageEmbed()
        .setTitle("Surveys Help")
        .setColor("RANDOM")
        .addFields(
          {
            name: "/survey create",
            value:
              "To create a survey, use /survey create. You have to define a Survey Title and question. You can also define a specifc channel to send the survey end.",
            inline: false,
          },
          {
            name: "/survey respond",
            value: "Use /survey respond to respond to a survey.",
            inline: false,
          },
          {
            name: "/survey end",
            value:
              "To end a survey, use /survey end. The results will be defined in the default survey log channel",
            inline: false,
          }
        );
      interaction.followUp({ embeds: [embed] });
    } else if (interaction.options.getString("specificfunction") === "admin") {
      const embed = new MessageEmbed()
        .setTitle("Admin Help")
        .setColor("RANDOM")
        .addFields(
          {
            name: "/settings",
            value: "To change PCEP-Utilities settings",
            inline: false,
          },
          {
            name: "/embed",
            value:
              "sends an embed in a channel of your choice with attributes of your choice",
            inline: false,
          },
          {
            name: "/task",
            value:
              "to run a specific task on command. NOTE: does not skip any requirements for the task to run, such as date, it only calls for the task to be checked, then ran only if all conditions are met",
            inline: false,
          }
        );
      interaction.followUp({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
      .setTitle("Help")
      .setColor("RANDOM")
      .addFields(
        {
          name: "/task",
          value: "Admin only command for initiating a task",
          inline: false,
        },
        {
          name: "/embed",
          value:
            "Sends an embed in a channel of your choice with attributes of your choice",
          inline: false,
        },
        {
          name: "/poll",
          value:
            "Manage multiple choice polls",
          inline: false,
        },
        {
          name: "/settings",
          value:
            "Admin only command to configure bot settings",
          inline: false,
        },
        {
          name: "/survey",
          value:
            "Respond to or create a survey here",
          inline: false,
        },
        {
          name: "/help",
          value:
            "umm... you're lookin at it",
          inline: false,
        },
        {
          name: "/ping",
          value:
            "pings PCEP-Utilities",
          inline: false,
        },
        {
          name: "/dox",
          value:
            "Gets a users info and avatar",
          inline: false,
        },
      );
    interaction.followUp({ embeds: [embed] });
    }
  },
};
