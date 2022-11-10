const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const fs = require("fs")
const path = require("path")
const { database, color } = require(".././../util/util");
const db = database.ref("guild")
module.exports.execute = async function(interaction, client, userId) {
  const guild = interaction.guild
  const member = interaction.guild.members.cache.get(interaction.user.id)
  if (interaction.customId.includes("welcomer_selectmenu_")) {
    const value = interaction.values[0]
    await db.child(guild.id).child("wc").update({ font : value })
    await interaction.update({embeds:[{description: `✅ Font saat ini menggunakan 🔤**${value.includes("_") ? value.split(".")[0].replace("_"," ") : value.split(".")[0]}**`}],components:[]})
  } else {
    await interaction.deferReply({ephemeral:true})
    const file = fs.readdirSync(path.join(__dirname, "..",".","..","src", "welcomer", "font")).filter(file=>file)
    var option = file.map(c => {
        const name = c.includes("_") ? c.split(".")[0].replace("_", " ") : c.split(".")[0]
        return {label: name,value: c, emoji: "🔤"}
    })
    if (option.length > 25) {
      const menu = await chunk(option, 25, userId);
      const custom = {
        components: menu,
        ephemeral: true
      }
      await interaction.editReply(custom)
    } else {
      const menu = new MessageActionRow().addComponents(new MessageSelectMenu()
        .setCustomId("welcomer_selectmenu_font_"+userId+"_1")
        .setPlaceholder(`Pilih Font`)
        .addOptions(option));
      const custom = {
        components: [menu],
        ephemeral: true
      }
      await interaction.editReply(custom)
    }
  }
}
async function chunk(obj, i, userId) {
  let chunks = [];
  let count = 0
  while(obj.length){
    count++;
    chunks.push(new MessageActionRow().addComponents(new MessageSelectMenu()
    .setCustomId(`welcomer_selectmenu_font_${userId}_${count}`)
    .setPlaceholder(`Pilih Font ${count}`)
    .addOptions(obj.splice(0,i))));
  }
  return chunks;
}