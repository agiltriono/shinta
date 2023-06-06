const { MessageActionRow, Modal, TextInputComponent } = require("discord.js")
const { ephemeral } = require(".././../util/util");
module.exports.execute = async function(interaction, client, userId) {
  if (interaction.customId.includes("welcomer_modal_")) {
    const guild = interaction.guild
    const field = interaction.fields
    const value = field.getTextInputValue('welcomer_modal_messageColor_input');
    await client.db.update([guild.id, "wc"], {messageColor: value})
    await interaction.reply(ephemeral("✅ Warna di simpan, Klik *test* untuk melihat pratinjau."))
  } else {
    const modal = new Modal()
      .setCustomId('welcomer_modal_messageColor_'+userId)
      .setTitle('Warna Deskripsi')
      .addComponents([
        new MessageActionRow().addComponents(
          new TextInputComponent()
            .setCustomId('welcomer_modal_messageColor_input')
            .setLabel('Warna :')
            .setStyle('SHORT')
            .setPlaceholder('Contoh : #FFFFFF')
            .setRequired(true)
        )
      ]);
    await interaction.showModal(modal);
  }
}