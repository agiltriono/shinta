const { WelcomerCanvas } = require("../util/util");
module.exports = {
  name : "guildMemberAdd",
  async execute(member, client) {
    const guild = member.guild;
    const db = await client.db.get(guild.id);
    const opt = db.wc;
    const ch = opt.channel;
    const enable = opt.enable;
    const options = {
      member: member,
      message: opt.message,
      borderColor: opt.borderColor,
      welcomeColor: opt.welcomeColor,
      nameColor: opt.nameColor,
      messageColor: opt.messageColor,
      description: opt.description,
      font: opt.font,
      background: opt.background
    };
    const channel = client.channels.cache.get(ch);
    if (enable != true || !channel) return;
    const comer = new WelcomerCanvas(options);
    const well = await comer.render();
    await channel.send(well);
  }
}
