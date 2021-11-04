const fs = require("fs");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const client = require("../index.js");
const {
  initStartDay,
  resetStartDay, //the day the color change initiates, and the day the json is reset, thus closing the ability to reroll
  guildId,
  announcementChannelId,
  roleChangeId,
} = require("../settings.json");

function colorTask() {
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

  const date = new Date();
  if (date.getDay() == initStartDay) {
    jsonReader("./json/colorChanged.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data[0].colorchangedtoday == "false") {
          initColorChange();
          const colorChangedToday = [{ colorchangedtoday: "true" }];

          fs.writeFile(
            "./json/colorChanged.json",
            JSON.stringify(colorChangedToday),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    });
  } else if (date.getDay() == resetStartDay) {
    jsonReader("./json/colorChanged.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data[0].colorchangedtoday == "true") {
          let colorChangedToday = [{ colorchangedtoday: "false" }];
          fs.writeFile(
            "./json/colorChanged.json",
            JSON.stringify(colorChangedToday),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    });
  }

  function initColorChange() {
    const randomColor =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    console.log(randomColor);
    const embed = new MessageEmbed()
      .setTitle("The mystery color of the week has been changed!")
      .setDescription("Click the button below to vote to reroll the color")
      .setColor(randomColor)
      .setTimestamp();

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(randomColor)
        .setLabel("Vote to reroll")
        .setStyle("PRIMARY")
    );

    jsonReader("./json/colorChanged.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let newArry = data;
        newArry.push({ rerolled: false });
        newArry.push({ customId: `${randomColor}` });
        newArry.push({ respondedUsers: [] });
        newArry.push({ votes: 0 });
        fs.writeFile(
          "./json/colorChanged.json",
          JSON.stringify(newArry),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    });
    const roleChange = client.guilds.cache
      .get(guildId)
      .roles.cache.find((r) => r.id === roleChangeId);
    const channelSend = client.guilds.cache
      .get(guildId)
      .channels.cache.find((c) => c.id === announcementChannelId);

    roleChange.edit({ color: randomColor });
    channelSend.send({ embeds: [embed], components: [button] });
  }
}

module.exports = colorTask;
