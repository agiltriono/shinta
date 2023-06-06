const { WelcomerCanvas } = require(".././../util/util")
const { MessageButton } = require("discord.js")
module.exports.execute = async function(interaction, client, userId) {
  await interaction.deferReply()
  const guild = interaction.guild
  // const member = interaction.guild.members.cache.get(userId)
  const db = await client.db.get(guild.id)
  var row = {
    type: 1,
    components: [
      new MessageButton().setCustomId('welcomer_button_close_'+userId).setLabel("Dismis").setEmoji("🗑").setStyle('DANGER')
    ]
  } 
  const opt = db.wc;
  const options = {
    member: interaction.guild.members.cache.get(userId),
    message: opt.message,
    borderColor: opt.borderColor,
    welcomeColor: opt.welcomeColor,
    nameColor: opt.nameColor,
    messageColor: opt.messageColor,
    description: opt.description,
    font: opt.font,
    background: opt.background
  }
  const comer = new WelcomerCanvas(options)
  const well = await comer.render()
  await interaction.editReply(Object.assign({},well, {components: [row]}))
}