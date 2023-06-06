// const { timeconvert } = require("../util/util");
const shuffle = require("../util/shuffle-array")
const customHandler = require("../util/customHandler")
const linkremover = require("../util/linkremover")
const help = require("../includes/help");
module.exports = {
  name : "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;
    if (!message.guild) return;
    const db = await client.db.get(message.guild.id);
    const blockedchannel = db.bc
    // TEMPORARY CHANNEL START
    const vc = db.voice
    // TEMPORARY CHANNEL END
    const prefix = db.prefix ? db.prefix : client.prefix;
    const cc = db.cc
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    const helpString = commandName == "help" || commandName == "h";
    const creator = {id:message.author.id};
    const viewsend = message.guild.me.permissions.has("VIEW_CHANNEL") && message.guild.me.permissions.has("SEND_MESSAGES");
    const manages = message.guild.me.permissions.has("MANAGE_MESSAGES") && message.guild.me.permissions.has("MANAGE_CHANNELS");
    const hasPerm = viewsend && manages;
    const str = message.content.toLowerCase()
    if ((str.includes("http://") || str.includes("https://")) && !command && command != helpString) {
      await linkremover(message, vc)
    }
    if(!command && command != helpString && cc.length) {
      let phrase = message.content.replace(/\n/g, ' ')
      let index = cc
      var checkisvc = (arr) => {
        // condition
        let isvc_enabled = vc.temp[message.channelId] && arr.allow_vc === true;
        let isvc_disabled = !vc.temp[message.channelId] && arr.channel.includes(message.channelId) && arr.allow_vc === false;
        let is_everywhere = !vc.temp[message.channelId] && arr.channel.includes(message.channelId) && arr.allow_vc === true;
        if (isvc_enabled || isvc_disabled || is_everywhere) {
          return 1;
        } else {
          return 0;
        }
      }
      for(let i = 0; i < index.length;i++) {
        if ((phrase.startsWith(index[i].trigger) && index[i].wildcard === false) || (phrase.toLowerCase().startsWith(index[i].trigger.toLowerCase()) && index[i].wildcard === false)) {
          if (checkisvc(index[i]) === 1) return customHandler(message, index[i])
          break;
        } else if ((phrase.includes(index[i].trigger) && index[i].wildcard === true) || (phrase.toLowerCase().includes(index[i].trigger.toLowerCase()) && index[i].wildcard === true)) {
          if (checkisvc(index[i]) === 1) return customHandler(message, index[i])
          break;
        }
      }
    }
    if ((/^<@(\w|!)[0-9]*>$/).test(message.content.toString())) {
      const usermention = message.content.toString().replace(/\!/gm, '');
      const botmention = `<@${message.client.user.id}>`;
      const isBotMention = botmention.length === usermention.length && usermention === botmention;
      
      if (isBotMention && viewsend) {
          const respond = [
            "@Shayang",
            "Idih Ngetag",
            "Kalo kangen bilang",
            "Apa sih aku cantik ya 🥰",
            "Kangen Bilang aja jangan maen tag. hih"
          ]
          return message.reply(shuffle.pick(respond, {'picks': 1}))
      }
    }
    if (!message.content.startsWith(prefix)) return;
    if (helpString && hasPerm) { 
        return help(message, client, args, creator, prefix);
      }
    if(!command && command != helpString) return;
    if (!hasPerm) return;
    if(blockedchannel && blockedchannel.includes(message.channel.id)) return;
    try {
        command.run(message, args, creator, prefix);
      
    } catch (error) {
      console.error(error);
    }
  }
}
