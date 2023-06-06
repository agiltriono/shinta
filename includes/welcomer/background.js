const { MessageActionRow, Modal, TextInputComponent } = require("discord.js")
const { ephemeral } = require(".././../util/util");
module.exports.execute = async function(interaction, client, userId) {
  const guild = interaction.guild
  if (interaction.customId.includes("welcomer_modal_")) {
    const field = interaction.fields
    const value = field.getTextInputValue('welcomer_modal_background_input');
    await client.db.update([guild.id, "wc"], {background: value})
    await interaction.reply(ephemeral("✅ Deskripsi di simpan, Klik *test* untuk melihat pratinjau."))
  } else {
    const modal = new Modal()
      .setCustomId('welcomer_modal_background_'+userId)
      .setTitle('Background')
      .addComponents([
        new MessageActionRow().addComponents(
          new TextInputComponent()
            .setCustomId('welcomer_modal_background_input')
            .setLabel('Url/Link Image')
            .setStyle('SHORT')
            .setPlaceholder('https://example.com/welcome.png')
            .setRequired(true)
        )
      ]);
    await interaction.showModal(modal);
  }
}