const { Welcomer } = require("../util/util");
module.exports = {
  name : "guildMemberRemove",
  async execute(member, client) {
    const guild = member.guild;
    const db = await client.db.get(guild.id);
    const gb = db.gb;
    const msg = gb.m;
    const ch = gb.channel;
    const enable = gb.enable;
    const channel = client.channels.cache.get(ch);
    if (enable != true || !channel) return;
    const options = {
      member: member,
      content: msg.content,
      embeds: msg.embeds
    }
    const comer = new Welcomer(options)
    const well = await comer.render()
    if (!well) return;
    await channel.send(well)
  }
}
