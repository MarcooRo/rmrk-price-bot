require('dotenv').config(); //initialize dotenv
const { Client, Intents } = require('discord.js');
// const Discord = require('discord.js'); //import discord.js

// const client = new Discord.Client(); //create new client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let name = 'test name'

client.on('ready', () => {
  console.log(`Logged in as ${name}!`);
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token