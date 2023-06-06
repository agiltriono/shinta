module.exports = async function linkremover(msg, voice){
  const channelId = msg.channelId
  const vc = voice
  const game = vc.game[channelId]
  const temp = vc.temp[channelId]
  const vclink = vc.allow_link
  const content = msg.content.toLowerCase()
  if (temp && vclink) {
    const filter = vclink.trim().split(",");
    if(filter.length != 0 && !filter.some(c => content.includes(c))) return await msg.delete();
    return;
  } else if (game && vclink) {
    const filter = vclink.trim().split(",");
    if(filter.length != 0 && !filter.some(c => content.includes(c))) return await msg.delete();
    return;
  } else {
    return;
  }
}