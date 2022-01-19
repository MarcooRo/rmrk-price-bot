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

bot.on('messageCreate', msg => {
  if (msg.content === '!rmrk') {
    (async ()=>{
      let resultPriceMessage = await requstPrice()
      console.log('setActivity: '+resultPriceMessage)
      console.log('----------------------')
      msg.reply(resultPriceMessage)
    })();
}});


// function requstPriceCoin(coinAsk) {
//   return new Promise(resolve => {
//     axios.get('https://api.coingecko.com/api/v3/simple/price?ids='+coinAsk+'&vs_currencies=usd&include_24hr_change=true')
//     .then(response => {
//       var coin = response.data
//       console.log(coin)
//       var price = response.data.coinAsk.usd
//       console.log(price)
//       var move = response.data.coinAsk.usd_24h_change
//       console.log(move)
//       var newActivityCoin = coin+' $'+price+' '+move.toFixed(2)+'%'
//       console.log('----------------------')
//       console.log('newActivityCoin: '+newActivityCoin)
//       resolve(newActivityCoin)
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   });
// };

// bot.on('messageCreate', msg => {
//   (async ()=>{
//     let resultPriceMessageCoin = await requstPriceCoin(msg.content)
//     console.log('coinAsk: '+msg.content+ 'resultPriceMessage')
//     console.log('----------------------')
//     msg.reply(resultPriceMessageCoin)
//   })();
// });


//make sure this line is the last line
bot.login(process.env.CLIENT_TOKEN); //login bot using token