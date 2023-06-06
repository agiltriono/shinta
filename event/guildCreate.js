module.exports = {
  name : "guildCreate",
  async execute(guild, client) {
    // Initial database
    client.db.update(guild.id, {
      [guild.id]: {
        "prefix": "sh.",
        "bc": "",
        "cc": [],
        "gb": {
          "enable": false,
          "m": {
            "content": null,
            "embeds": []
          }
        },
        "voice": {
          "allow_link": "youtube.com,youtu.be,soundcloud.com,spotify.com,tenor.com",
          "creator": "",
          "game_category": "",
          "game_creator": "",
          "game_interface": "",
          "temp": {},
          "game": {}
        },
        "wc": {
          "borderColor": null,
          "background": "https://media.discordapp.net/attachments/976848026532470865/1068518800988831815/concrete-1646788__480.png",
          "channel": "",
          "description": "have a good day",
          "enable": false,
          "font": "Open_Sans.ttf",
          "message": "Welcome to {server}.\nHai {member} , kamu adalah member ke- {memberCount}",
          "messageColor": null,
          "nameColor": null,
          "welcomeColor": null
        }
      }
    })
  }
}
