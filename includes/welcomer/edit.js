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
      new MessageButton().setCustomId('welcomer_button_test_'+userId).setEmoji("📨").setLabel("Test").setStyle('SUCCESS'),
      new MessageButton().setCustomId('welcomer_button_help_'+userId).setEmoji("❔").setLabel("Help").setStyle('PRIMARY'),
      new MessageButton().setCustomId('welcomer_button_close_'+userId).setLabel("Tutup").setEmoji("❌").setStyle('DANGER')
    ]
  }
  await interaction.update({
    embeds: [{
      title: "WELCOMER CANVAS",
      description: "Klik tombol help untuk info lebih lanjut.\nUntuk mengganti warna pada Canvas *lihat keterangan pada gambar*.\n**CATATAN :** Warna harus berbentuk decimal atau rgba contoh : `#FFFFFF` ATAU dapat mengunjungi `imagecolorpicker.com`",
      image: {
        url: "https://media.discordapp.net/attachments/1022568834307199068/1040046527097352192/Adobe_Express_20221110_0132240_1.png"
      }
    }],
    components: [row1,row2,row3]
  })
}