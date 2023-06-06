const { embeds, ephemeral } = require(".././../util/util")
module.exports.execute = async function(interaction, client) {
  // voice > game > userId
  await interaction.deferReply({ephemeral: true});
  const guild = interaction.guild
  const member = guild.members.cache.get(interaction.user.id);
  const voiceChannel = member.voice.channel;
  if (!voiceChannel) return interaction.editReply(ephemeral("⚠️ **Please join voice terlebih dahulu.**"));
  const db = await client.db.get(guild.id)
  var vc = db.voice
  var game = vc.game[voiceChannel.id]
  if(!game) return interaction.editReply(ephemeral(`⛔ Kamu gak join di creator voice **${client.user.username}**!`));
  var owner = game.owner
  if (owner == interaction.user.id) return interaction.editReply(ephemeral("⚠️ Kamu sudah memiliki hak akses **Owner**!"));
  let channel = interaction.guild.channels.resolve(voiceChannel.id)
  let isEmpty = channel.members.filter(member=> member.user.id === owner).size
  if (isEmpty != 0) return interaction.editReply(ephemeral("⚠️ Akses ditolak! Maaf tapi **Owner** masih ada di voice!"))
  await client.db.update([guild.id, "voice", "game", voiceChannel.id], {
    owner:member.user.id
  })
  await interaction.editReply(ephemeral(`🔑 Hak akses di berikan! sekarang kamu adalah **Owner**`));
}
