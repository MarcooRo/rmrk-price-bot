require('dotenv').config(); 

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const axios = require('axios');

axios.get('https://api.coingecko.com/api/v3/simple/price?ids=rmrk&vs_currencies=usd&include_24hr_change=true')
  .then(response => {
    console.log(response.data.rmrk);
    console.log(response.data.rmrk.usd);
    console.log(response.data.rmrk.usd_24h_change);
    let coin = 'RMRK';
    let price = response.data.rmrk.usd;
    let move = response.data.rmrk.usd_24h_change;
    $name = coin;
    $newActivity = coin+' '+price+'usd '+move.toFixed(2)+'%';
  })
  .catch(error => {
    console.log(error);
  });

client.on('ready', () => {
  // client.user.setUsername($name);
  client.user.setActivity($newActivity)
  console.log(`Logged in as ${$newActivity}`);
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token