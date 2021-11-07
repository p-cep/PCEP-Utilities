const { MessageEmbed } = require('discord.js');
const puppeteer = require('puppeteer');
module.exports = {
    name: "weather",
    description: "Get Weather Data from a weather station near P-CEP",
    async execute(interaction) {

        async function scrapeWeather(url) {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);

            const [t] = await page.$x('//*[@id="main-page-content"]/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[1]/div[1]/lib-display-unit/span/span[1]')
            const txtT = await t.getProperty('textContent');
            const rT = await txtT.jsonValue();

            const [fL] = await page.$x('//*[@id="main-page-content"]/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[1]/div[2]/lib-display-unit/span')
            const txtFL = await fL.getProperty('textContent');
            const rFL = await txtFL.jsonValue();

            const [wDIR] = await page.$x('//*[@id="main-page-content"]/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[2]/div/div[1]/span')
            const txtWDIR = await wDIR.getProperty('textContent');
            const rWDIR = await txtWDIR.jsonValue();

            const [wS] = await page.$x('//*[@id="main-page-content"]/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[3]/div/div[2]/lib-display-unit[1]/span/span[1]')
            const txtWS = await wS.getProperty('textContent');
            const rWS = await txtWS.jsonValue();

            const [wG] = await page.$x('//*[@id="main-page-content"]/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[3]/div/div[2]/lib-display-unit[1]/span/span[1]')
            const txtWG = await wG.getProperty('textContent');
            const rWG = await txtWG.jsonValue();

            const rWSG = `${rWS} / ${rWG} mph`;

            const [d] = await page.$x('//*[@id="main-page-content"]/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[4]/div[1]/div/div[2]/lib-display-unit/span')
            const txtD = await d.getProperty('textContent');
            const rD = await txtD.jsonValue();

            const [pres] = await page.$x('//*[@id="main-page-content"]/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[4]/div[3]/div/div[2]/lib-display-unit/span/span[1]')
            const txtPres = await pres.getProperty('textContent');
            const rPres = await txtPres.jsonValue();

            const [pcpR] = await page.$x('//*[@id="main-page-content"]/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[4]/div[5]/div/div[2]/lib-display-unit/span/span[1]')
            const txtPcpR = await pcpR.getProperty('textContent');
            const rPcpR = await txtPcpR.jsonValue();

            const [pcpT] = await page.$x('//*[@id="main-page-content"]/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[4]/div[5]/div/div[2]/lib-display-unit/span/span[1]')
            const txtPcpT = await pcpT.getProperty('textContent');
            const rPcpT = await txtPcpT.jsonValue();

            const [h] = await page.$x('//*[@id="main-page-content"]/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[4]/div[4]/div/div[2]/lib-display-unit/span/span[1]')
            const txtH = await h.getProperty('textContent');
            const rH = await txtH.jsonValue();

            browser.close();

            let color = null
            if (rFL < 40) {
                color = 'BLUE';
            } else if (rFL > 80) {
                color = 'RED';
            } else {
                color = 'GREEN';
            }
            const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Current Weather Data')
                .setDescription('This weather Data was retrieved just now from a weather station right next to P-CEP')
                .addFields(
                    {
                        name: "Temperature",
                        value: `Temperature: ${rT}°F\nFeels Like: ${rFL}F`,
                    },
                    {
                        name: "Wind",
                        value: `Direction: ${rWDIR}\nWind Speed/Gust: ${rWSG}`,
                    },
                    {
                        name: "Pressure",
                        value: `Pressure: ${rPres} in`,
                    },
                    {
                        name: "Precipitation",
                        value: `Precipitation Rate: ${rPcpR} in/hr\nTotal Precipitation: ${rPcpT} in`,
                    },
                    {
                        name: "Humidity",
                        value: `Humidity: ${rH} %`,
                    }
                );
                interaction.followUp({ embeds: [embed] });
        } 

        scrapeWeather('https://www.wunderground.com/dashboard/pws/KMICANTO99/graph/2021-11-7/2021-11-7/daily')
    }
}