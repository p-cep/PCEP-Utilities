const { MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "settings",
  description: "Admin only command to configure bot settings",
  options: [
    {
      name: "announcementchannel",
      description: "Set the channel ANNOUNCEMENTS (not NEWS) will be sent in",
      type: "CHANNEL",
    },
    {
      name: "newschannel",
      description: "Set the channel PCEP news will be sent in",
      type: "CHANNEL",
    },
    {
      name: "notificationrole",
      description:
        "set the role that will be pinged when there is new PCEP news",
      type: "ROLE",
    },
    {
      name: "mysterycolorrole",
      description: "Set the mystery color of the week role",
      type: "ROLE",
    },
    {
      name: "rerollthreshold",
      description:
        "Set the number of votes required for the mystery color of the week to be rerolled",
      type: "INTEGER",
    },
    {
      name: "rerollday",
      description: "set the day the mystery color of the week will be rerolled",
      type: "STRING",
      choices: [
        {
          name: "Sunday",
          value: "0",
        },
        {
          name: "Monday",
          value: "1",
        },
        {
          name: "Tuesday",
          value: "2",
        },
        {
          name: "Wednesday",
          value: "3",
        },
        {
          name: "Thursday",
          value: "4",
        },
        {
          name: "Friday",
          value: "5",
        },
        {
          name: "Saturday",
          value: "6",
        },
      ],
    },
    {
      name: "rerolllockday",
      description: "Set the day at which the reroll voting will be locked",
      type: "STRING",
      choices: [
        {
          name: "Sunday",
          value: "0",
        },
        {
          name: "Monday",
          value: "1",
        },
        {
          name: "Tuesday",
          value: "2",
        },
        {
          name: "Wednesday",
          value: "3",
        },
        {
          name: "Thursday",
          value: "4",
        },
        {
          name: "Friday",
          value: "5",
        },
        {
          name: "Saturday",
          value: "6",
        },
      ],
    },
    {
      name: "surveylogs",
      description: "Set the channel where multiple-choice survey data is sent",
      type: "CHANNEL",
    },
  ],
  async execute(interaction) {
    function jsonReader(filePath, cb) {
      fs.readFile(filePath, "utf-8", (err, fileData) => {
        if (err) {
          return cb && cb(err);
        }
        try {
          const object = JSON.parse(fileData);
          return cb && cb(null, object);
        } catch (err) {
          return cb && cb(err);
        }
      });
    }

    let changeLog = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("Success!")
      .setDescription("The following Changes have been made: ")
      .setTimestamp();

    jsonReader("./settings.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let answer = false;
        let newObj = data;

        if (interaction.options.getChannel("announcementschannel")) {
          channelId = interaction.options.getChannel("announcementschannel").id;
          newObj["announcementChannelId"] = channelId;
          changeLog.addField(
            "Announcements channel changed to:",
            `<#${channelId}>`
          );
          answer = true;
        }
        if (interaction.options.getChannel("newschannel")) {
          channelId = interaction.options.getChannel("newschannel").id;
          newObj["newsChannelId"] = channelId;
          changeLog.addField("News channel changed to:", `<#${channelId}>`);
          answer = true;
        }
        if (interaction.options.getRole("notificationrole")) {
          roleId = interaction.options.getRole("notificationrole").id;
          newObj["announcementsRoleId"] = roleId;
          changeLog.addField("Notification role changed to:", `<@&${roleId}>`);
          answer = true;
        }
        if (interaction.options.getRole("mysterycolorrole")) {
          roleId = interaction.options.getRole("mysterycolorrole").id;
          newObj["roleChangeId"] = roleId;
          changeLog.addField(
            "Mystery color of the week role changed to:",
            `<@&${roleId}>`
          );
          answer = true;
        }
        if (interaction.options.getInteger("rerollthreshold")) {
          threshold = interaction.options.getInteger("rerollthreshold");
          const err = new MessageEmbed()
            .setColor("RED")
            .setTitle("Error!")
            .setDescription("The reroll threshold must be greater than 0");
          if (interaction.options.getInteger("rerollthreshold") <= 0)
            return interaction.followUp({ embeds: [err] });
          newObj["colorRerollThreshold"] = threshold;
          changeLog.addField(
            "Mystery color of the week reroll voting threshold changed to:",
            `${threshold}`
          );
          answer = true;
        }
        if (interaction.options.getRole("notificationrole")) {
          roleId = interaction.options.getRole("notificationrole").id;
          newObj["colorRerollThreshold"] = roleId;
          changeLog.addField("Notification role changed to:", `<@&${roleId}>`);
          answer = true;
        }
        if (interaction.options.getString("rerollday")) {
          let day = interaction.options.getString("rerollday");

          const err = new MessageEmbed()
            .setColor("RED")
            .setTitle("Error!")
            .setDescription(
              "You cannot make the mystery color role change day the same as the reroll vote end day"
            );

          if (day == data["initStartDay"])
            return interaction.followUp({ embeds: [err] });

          newObj["initStartDay"] = day;
          changeLog.addField(
            "Mystery color of the week shuffle day changed to:",
            `${day}`
          );
          answer = true;
        }
        if (interaction.options.getString("rerolllockday")) {
          let day = interaction.options.getString("rerolllockday");

          const err = new MessageEmbed()
            .setColor("RED")
            .setTitle("Error!")
            .setDescription(
              "You cannot make the reroll vote end day the same as the mystery color role change day"
            );

          if (day == data["resetStartDay"])
            return interaction.followUp({ embeds: [err] });

          newObj["initStartDay"] = day;
          changeLog.addField(
            "Mystery color of the week reroll vote end day changed to:",
            `${day}`
          );
          answer = true;
        }
        if (interaction.options.getChannel("surveylogs")) {
          let surveyLogs = interaction.options.getChannel("surveylogs").id;
          newObj["surveyChannel"] = surveyLogs;
          changeLog.addField(
            "Multiple Choice survey log channel changed to:",
            `<#${surveyLogs}>`
          );
          answer = true;
        }

        function check(interaction, changeLog, newObj) {
          if (answer == false) {
            const err = new MessageEmbed()
              .setColor("RED")
              .setTitle("Error!")
              .setDescription("You must pick at least one option");

            return interaction.followUp({ embeds: [err] });
          } else {
            console.log(answer);
            interaction.followUp({ embeds: [changeLog] });
            fs.writeFile(
              "./settings.json",
              JSON.stringify(newObj, null, 1),
              (err) => {
                if (err) console.log(err);
                return;
              }
            );
          }
        }

        setTimeout(check, 2000 , interaction, changeLog, newObj);
      }
    });
  },
};
