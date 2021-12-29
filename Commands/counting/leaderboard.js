const { MessageEmbed } = require('discord.js');
const fs = require ('fs');
module.exports = {
    name: 'leaderboard',
    description: 'Shows the top counters of this server',
    async execute(interaction) {
        fs.readFile('./json/counting.json', 'utf-8', (err, data0) => {
            if (err) {
                console.log(err);
            } else {
                let data = JSON.parse(data0);
                let top25 = []
                let iteration0 = 0;
                for (users in data[1].savedUsers) {
                    top25.push(data[1].savedUsers[iteration0].userId)
                    iteration0++;
                }
                top25.sort(function (a, b) {
                    var aNum = parseInt(a.count);
                    var bNum = parseInt(b.count);
                    return bNum - aNum;
                  });
                if (top25.length > 25 ) {
                    top25.slice(0, 24);
                }
                console.log(top25);
                let countersString = ''
                let iteration1 = 0; 
                for (users in top25) {
                    let prefix;
                    if (iteration1 == 0 || iteration1 == 20) {
                        prefix = 'st'
                    } else if (iteration1 == 1 || iteration1 == 21) {
                        prefix = 'nd'
                    } else if (iteration1 == 2 || iteration1 == 22) {
                        prefix = 'rd'
                    } else {
                        predix = 'th'
                    }
                    countersString = countersString + `**${iteration1 + 1}${prefix}** <@${top25[iteration1].id}>: **count:** ${top25[iteration1].count}\n`
                    iteration1++;
                }   
                const embed = new MessageEmbed() 
                    .setColor('RANDOM')
                    .setAuthor( 'P-CEP Counting Scoreboard', `${interaction.guild.iconURL({ dynamic: true }) }` )
                    .setDescription(countersString)
                    .setFooter(`Requested By ${interaction.user.tag}`)
                interaction.followUp({ embeds: [embed] })
            }
        })
    }
}