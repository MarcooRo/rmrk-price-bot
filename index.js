require('dotenv').config(); 

const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const axios = require('axios');

function requstPrice() {
  return new Promise(resolve => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=rmrk&vs_currencies=usd&include_24hr_change=true')
    .then(response => {
      // console.log(response.data.rmrk)
      // console.log(response.data.rmrk.usd);
      // console.log(response.data.rmrk.usd_24h_change);
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

async function updatePrice(){
  let resultPrice = await requstPrice();
  console.log('setActivity: '+resultPrice)
  console.log('----------------------')
  bot.user.setActivity(resultPrice)
}

setInterval(function (){
  updatePrice()
}, 60000);


function requstPriceMessage(coinName) {
  var nameCoin = coinName;
  return new Promise(resolve => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids='+nameCoin+'&vs_currencies=usd&include_24hr_change=true')
    .then(response => {
      switch (nameCoin) {
        case 'rmrk':
          var price = response.data.rmrk.usd
          var move = response.data.rmrk.usd_24h_change
          break;
        case 'movr':
          var price = response.data.movr.usd
          var move = response.data.movr.usd_24h_change
          break;
        case 'glrm':
          var price = response.data.glrm.usd
          var move = response.data.glrm.usd_24h_change
          break;
        case 'bitcoin':
          var price = response.data.bitcoin.usd
          var move = response.data.bitcoin.usd_24h_change
          break;
        default:
          var price = 'sorry'
          var move = 'not found'
      }      
      var answerCoinName = nameCoin+' $'+price+' '+move.toFixed(2)+'%'
      console.log('coinName: '+answerCoinName)
      resolve(answerCoinName)
    })
    .catch(error => {
      console.log(error);
    });
  });
};



bot.on('messageCreate', msg => {

  var messaggio = msg.content
  var nameCoin = messaggio.replace("!", "");
  console.log('messaggio: '+nameCoin)

  if (nameCoin === 'rmrk') {
    (async ()=>{
      let resultPriceMessage = await requstPriceMessage('rmrk')
      console.log('setActivity: '+resultPriceMessage)
      console.log('----------------------')
      msg.reply(resultPriceMessage)
    })();
  }
  if (nameCoin === 'movr') {
    (async ()=>{
      let resultPriceMessage = await requstPriceMessage('movr')
      console.log('setActivity: '+resultPriceMessage)
      console.log('----------------------')
      msg.reply(resultPriceMessage)
    })();
  }
  if (nameCoin === 'glrm') {
    (async ()=>{
      let resultPriceMessage = await requstPriceMessage('glrm')
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




//make sure this line is the last line
bot.login(process.env.CLIENT_TOKEN); //login bot using token