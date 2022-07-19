import fs from "fs";
import { MessageEmbed, Permissions } from "discord.js";
export default {
    name: "config",
    description: "Set the channel that pcep news will enter to",
    options: [
        {
            name: "channel",
            description: "The channel you would like the news to be posted in",
            type: "CHANNEL",
            required: true,
        },
    ],
    async execute(interaction, client) {
        await interaction.deferReply();
        if (
            !interaction.memberPermissions.has(Permissions.FLAGS.MANAGE_GUILD)
        ) {
            const err = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    "Oh no! You cannont use this command; you are missing the Manage Server permission."
                );
            return interaction.followUp({ embeds: [err] });
        }
        const channel = interaction.options.getChannel("channel");
        const botMember = await interaction.guild.members.fetch(client.user.id);
        if (
            !channel
                .permissionsFor(botMember)
                .has(Permissions.FLAGS.SEND_MESSAGES)
        ) {
            const err = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    "Oh no! P-CEP News does not have permission to send messages in this channel. Please add this permission to P-CEP News and try again, or try a different channel."
                );
            return interaction.followUp({ embeds: [err] });
        }
        fs.readFile("./json/settings.json", "utf-8", (err, res) => {
            if (err) console.log(err);
            const data = JSON.parse(res);
            data[interaction.guild.id] = channel.id;
            fs.writeFile(
                "./json/settings.json",
                JSON.stringify(data, null, 2),
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                    const success = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(
                            `Success! The news channel has been set to <#${channel.id}>!`
                        );
                    interaction.followUp({ embeds: [success] });
                }
            );
        });
    },
};
