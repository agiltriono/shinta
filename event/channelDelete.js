module.exports = {
  name : "channelDelete",
  async execute(channel, client) {
    const channelId = channel.id
    const guild = channel.guild
    const db = await client.db.get(guild.id);
    const me = guild.members.cache.get(client.user.id);
    const vc = db.voice.temp[channelId]
    const game = db.voice.game[channelId]
    if (channel.type === "GUILD_VOICE" || channel.type === "GUILD_STAGE_VOICE") {
      if(vc) return await client.db.delete([guild.id, "voice", "temp", channelId]);
      if(game) return await client.db.delete([guild.id, "voice", "game", channelId]);
    }
  }
}
