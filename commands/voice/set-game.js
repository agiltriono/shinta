const { embeds, getmsg, clear, remove, color } = require(".././../util/util"); 
const { MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");

module.exports.help = {
    name: "setup-gaming",
    aliases: ["set-game"],
    usage:"",
    category: "Auto Channel",
    permissions: ["ADMINISTRATOR"],
    description: "Set creator channel untuk member dapat membuat channel secara otomatis"
}

module.exports.run = async function(msg, args, creator, prefix) {
  await msg.delete()
  // ID_CHANNEL
  const permis = [
    (msg.member.permissions.has("ADMINISTRATOR")),
    (msg.member.permissions.has("MANAGE_GUILD")),
    (creator.id === msg.guild.ownerId)
  ].filter(u=>u.toString() != "false")
  if(permis.length === 0) return;
  if (!msg.guild.me.permissions.has("SEND_MESSAGES")) return msg.channel.send(embeds("❌ Aku butuh permissions `SEND_MESSAGES`")).then(m=> clear(m, 3000));
  
  // SETTING
/*
Pc games
Dota = 5
Apex Legend = 3
Counter Strike = 5
Point Blank = 8
Valorant = 5
Minecraft = 30
PUBG = 4
GTA san = 30
GTA V = 30
*/
  const pcGames = [
    {label: "Dota", value: "Dota_5",description:"Channel Limit 5 Member."},
    {label: "Apex Legend", value: "Apex Legend_5",description:"Channel Limit 3 Member."},
    {label: "Counter Strike", value: "Counter Strike_5",description:"Channel Limit 5 Member."},
    {label: "Point Blank", value: "Point Blank_8",description:"Channel Limit 8 Member."},
    {label: "Valorant", value: "Valorant_5",description:"Channel Limit 5 Member."},
    {label: "Minecraft", value: "Minecraft_30",description:"Channel Limit 30 Member."},
    {label: "PUBG", value: "PUBG_4",description:"Channel Limit 4 Member."},
    {label: "GTA San Andreas", value: "GTA SAN_30",description:"Channel Limit 30 Member."},
    {label: "GTA V", value: "GTA V_30",description:"Channel Limit 30 Member."}
  ]
/*
Mobile Games
Among Us = 15
Mobile Legend = 5
PubgM = 4
Stumble Guy = 32
Free Fire = 4
Codm = 4
Apex Legend M = 3
  */
  const mGames = [
    {label: "Among Us", value: "Among Us_15",description:"Channel Limit 15 Member."},
    {label: "Mobile Legends", value: "Mobile Legends_5",description:"Channel Limit 5 Member."},
    {label: "PUBG Mobile", value: "PUBG Mobile_4",description:"Channel Limit 4 Member."},
    {label: "Stumble Guy", value: "Stumble Guy_32",description:"Channel Limit 32 Member."},
    {label: "Free Fire", value: "Free Fire_4",description:"Channel Limit 4 Member."},
    {label: "Call Of Duty Mobile", value: "Call Of Duty Mobile_4",description:"Channel Limit 4 Member."},
    {label: "Apex Legend Mobile", value: "Apex Legend Mobile_3",description:"Channel Limit 3 Member."}
  ]
  // const JudulChannel = split("_")[0]
  // const Jumlah = split("_")[1]
  const button = new MessageActionRow().addComponents([
    new MessageButton().setCustomId("imut_game_button_claim")
    .setLabel("Claim")
    .setEmoji("<:sh_claim:1038936992139989083>")
    .setStyle("SECONDARY"),
    new MessageButton().setCustomId("imut_game_button_bitrate")
    .setLabel("Bitrate")
    .setEmoji("<:sh_bitrate:1038905725965045780>")
    .setStyle("SECONDARY"),
    new MessageButton().setCustomId("imut_game_button_region")
    .setLabel("Region")
    .setEmoji("<:sh_region:1038905771733307503>")
    .setStyle("SECONDARY")
  ])
  const row1 = new MessageActionRow().addComponents(new MessageSelectMenu()
    .setCustomId(`imut_game_selectmenu_select_1`)
    .setPlaceholder(`PC Game`)
    .addOptions(pcGames))
  const row2 = new MessageActionRow().addComponents(new MessageSelectMenu()
    .setCustomId(`imut_game_selectmenu_select_2`)
    .setPlaceholder(`Mobile Game`)
    .addOptions(mGames))
  // ━━┫𝙑𝙊𝙄𝘾𝙀 𝙂𝘼𝙈𝙀𝙎
  const cat = await msg.guild.channels.create("━━┫𝙑𝙊𝙄𝘾𝙀 𝙂𝘼𝙈𝙀𝙎",{
    type: "GUILD_CATEGORY",
    permissionOverwrites: [
      {
        id: msg.guild.roles.everyone.id,
        deny: ["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY","ADD_REACTIONS","EMBED_LINKS","ATTACH_FILES","USE_EXTERNAL_EMOJIS","USE_APPLICATION_COMMANDS","SEND_TTS_MESSAGES"]
      }
    ]
  })
  const tc = await msg.guild.channels.create("🎮 Setting Gaming Voice",{
    type: "GUILD_TEXT",
    parent: cat,
    permissionOverwrites: [
      {
        id: msg.guild.roles.everyone.id,
        deny: ["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY","ADD_REACTIONS","EMBED_LINKS","ATTACH_FILES","USE_EXTERNAL_EMOJIS","USE_APPLICATION_COMMANDS","SEND_TTS_MESSAGES"]
      }
    ]
  })
  const vc = await msg.guild.channels.create("➕ Creator Voice",{
    type: "GUILD_VOICE",
    parent: cat,
    permissionOverwrites: [
      {
        id: msg.guild.roles.everyone.id,
        deny: ["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY","ADD_REACTIONS","EMBED_LINKS","ATTACH_FILES","USE_EXTERNAL_EMOJIS","USE_APPLICATION_COMMANDS","SEND_TTS_MESSAGES"]
      }
    ]
  })
  await tc.send({
    embeds: [{
      color: color(),
      title: msg.client.user.username + ' Gaming Interface',
      description: `Voice di gunakan buat Mabar temen .\ncara menggunakan masuk ke **${vc.name}** dan pilih game sesuai yg kalian main`,
      footer: {
        text: `discord.gg/imutserver`,
        icon_url: msg.client.user.displayAvatarURL({dynamic:true})
      }
    }],
    components: [row1, row2, button]
  })
  await msg.client.db.update([msg.guild.id, "voice"], {
    game_category: cat.id,
    game_creator: vc.id,
    game_interface: tc.id
  })
  await msg.channel.send(embeds(`✅ Gaming Channel berhasil di buat.`))
}
