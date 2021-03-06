const client = require("../../index.js");
const { MessageEmbed } = require('discord.js')

module.exports = { 
    name: "kill",
    description: "'destroys' the client",
    execute(interaction) {
        const perms = interaction.member.roles.cache.some(r => r.name === 'Administrators') 
        
        const noPerms = new MessageEmbed()
        .setTitle("Error!")
        .setDescription("Oh no! you dont have permissions to use this command.")
        .setColor("RED");
        if (!perms) return interaction.followUp({ embeds: [noPerms] }); 

        interaction.followUp('The client has been killed');
        client.destroy();
        console.log(`The client has been killed by: ${interaction.user.username}`)
        process.exit();

    }
}