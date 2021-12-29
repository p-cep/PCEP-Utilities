const countingChannelId = "896299895034634301"
const fs = require('fs');
module.exports = { 
    name: 'messageCreate', 
    async execute(message) { 
        if (message.channel.id != countingChannelId) return;
        fs.readFile('./json/counting.json', 'utf-8', (err, data0) => { 
            if (err) {
                console.log(err)
            } else { 
                let data = JSON.parse(data0);
                if (message.author.bot) return;
                if ((message.content != parseInt(data[0].currentCount) + 1) || message.author.id == parseInt(data[0].lastCounted)) {
                    message.delete();
                    return;
                } else {
                    message.react('✅');
                    const userId = message.author.id;
                    let iteration0 = 0; 
                    let neverCounted = true; 
                    for (users in data[1].savedUsers) {
                        if (data[1].savedUsers[iteration0].userId.id != message.author.id) {
                            iteration0++;
                            continue;
                        } else {
                            data[1].savedUsers[iteration0].userId.count = data[1].savedUsers[iteration0].userId.count + 1;
                            neverCounted = false; 
                        }
                        iteration0++;
                    }
                    if (neverCounted == true) {
                        data[1].savedUsers.push({userId: {"count": 1, "id": userId } });  
                    }
                    data[0].currentCount = parseInt(data[0].currentCount + 1);
                    data[0].lastCounted = message.author.id;
                    fs.writeFile("./json/counting.json", JSON.stringify(data), (err) => {
                        if (err) console.log(err);
                    })
                }
            }
        })
    }
}