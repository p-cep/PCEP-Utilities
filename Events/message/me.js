const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        /**if (message.content.toLowerCase().includes('<@!512063606750183429>')) {
            const user = message.guild.members.cache.find(u => u.id === '512063606750183429');
            if (!user.presence.activities[0].state) return;
            const status = user.presence.activities[0].state;
            if (status.toLowerCase().includes('homework')) {
                const programming = new MessageEmbed()
                    .setColor('RED')
                    .setDescription('pls don\'t ping me while im doing hw :)');
                return message.channel.send({ embeds: [programming] });
            }
        } */
        //if (message.author.id === '406629388059410434') {
            //if (message.content.toLowerCase().includes('bot') && message.content.toLowerCase().includes('bad')) {
           // return message.author.send("fix me pls");
           // }
       // }
    },
};