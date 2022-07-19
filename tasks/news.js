import { MessageEmbed, Permissions } from "discord.js";
import fs from "fs";
import Parser from "rss-parser";
import moment from "moment";
import client from "../index.js";

export default async function news() {
    const parser = new Parser();
    const feed = await parser
        .parseURL(
            "https://www.pccsk12.com/Home/Components/RssFeeds/RssFeed/View?ctID=5&cateIDs=23"
        )
        .catch((err) => console.log(err));
    if (feed == undefined)
        return console.log("pcep website is bad lel 60second timeout");
    let data;
    fs.readFile("./json/news.json", "utf-8", (err, data0) => {
        if (err) {
            console.log(err);
        } else {
            data = JSON.parse(data0);
            let iteration = 0;
            let newsNumber = 0;
            for (let news in data) {
                if (feed.items[0].guid == data[iteration].guid) {
                    continue;
                } else {
                    newsNumber++;
                }
                iteration++;
            }
            if (newsNumber == data.length) {
                console.log("there is a new thing");
                const date = new Date();
                const embed = new MessageEmbed()
                    .setAuthor("P-CEP News Post")
                    .setTitle(`${feed.items[0].title.replace(/&nbsp;/g, "")}`)
                    .setURL(`${feed.items[0].link}`)
                    .setDescription(
                        `${feed.items[0].content.replace(/&nbsp;/g, "")}`
                    )
                    .setFooter(
                        `Retrieved • ${moment(date).format(
                            "MMMM Do YYYY, h:mm:ss a"
                        )}`
                    )
                    .setColor("BLURPLE");

                const guilds = client.guilds.cache.map((res) => {
                    return res;
                });
                fs.readFile("./settings.json", "utf-8", (err, res) => {
                    if (err) return console.log(err);
                    const data = JSON.parse(res);
                    for (const guild of guilds) {
                        if (data.hasOwnProperty(guild.id)) {
                            const channel = guild.channels.cache.find(
                                (c) => c.id === data[guild.id]
                            );
                            guild.members.fetch(client.user.id).then((bot) => {
                                if (
                                    !channel
                                        .permissionsFor(bot)
                                        .has(Permissions.FLAGS.SEND_MESSAGES)
                                )
                                    return;
                                if (channel.type == "GUILD_NEWS") {
                                    try {
                                        channel
                                            .send({ embeds: [embed] })
                                            .then((sent) => {
                                                try {
                                                    sent.crosspost()
                                                        .then(() =>
                                                            console.log(
                                                                "published"
                                                            )
                                                        )
                                                        .catch(console.error);
                                                } catch (err) {}
                                            });
                                    } catch (err) {}
                                } else {
                                    try {
                                        channel.send({ embeds: [embed] });
                                    } catch (err) {}
                                }
                            });
                        }
                    }
                });
                const pushData = { guid: feed.items[0].guid };
                let newData = data;
                newData.push(pushData);
                if (newData.length > 5) newData.shift();
                fs.writeFile(
                    "./json/news.json",
                    JSON.stringify(newData, null, 2),
                    (err) => {
                        if (err) console.log(err);
                    }
                );
            } else {
                return;
            }
        }
    });
}
