const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "embed",
    description: 'idfk',
    options: [
        {
            name: "title",
            description: "set the title of the embed",
            type: "STRING",
            required: true,
        },
        {
            name: "description",
            description: "set the description of the embed",
            type: "STRING",
            required: false,
        },
        {
            name: "color",
            description: "define a color by using hex",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "default",
                    value: "DEFAULT",
                },
                {
                    name: "black",
                    value: "BLACK"
                },
                {
                    name: "greyple",
                    value: "GREYPLE"
                },
                {
                    name: "aqua",
                    value:"AQUA",
                },
                {
                    name: "dark aqua",
                    value: "DARK_AQUA",
                },
                {
                    name: "green",
                    value: "GREEN",
                },
                {
                    name: "dark green",
                    value: "DARK_GREEN"
                },
                {
                    name: "blue",
                    value: "BLUE",
                },
                {
                    name: "dark blue",
                    value: "DARK_BLUE",
                },
                {
                    name: "purple",
                    value: "PURPLE"
                },
                {
                    name: "dark purple",
                    value: "DARK_PURPLE"
                },
                {
                    name: "fuschia",
                    value: "FUSCHIA"
                },
                {
                    name: "luminous vivid pink",
                    value: "LUMNINOUS_VIVID_PINK"
                },
                {
                    name: "dark vivid pink",
                    value: "DARK_VIVID_PINK",
                },
                {
                    name: "gold",
                    value: "GOLD"
                },
                {
                    name: "dark gold",
                    value: "DARK_GOLD"
                },
                {
                    name: "orange",
                    value: "ORANGE",
                },
                {
                    name: "dark orange",
                    value: "DARK_ORANGE"
                },
                {
                    name: "red",
                    value: "RED"
                },
                {
                    name: "grey",
                    value: "GREY"
                },
                {
                    name: "dark grey",
                    value: "DARK_GREY"
                },
                {
                    name: "light grey",
                    value: "LIGHT_GREY"
                },
                {
                    name: "navy",
                    value: "NAVY"
                }, 
                {
                    name: "dark navy",
                    value: "dark navy"
                },
                {
                    name: "yellow",
                    value: "YELLOW",
                },
            ],
        },
        {
            name: "author",
            description: "include that you wrote it?",
            type: "BOOLEAN",
            required: false,
        },
        {
            name: "timestamp",
            description: "include a timestamp",
            type: "BOOLEAN",
            required: false,
        }
    ],

    async execute(interaction) {
        if (interaction.member.roles.cache.some(u => u.name === 'Administrators') || interaction.member.roles.cache.some(u => u.name === "MODERATORS")) {
            const title = interaction.options.getString('title');
            const description = interaction.options.getString('description');
            const optionalColor = interaction.options.getString(('color'));
            const defaultColor = "RANDOM";
            const includeAuthor = interaction.options.getBoolean('author');
            const includeTimestamp = interaction.options.getBoolean('timestamp');

            const embed = new MessageEmbed()
                .setTitle(title);

            if (description) embed.setDescription(description);
            if (optionalColor) { embed.setColor(`${optionalColor}`) }
            else { embed.setColor(defaultColor) };
            if (includeAuthor) embed.setAuthor(`${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }));
            if (includeTimestamp) embed.setFooter(`${moment(interaction.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`);

            interaction.channel.send({ embeds: [embed] })
            return interaction.followUp('done!');
        }
    },
};