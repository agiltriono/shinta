const { WelcomerCanvas } = require("../util/util");
module.exports = {
  name : "guildMemberAdd",
  async execute(member, client) {
    client.db.child(member.guild.id).once('value', async (server) => {
      const opt = server.child("wc");
      const ch = opt.child("channel").val()
      const enable = opt.child("enable").val()
      const options = {
        member: member,
        message: opt.child("message").val(),
        borderColor: opt.child("borderColor").val(),
        welcomeColor: opt.child("welcomeColor").val(),
        nameColor: opt.child("nameColor").val(),
        messageColor: opt.child("messageColor").val(),
        description: opt.child("description").val(),
        font: opt.child("font").val(),
        background: opt.child("background").val()
      }
      const channel = client.channels.cache.get(ch);
      if (enable != "yes" || !channel || options.numChildren() === 0) return;
      const comer = new WelcomerCanvas(options)
      const well = await comer.render()
      await channel.send(well)
    })
  }
}