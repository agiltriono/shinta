const { MessageActionRow, Modal, TextInputComponent } = require("discord.js");
const { ephemeral } = require(".././../util/util");
module.exports.execute = async function(interaction, client, userId) {
  if (interaction.customId.includes("welcomer_modal_")) {
    const guild = interaction.guild
    const field = interaction.fields
    const value = field.getTextInputValue('welcomer_modal_description_input');
    await client.db.update([guild.id, "wc"], {description: value})
    await interaction.reply(ephemeral("✅ Deskripsi di simpan, Klik *test* untuk melihat pratinjau."))
  } else {
    const modal = new Modal()
      .setCustomId('welcomer_modal_description_'+userId)
      .setTitle('Deskripsi')
      .addComponents([
        new MessageActionRow().addComponents(
          new TextInputComponent()
            .setCustomId('welcomer_modal_description_input')
            .setLabel('Deskripsi :')
            .setStyle('SHORT')
            .setPlaceholder('Contoh : HAVE A GOOD DAY!')
            .setRequired(true)
        )
      ]);
    await interaction.showModal(modal);
  }
}