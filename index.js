const Discord = require("discord.js");
const config = require('./config.json');
const client = new Discord.Client();
const fetch = require("node-fetch");

const commands = require("./commands");



client.on("ready", () => {
    console.log("Client is ready.")
    
    console.log(client)
    function sendPong(message) {
        message.channel.send("Pong");
    }
    
    const findSuperHero  = async (message) => {
        const { content } = message;
        const superHeroName = content.replace("!s ", "");
        const fetchURL = `https://superheroapi.com/api/${config.API_TOKEN}/search/${superHeroName}`;

        try {
            const response = await fetch(fetchURL, { method: "GET" });
            const respJson = await response.json();
            const finalResult = await respJson.results[0];

            const messageEmbed = new Discord.MessageEmbed({
                author: {
                    name: "Zuper",
                },
                color: "#CCC",
                fields: [
                    {
                        name: "Full Name",
                        value: finalResult.biography["full-name"]
                    },
                    {
                        name: "Place Of Birth",
                        value: finalResult.biography["place-of-birth"]
                    },
                    {
                        name: "First Appearance",
                        value: finalResult.biography["first-appearance"]
                    },
                    {
                        name: "Publisher",
                        value: finalResult.biography["publisher"]
                    },
                    {
                        name: "Work",
                        value: finalResult.work["occupation"]
                    },
                    {
                        name: "Relatives",
                        value: finalResult.connections["relatives"]
                    },
                    
                    {
                        name: "Intelligence",
                        value: finalResult.powerstats["intelligence"],
                        inline: true
                    },
                    {
                        name: "Strength",
                        value: finalResult.powerstats["strength"],
                        inline: true
                    },
                    {
                        name: "Speed",
                        value: finalResult.powerstats["speed"],
                        inline: true
                    },
                    {
                        name: "Durability",
                        value: finalResult.powerstats["durability"],
                        inline: true
                    },
                    {
                        name: "Power",
                        value: finalResult.powerstats["power"],
                        inline: true
                    },
                    {
                        name: "Combat",
                        value: finalResult.powerstats["combat"],
                        inline: true
                    },
                    
                ],
                image: {
                    url: finalResult.image.url,
                    height: 80,
                    width: 80,
                },
                title: finalResult.name
            })


            message.channel.send(messageEmbed);
        }
        catch(err) {
            message.channel.send("Superhero not found !!")
        }


    }


    commands(client, "ping", sendPong);

    commands(client, "s", findSuperHero);
})

client.login(config.token);