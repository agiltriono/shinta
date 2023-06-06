/*
nsfw: false,
id: '1035951956390318091',
name: 'XLAND',
rawPosition: 4,
rtcRegion: null,
bitrate: 64000,
userLimit: 0,
videoQualityMode: null,
lastMessageId: null,
rateLimitPerUser: 0
*/
const { ephemeral, color } = require(".././../util/util")
module.exports.execute = async function(interaction, client) {
  // voice > temp > userId
  await interaction.deferReply({ephemeral:true})
  const guild = interaction.guild
  const member = guild.members.cache.get(interaction.user.id);
  const voiceChannel = member.voice.channel;
  if (!voiceChannel) return interaction.editReply(ephemeral("⚠️ **Please join voice terlebih dahulu.**"));
  const db = await client.db.get(guild.id);
  const vc = db.voice;
  const temp = vc.temp[voiceChannel.id];
  if(!temp) return interaction.editReply(ephemeral(`⛔ Kamu gak join di creator voice **${client.user.username}**!`));
  var trusted = temp.trust
  var blocked = temp.block
  var ghost = temp.ghost
  var owner = temp.owner
  if (owner != interaction.user.id) return interaction.editReply(ephemeral("⚠️ Akses ditolak! Kamu bukan owner!"));
  let trust = trusted ? trusted.trim().split(",") : []
  let block = blocked ? blocked.trim().split(",") : []
  let channel = interaction.guild.channels.resolve(voiceChannel.id)
  let user = channel.members.filter(member=>!member.user.bot)
  let bot = channel.members.filter(member=>member.user.bot)
  let bitrate = channel.bitrate
  let limit = channel.userLimit
  let region = channel.rtcRegion != null ? channel.rtcRegion : "Automatic"
  let content = {
    embeds : [{
      color: color(),
      title: `Informasi Channel`,
      fields: [
      {name: "NAMA", value: `${channel.name}`},
      {name: "OWNER", value: `<@${owner}>`},
      {name: "MEMBER", value: `${user.size.toString()}`},
      {name: "BOT", value: `${bot.size.toString()}`},
      {name: "TRUSTED", value: `${trust.length}`},
      {name: "BLOCKED", value: `${block.length}`},
      {name: "REGION", value: `${region}`},
      {name: "LIMIT", value: `${limit}`},
      {name: "BITRATE", value: `${bitrate.toString().slice(0, -3)}bps`},
      {name: "VISIBLE", value: `${ghost == true ? "false" : "true"}`}
      ],
      footer: {
        text: "discord.gg/imutserver",
        icon_url: client.user.displayAvatarURL({dynamic:true})
      }
    }],
    ephemeral:true
  }
  await interaction.editReply(content);
}
