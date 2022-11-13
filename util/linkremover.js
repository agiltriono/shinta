module.exports = async function linkremover(msg, voice){
  const channelId = msg.channelId
  const vc = voice
  const game = vc.child("game").child(channelId)
  const temp = vc.child("temp").child(channelId)
  const vclink = vc.child("allow_link")
  const content = msg.content.toLowerCase()
  if (temp.exists() && vclink.exists()) {
    const filter = vclink.val().trim().split(",");
    if(filter.length != 0 && !filter.some(c => content.includes(c))) return await msg.delete();
    return;
  } else if (game.exists() && vclink.exists()) {
    const filter = vclink.val().trim().split(",");
    if(filter.length != 0 && !filter.some(c => content.includes(c))) return await msg.delete();
    return;
  } else {
    return;
  }
}