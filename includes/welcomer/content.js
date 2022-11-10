const { MessageActionRow, Modal, TextInputComponent } = require("discord.js")
const { database, ephemeral } = require(".././../util/util");
const db = database.ref("guild")
module.exports.execute = async function(interaction, client, userId) {
  if (interaction.customId.includes("welcomer_modal_")) {
    const guild = interaction.guild
    const field = interaction.fields
    const value = field.getTextInputValue('welcomer_modal_content_input');
    await db.child(guild.id).child("wc").update({message: value})
    await interaction.reply(ephemeral("✅ Content di simpan, Klik *test* untuk melihat pratinjau."))
  } else {
    const modal = new Modal()
      .setCustomId('welcomer_modal_content_'+userId)
      .setTitle('Content')
      .addComponents([
        new MessageActionRow().addComponents(
          new TextInputComponent()
            .setCustomId('welcomer_modal_content_input')
            .setLabel('Content :')
            .setStyle('PARAGRAPH')
            .setPlaceholder('Halo, {member} Selamat datang di {server}, Kamu adalah member yang ke {memberCount}')
            .setRequired(true)
        )
      ]);
    await interaction.showModal(modal);
  }
}