const { database, embeds, ephemeral, WelcomerCanvas } = require(".././../util/util")
const { MessageButton } = require("discord.js")
const db = database.ref("guild")
module.exports.execute = async function(interaction, client, userId) {
  await interaction.deferReply()
  const guild = interaction.guild
  const member = interaction.guild.members.cache.get(userId)
  var row = {
    type: 1,
    components: [
      new MessageButton().setCustomId('welcomer_button_close_'+userId).setLabel("Dismis").setEmoji("🗑").setStyle('DANGER')
    ]
  } 
  db.child(guild.id).once('value', async (server) => {
    const opt = server.child("wc");
    const options = {
      member: interaction.guild.members.cache.get(userId),
      message: opt.child("message").val(),
      borderColor: opt.child("borderColor").val(),
      welcomeColor: opt.child("welcomeColor").val(),
      nameColor: opt.child("nameColor").val(),
      messageColor: opt.child("messageColor").val(),
      description: opt.child("description").val(),
      font: opt.child("font").val(),
      background: opt.child("background").val()
    }
    const comer = new WelcomerCanvas(options)
    const well = await comer.render()
    await interaction.editReply(Object.assign({},well, {components: [row]}))
  })
}