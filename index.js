require('dotenv').config(); 

const { Client, Intents } = require('discord.js');
const bot1 = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const bot2 = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const bot3 = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const axios = require('axios');

function requstPriceRMRK() {
  return new Promise(resolve => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=rmrk&vs_currencies=usd&include_24hr_change=true')
    .then(response => {
      var coin = 'RMRK'
      var price = response.data.rmrk.usd
      var move = response.data.rmrk.usd_24h_change
      var newActivity = coin+' $'+price+' '+move.toFixed(2)+'%'
      console.log('----------------------')
      console.log('update: '+newActivity)
      resolve(newActivity)
    })
    .catch(error => {
      console.log(error);
    });
  });
};

function requstPriceMOVR() {
  return new Promise(resolve => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=moonriver&vs_currencies=usd&include_24hr_change=true')
    .then(response => {
      var coin = 'MOVR'
      var price = response.data.moonriver.usd
      var move = response.data.moonriver.usd_24h_change
      var newActivity = coin+' $'+price+' '+move.toFixed(2)+'%'
      console.log('----------------------')
      console.log('update: '+newActivity)
      resolve(newActivity)
    })
    .catch(error => {
      console.log(error);
    });
  });
};

function requstPriceGLMR() {
  return new Promise(resolve => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=moonbeam&vs_currencies=usd&include_24hr_change=true')
    .then(response => {
      var coin = 'GLMR'
      var price = response.data.moonbeam.usd
      var move = response.data.moonbeam.usd_24h_change
      var newActivity = coin+' $'+price+' '+move.toFixed(2)+'%'
      console.log('----------------------')
      console.log('update: '+newActivity)
      resolve(newActivity)
    })
    .catch(error => {
      console.log(error);
    });
  });
};

async function updatePrice(){
  let resultPriceRMRK = await requstPriceRMRK();
  console.log('setActivity: '+resultPriceRMRK)
  console.log('----------------------')
  bot1.user.setActivity(resultPriceRMRK)

  let resultPriceMOVR = await requstPriceMOVR();
  console.log('setActivity: '+resultPriceMOVR)
  console.log('----------------------')
  bot2.user.setActivity(resultPriceMOVR)

  let resultPriceGLMR = await requstPriceGLMR();
  console.log('setActivity: '+resultPriceMOVR)
  console.log('----------------------')
  bot3.user.setActivity(resultPriceGLMR)
}

setInterval(function (){
  updatePrice()
}, 60000);

function requstPriceMessage(coinName) {
  var nameCoin = coinName;
  return new Promise(resolve => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids='+nameCoin+'&vs_currencies=usd&include_24hr_change=true')
    .then(response => {
      var price = response.data[nameCoin].usd
      var move = response.data[nameCoin].usd_24h_change    
      var answerCoinName = nameCoin+' $'+price+' '+move.toFixed(2)+'%'
      console.log('coinName: '+answerCoinName)
      resolve(answerCoinName)
    })
    .catch(error => {
      console.log(error);
    });
  });
};


bot1.on('messageCreate', msg => {
  var messaggio = msg.content
  var nameCoin = messaggio.replace("!", "");
  console.log('messaggio: '+nameCoin)
  if(messaggio == '!help'){
    var reply = 'You can ask the price in this way: !rmrk, !btc'
    msg.reply(reply)
  }
  if (nameCoin === 'rmrk') {
    (async ()=>{
      let resultPriceMessage = await requstPriceMessage('rmrk')
      console.log('setActivity: '+resultPriceMessage)
      console.log('----------------------')
      msg.reply(resultPriceMessage)
    })();
  }
  if (nameCoin === 'btc') {
    (async ()=>{
      let resultPriceMessage = await requstPriceMessage('bitcoin')
      console.log('setActivity: '+resultPriceMessage)
      console.log('----------------------')
      msg.reply(resultPriceMessage)
    })();
  }
});


bot2.on('messageCreate', msg => {
  var messaggio = msg.content
  var nameCoin = messaggio.replace("!", "");
  console.log('messaggio: '+nameCoin)
  if(messaggio == '!help'){
    var reply = 'You can ask the price in this way: !movr, !rome'
    msg.reply(reply)
  }
  if (nameCoin === 'movr') {
    (async ()=>{
      let resultPriceMessage = await requstPriceMessage('moonriver')
      console.log('setActivity: '+resultPriceMessage)
      console.log('----------------------')
      msg.reply(resultPriceMessage)
    })();
  }
  if (nameCoin === 'rome') {
    (async ()=>{
      let resultPriceMessage = await requstPriceMessage('rome')
      console.log('setActivity: '+resultPriceMessage)
      console.log('----------------------')
      msg.reply(resultPriceMessage)
    })();
  }
});


bot3.on('messageCreate', msg => {
  var messaggio = msg.content
  var nameCoin = messaggio.replace("!", "");
  console.log('messaggio: '+nameCoin)
  if(messaggio == '!help'){
    var reply = 'You can ask the price in this way: !glrm, !eth'
    msg.reply(reply)
  }
  if (nameCoin === 'glmr') {
    (async ()=>{
      let resultPriceMessage = await requstPriceMessage('moonbeam')
      console.log('setActivity: '+resultPriceMessage)
      console.log('----------------------')
      msg.reply(resultPriceMessage)
    })();
  }
  if (nameCoin === 'eth') {
    (async ()=>{
      let resultPriceMessage = await requstPriceMessage('ethereum')
      console.log('setActivity: '+resultPriceMessage)
      console.log('----------------------')
      msg.reply(resultPriceMessage)
    })();
  }
});


//make sure this line is the last line
bot1.login(process.env.CLIENT_TOKEN_1); //login bot 1 using token
bot2.login(process.env.CLIENT_TOKEN_2); //login bot 2 using token
bot3.login(process.env.CLIENT_TOKEN_3); //login bot 2 using token