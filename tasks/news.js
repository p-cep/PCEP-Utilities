// currently disabled, posting function is not implemented
const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const Parser = require("rss-parser");
const {
  newsChannelId,
  announcementsRoleId,
} = require("../settings.json");
const { guildId } = require('../config.json');
const moment = require("moment");
const client = require("../index.js");
async function news() {
  const parser = new Parser();
  const feed = await parser.parseURL(
    "https://www.pccsk12.com/Home/Components/RssFeeds/RssFeed/View?ctID=5&cateIDs=23"
  ).catch(err => console.log(err)) 
  let data;
  fs.readFile("./json/news.json", "utf-8", (err, data0) => {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(data0);
      if (feed.items[0].guid == data.guid) {
        return;
      } else {
        console.log("there is a new thing");
        const date = new Date();
        const embed = new MessageEmbed()
          .setAuthor("P-CEP News Post")
          .setTitle(`${feed.items[0].title.replace( /&nbsp;/g, '')}`)
          .setURL(`${feed.items[0].link}`)
          .setDescription(`${feed.items[0].content.replace( /&nbsp;/g, '')}`)
          .setFooter(
            `Retrieved • ${moment(date).format("MMMM Do YYYY, h:mm:ss a")}`
          )
          .setColor("BLURPLE");

        const guild = client.guilds.cache.get(guildId);
        const channel = guild.channels.cache.find(
          (c) => c.id === newsChannelId
        );
        channel
          .send({ content: `<@&${announcementsRoleId}>`, embeds: [embed] })
          .then((sent) => {
            sent
              .crosspost()
              .then(() => console.log("published"))
              .catch(console.error);
          });

        const pushData = { guid: feed.items[0].guid };
        fs.writeFile(
          "./json/news.json",
          JSON.stringify(pushData, null, 2),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
    }
  });
}
module.exports = news;
