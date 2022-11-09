const {  database, ephemeral } = require(".././../util/util")
const { MessageButton } = require("discord.js");
const db = database.ref("guild");
module.exports.execute = async function(interaction, client, userId) {
  const guild = interaction.guild
  var row1 = {
    type: 1,
    components: [
      new MessageButton().setCustomId('welcomer_button_content_'+userId).setEmoji("📝").setLabel("Deskripsi").setStyle('PRIMARY'),
      new MessageButton().setCustomId('welcomer_button_description_'+userId).setEmoji("🗒").setLabel("Deskripsi").setStyle('PRIMARY'),
      new MessageButton().setCustomId('welcomer_button_font_'+userId).setEmoji("🔤").setLabel("Font").setStyle('PRIMARY'),
      new MessageButton().setCustomId('welcomer_button_background_'+userId).setEmoji("🖼").setLabel("Background").setStyle('PRIMARY')
    ]
  }
  var row2 = {
    type: 1,
    components: [
      new MessageButton().setCustomId('welcomer_button_borderColor_'+userId).setEmoji("🎨").setLabel("Warna Avatar").setStyle('PRIMARY'),
      new MessageButton().setCustomId('welcomer_button_welcomeColor_'+userId).setEmoji("🎨").setLabel("Warna Welcome").setStyle('PRIMARY'),
      new MessageButton().setCustomId('welcomer_button_nameColor_'+userId).setEmoji("🎨").setLabel("Warna Username").setStyle('PRIMARY'),
      new MessageButton().setCustomId('welcomer_button_messageColor_'+userId).setEmoji("🎨").setLabel("Warna Deskripsi").setStyle('PRIMARY')
    ]
  }
  var row3 = {
    type: 1,
    components: [
      new MessageButton().setCustomId('welcomer_button_channel_'+userId).setEmoji("📢").setLabel("Channel").setStyle('PRIMARY'),
      new MessageButton().setCustomId('welcomer_button_reset_'+userId).setEmoji("♻️").setLabel("Reset").setStyle('PRIMARY'),
      new MessageButton().setCustomId('welcomer_button_test_'+userId).setEmoji("📨").setLabel("Test").setStyle('SUCCESS'),
      new MessageButton().setCustomId('welcomer_button_help_'+userId).setEmoji("❔").setLabel("Help").setStyle('PRIMARY'),
      new MessageButton().setCustomId('welcomer_button_close_'+userId).setLabel("Tutup").setEmoji("❌").setStyle('DANGER')
    ]
  }
  await interaction.update({
    embeds: [{
      Title: "WELCOMER SETTING",
      description: "Klik tombol help untuk info lebih lanjut."
      image: {
        url: 
      }
    }],
    components: [row1,row2,row3]
  })
}