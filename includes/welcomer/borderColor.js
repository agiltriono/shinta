const { MessageActionRow, Modal, TextInputComponent } = require("discord.js")
const { database, ephemeral } = require(".././../util/util");
const db = database.ref("guild")
module.exports.execute = async function(interaction, client, userId) {
  if (interaction.customId.includes("welcomer_modal_")) {
    const guild = interaction.guild
    const field = interaction.fields
    const value = field.getTextInputValue('welcomer_modal_borderColor_input');
    await db.child(guild.id).child("wc").update({borderColor: value})
    await interaction.reply(ephemeral("✅ Warna di simpan, Klik *test* untuk melihat pratinjau."))
  } else {
    const modal = new Modal()
      .setCustomId('welcomer_modal_borderColor_'+userId)
      .setTitle('Warna Border')
      .addComponents([
        new MessageActionRow().addComponents(
          new TextInputComponent()
            .setCustomId('welcomer_modal_borderColor_input')
            .setLabel('Warna :')
            .setStyle('SHORT')
            .setPlaceholder('Contoh : #FFFFFF')
            .setRequired(true)
        )
      ]);
    await interaction.showModal(modal);
  }
}