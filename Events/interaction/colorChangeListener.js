const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fs = require("fs");
let rerollCustomId;
const {
  announcementChannelId,
  roleChangeId,
  colorRerollThreshold,
} = require("../../settings.json");
module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isButton()) {
      if (interaction.channel.id === announcementChannelId) {
        await interaction.deferReply({ ephemeral: true }).catch(() => {});

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

        jsonReader("./json/colorChanged.json", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const errEmbed2 = new MessageEmbed()
              .setTitle("Oops!")
              .setDescription("You can no longer vote to re-roll this")
              .setColor("RED");

            if (data[0].colorchangedtoday == "false") {
              return interaction.followUp({ embeds: [errEmbed2] });
            } else if (interaction.customId == data[2].customId) {
              let canRespond = true;
              let loopIteration = 0;
              for (users in data[3].respondedUsers) {
                if (
                  interaction.user.id == data[3].respondedUsers[loopIteration]
                ) {
                  canRespond = false;
                }
                loopIteration++;
              }
              if (canRespond === true) {
                let votes = data[4].votes;
                votes++;
                const newArry = data;
                newArry.pop();
                newArry[3].respondedUsers.push(interaction.user.id);
                newArry.push({ votes: votes });

                fs.writeFile(
                  "./json/colorChanged.json",
                  JSON.stringify(newArry),
                  (err) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );

                const successEmbed = new MessageEmbed()

                  .setTitle("Success!")
                  .setDescription("Your vote has been counted")
                  .setColor("GREEN");

                interaction.followUp({ embeds: [successEmbed] });

                jsonReader("./json/colorChanged.json", (err, data) => {
                  if (err) {
                    console.log(err);
                  } else {
                    const updatedEmbed = new MessageEmbed()
                      .setColor(data[2].customId)
                      .setTimestamp()
                      .addFields({
                        name: "Votes to reroll:",
                        value: `${data[4].votes}`,
                      });
                    if (data[1].rerolled == false) {
                      updatedEmbed.setTitle(
                        "The mystery color of the week has been changed!"
                      );
                      updatedEmbed.setDescription(
                        "Click the button below to vote to reroll the color"
                      );
                    } else {
                      updatedEmbed.setTitle(
                        "The mystery color of the week has been re-rolled!"
                      );
                      updatedEmbed.setDescription(
                        "Click the button below to vote to reroll the color again"
                      );
                    }

                    interaction.message.edit({ embeds: [updatedEmbed] });

                    if (data[4].votes == colorRerollThreshold) {
                      executeReroll();
                    }
                  }
                });
              } else {
                const errEmbed = new MessageEmbed()
                  .setTitle("Oops!")
                  .setDescription("You have already voted!")
                  .setColor("RED");

                interaction.followUp({ embeds: [errEmbed] });
              }
            } else {
              const errEmbed1 = new MessageEmbed()
                .setTitle("Oops!")
                .setDescription("You can no longer vote to re-roll this")
                .setColor("RED");

              interaction.followUp({ embeds: [errEmbed1] });
            }
          }
        });

        function executeReroll() {
          const newRandomColor =
            "#" +
            ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
          rerollCustomId = newRandomColor;

          const roleChange = interaction.guild.roles.cache.find(
            (r) => r.id === roleChangeId
          );
          const channelSend = interaction.guild.channels.cache.find(
            (c) => c.id === announcementChannelId
          );

          const embed = new MessageEmbed()
            .setTitle("The mystery color of the week has been re-rolled!")
            .setDescription(
              "Click the button below to vote to reroll the color again"
            )
            .setColor(newRandomColor)
            .setTimestamp();

          const button = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId(newRandomColor)
              .setLabel("Vote to reroll")
              .setStyle("PRIMARY")
          );

          roleChange.edit({ color: newRandomColor });
          channelSend.send({ embeds: [embed], components: [button] });

          jsonReader("./json/colorChanged.json", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              let rerollArry = data.slice(0, 1);
              rerollArry.push(
                { rerolled: true },
                { customId: rerollCustomId },
                { respondedUsers: [] },
                { votes: 0 }
              );

              fs.writeFile(
                "./json/colorChanged.json",
                JSON.stringify(rerollArry),
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            }
          });
        }
      }
    }
  },
};
