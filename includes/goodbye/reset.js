module.exports.execute = async function(interaction, client, userId) {
  const guild = interaction.guild
  const db = await client.db.get(guild.id)
  const wc = db.gb.m
  if (wc) await client.db.update([guild.id, "gb", "m"], {content: null,embeds: []});
  await interaction.update({content: null, embeds:[]})
}