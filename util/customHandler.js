/*[name] {
  trigger: "",
  type : "",
  response: "",
  whitelist: ""
}*/
module.exports = async function customHandler(msg, auto) {
  const cc = auto
  const type = cc.type
  const content = cc.content
  const embed = cc.embed
  //const reaction = cc.reaction
  //const channel = cc.channel
  if(!content || !embed || !type) return;
  if (type == "content") {
    return msg.channel.send(content)
  } else if (type == "embeds") {
    return msg.channel.send({embeds: [embed]})
  } if (type == "reaction") {
    // todo Reaction response
  }
};
