const { MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const { embeds, ephemeral, color, clear } = require(".././../util/util");
const { getServerBitrate } = require(".././../util/perk");
module.exports.execute = async function(interaction, client) {
  await interaction.deferUpdate()
    // voice > game > channel
    // voice > game_creator
    // voice > game_interface
  const guild = interaction.guild
  const member = guild.members.cache.get(interaction.user.id);
  const voiceChannel = member.voice.channel;
  const msg = interaction.message
  const db = await client.db.get(guild.id)
  const vc = db.voice
  const game = vc.game[voiceChannel.id]
  const creator = vc.game_creator
  const category = vc.game_category
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
  await msg.edit({components: [row1,row2,button]})
  if (!voiceChannel) return msg.reply(embeds(`⚠️ <@${member.user.id}> **Join voice terlebih dahulu.**`)).then(m=> clear(m, 2000));
  const owner = game.child("owner").val()
  const param = interaction.values[0].split("_")
  const judul = param[0]
  const limit = parseInt(param[1])
  const main = guild.channels.cache.get(creator)
  if(voiceChannel.id != creator && !game.exists()) return msg.reply(embeds(`⚠️ <@${member.user.id}> kakak harus join dulu di **${main.name}**`)).then(m=> clear(m, 2000));
  if(voiceChannel.id != creator && game.exists() && owner === member.user.id) return msg.reply(embeds(`⚠️ <@${member.user.id}> kakak gak bisa ganti gaming channel!`)).then(m=> clear(m, 2000));
  if(voiceChannel.id != creator && game.exists() && owner != member.user.id) return msg.reply(embeds(`⚠️ Akses ditolak <@${member.user.id}> kakak bukan owner!`)).then(m=> clear(m, 2000));
  // Create Channel
  const channel = await guild.channels.create(
      `🎮🔸${judul}`,
      {
        type: 'GUILD_VOICE', 
        parent: category
      }
  );
  await channel.setUserLimit(limit)
  await channel.permissionOverwrites.set(main.permissionOverwrites.cache)
  await channel.permissionOverwrites.create(member.user.id, {
    "SEND_MESSAGES": true,
    "READ_MESSAGE_HISTORY": true,
    "ADD_REACTIONS": true,
    "EMBED_LINKS": true,
    "ATTACH_FILES": true,
    "USE_EXTERNAL_EMOJIS": true,
    "USE_APPLICATION_COMMANDS": true,
    "SEND_TTS_MESSAGES": true
  })
  // Add the channel id to the array of temporary channel ids.
  await client.db.update([guild.id, "voice", "game", channel.id], {owner: member.user.id})
  // Move the member to the new channel.
  await member.voice.setChannel(channel);
  
  await msg.reply(embeds(`☑️ Gaming Voice <#${channel.id}> untuk <@${member.user.id}> di buat.`)).then(m=> clear(m, 2000));
}
