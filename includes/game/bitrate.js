const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const { embeds, ephemeral, color } = require(".././../util/util")
const { getServerBitrate } = require(".././../util/perk")
module.exports.execute = async function(interaction, client) {
  // voice > game > userId
  const guild = interaction.guild
  const member = guild.members.cache.get(interaction.user.id);
  const voiceChannel = member.voice.channel;
  const db = await client.db.get(guild.id)
  var vc = db.voice
  var game = vc.game[voiceChannel.id]
  if (interaction.customId.includes("imut_game_selectmenu_")) {
    const value = interaction.values[0]
    const option = [{
      label: "none",
      value: "none"
    }]
    const menu = new MessageActionRow().addComponents(new MessageSelectMenu()
    .setCustomId("imut_game_selectmenu_bitrate")
    .setPlaceholder(`${value.slice(0, -3)} Bps`)
    .addOptions(option).setDisabled(true));
    await interaction.guild.channels.resolve(voiceChannel.id).setBitrate(parseInt(value))
    await interaction.update(Object.assign({}, ephemeral(`✅ Bitrate untuk ${voiceChannel.name} di ubah ke ${value.slice(0, -3)}bps.`), {components: [menu]}));
  } else {
    if (!voiceChannel) return interaction.reply(ephemeral("⚠️ **Please join voice terlebih dahulu.**"));
    if(!game) return interaction.reply(ephemeral(`⛔ Kamu gak join di creator voice **${client.user.username}**!`));
    var owner = game.owner
    if (owner != interaction.user.id) return interaction.reply(ephemeral("⚠️ Akses ditolak! Kamu bukan owner!"));
    const option = await getServerBitrate(interaction.guild.premiumTier)
    const menu = new MessageActionRow().addComponents(new MessageSelectMenu()
      .setCustomId("imut_game_selectmenu_bitrate")
      .setPlaceholder(`Pilih Bitrate`)
      .addOptions(option));
    const custom = {
      embeds: [{
        color: color(),
        description: `**__INFORMATION__**\n\n*Bps (*Bitrate Per-Second*) yang tersedia tergantung dari boost level perks.*`
      }],
      components: [menu],
      ephemeral: true
    }
     await interaction.reply(custom)
  }
}
