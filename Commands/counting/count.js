const fs = require('fs');
const { MessageEmbed } = require('discord.js');
module.exports = { 
    name: 'count',
    description: 'Gets the current count',
    execute(interaction) {
        fs.readFile('./json/counting.json', 'utf-8', (err, data0) => {
            if (err) { 
                console.log(err);
            } else {
                let data = JSON.parse(data0); 
                const embed = new MessageEmbed()
                .setDescription(`Current Count: ${data[0].currentCount}`)
                .setColor('RANDOM');

                interaction.followUp({ embeds: [embed] });
            }
        })
    }
}