const { embeds, getmsg, clear, remove, color } = require(".././../util/util");
const { MessageButton } = require("discord.js");

module.exports.help = {
    name: "setup-interface",
    aliases: ["set-ic"],
    usage:"",
    category: "Auto Channel",
    permissions: ["ADMINISTRATOR"],
    description: "Set interface untuk mengelola voice channel."
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}
module.exports.run = async function(msg, args, creator, prefix) {
  await msg.delete()
  // claim, unlock, lock, hide, unhide, region, limit, trust, block, kick, rename, untrust, unblock, info
  const permis = [
    (msg.member.permissions.has("ADMINISTRATOR")),
    (msg.member.permissions.has("MANAGE_GUILD")),
    (creator.id === msg.guild.ownerId)
  ].filter(u=>u.toString() != "false")
  if(permis.length === 0) return;
  if (!msg.guild.me.permissions.has("SEND_MESSAGES")) return msg.channel.send(embeds("❌ Aku butuh permissions `SEND_MESSAGES`")).then(m=> clear(m, 3000));
  const name = [
    {id: "claim", emoji: "<:sh_claim:1038936992139989083>",description:"Klaim Ownership channel."},
    {id: "rename", emoji: "<:sh_rename:1039122768811274250>",description:"Ganti nama Voice Channel."},
    {id: "bitrate", emoji: "<:sh_bitrate:1038905725965045780>",description:"Setel bitrate pada channel."},
    {id: "limit", emoji: "<:sh_limit:1039122952010072105>",description:"Setel batas maksimal jumlah member."},
    {id: "region", emoji: "<:sh_region:1038905771733307503>",description:"Mengganti region channel."},
    {id: "trust", emoji: "<:sh_trust:1039122481048469514>",description:"Tambahkan member pada daftar Trusted Member."},
    {id: "untrust", emoji: "<:sh_untrust:1039122995580522587>",description:"Hapus member dari daftar Trusted Member."},
    {id: "block", emoji: "<:sh_block:1039122684405108757>",description:"Tambahkan member ke daftar Blocked Member."},
    {id: "unblock", emoji: "<:sh_unblock:1039122652461277200>",description:"Hapus member dari daftar Blocked Member."},
    {id: "lock", emoji: "<:sh_lock:1039122915720970302>", description:"Kunci channel."},
    {id: "unlock", emoji: "<:sh_unlock:1039122877888352266>",description:"Buka kunci channel."},
    {id: "hide", emoji: "<:sh_hide:1039122810670419968>",description:"Sembunyikan channel."},
    {id: "unhide", emoji:"<:sh_unhide:1039122844459737138>",description: "Perlihatkan channel."},
    {id: "kick", emoji: "<:sh_kick:1039122620139978782>",description:"Kick member dari channel."},
    {id: "info", emoji: "<:sh_info:1039122720237035591>",description:"Lihat info tentang channel."}
  ]
  const exclude = ["hide","unhide"]
  const information = name.filter(c=>!exclude.includes(c.id)).map(command=>{
    return {
      name: `${command.emoji} ${command.id.capitalize()}`,
      value: command.description
    }
  })
  const button = name.map(name => {
    if (exclude.includes(name.id)) {
      return new MessageButton().setCustomId("imut_vc_interface_"+name.id)
      //.setLabel(name.id.capitalize())
      .setEmoji(name.emoji)
      .setStyle("SECONDARY")
      .setDisabled(true)
    } else {
      return new MessageButton().setCustomId("imut_vc_interface_"+name.id)
      //.setLabel(name.id.capitalize())
      .setEmoji(name.emoji)
      .setStyle("SECONDARY")
    } 
  })
  function chunk(obj, i) {
    let chunks = [];
    while(obj.length){
      chunks.push({
        type: 1,
       components: obj.splice(0, i)
      });
    }
    return chunks;
  }
  const row = chunk(button, 5)
  const contents = {
    embeds: [{
      color: color(),
      title: msg.client.user.username + ' Interface',
      fields: information,
      footer: {
        text: `discord.gg/imutserver`,
        icon_url: msg.client.user.displayAvatarURL({dynamic:true})
      }
    }],
    components: row
  }
  /* 
    All 3: <(?::\w+:|@!*&*|#)[0-9]+>
    emote: <:\w+:[0-9]+>
    @mention: <@!*&*[0-9]+>
    #channel: <#[0-9]+>
  */
  const ch = /^[0-9]*$/;
  const rgx = /[\\<>@#&!]/gm
  if (ch.test(args[0])) {
    let mention = args[0]
    let channel = msg.guild.channels.cache.get(mention)
    if(!channel) return msg.reply(embeds("❌ Channel tidak ditemukan!"));
    if (channel.type != "GUILD_TEXT") return msg.reply(embeds("❌ Channel bukan *Text Channel*"));
    await channel.send(contents)
    await msg.channel.send(embeds(`✅ Interface berhasil di buat pada <#${channel.id}>`))
  } else if (args[0] != undefined && args[0].toLowerCase() === "help") {
    await msg.channel.send(embeds(`🛠 **Setup Interface**\n\`${prefix}setup-interface ID_CHANNEL\``));
  } else {
    await msg.channel.send(embeds(`❌ **Salah perintah**\nTry It : \`${prefix}setup-interface help\``))
  }
}
