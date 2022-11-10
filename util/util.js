require('dotenv').config();
const path = require("path")
const { get } = require("./get");
const colorful = require("./color");
const admin = require("firebase-admin");
const Canvas = require("canvas")

admin.initializeApp({
  credential: admin.credential.cert({
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL
}),
  databaseURL: process.env.FIREBASE_DATABASEURL
})
exports.getrole = function (event, name) {
  return event.roles.cache.find(r => r.name.toLowerCase() === name.toLowerCase())
}
exports.embeds = function(content, footer) {
  if (typeof footer == "undefined") {
    return {
      embeds : [{
        description : content,
        color: "#38b6ff"
      }]
    }
  } else {
    return {
      embeds : [{
        color: "#38b6ff",
        description : content,
        footer: {
          text: footer.text,
          icon_url: footer.url
        }
      }]
    }
  }
}
exports.ephemeral = function(content, footer) {
  if (typeof footer == "undefined") {
    return {
      embeds : [{
        description : content,
        color: "#38b6ff"
      }],
      ephemeral: true
    }
  } else {
    return {
      embeds : [{
        color: "#38b6ff",
        description : content,
        footer: {
          text: footer.text,
          icon_url: footer.url
        }
      }],
      ephemeral: true
    }
  }
}
exports.remove = async function(message, id) {
  try {
    let msg = await message.channel.messages.fetch(id);
    return msg.delete()
  } catch(err) {
    console.error(err)
  }
}

exports.getmsg = async function(msg, id) {
  let e = await msg.channel.messages.fetch(id);
  return e
}

exports.clear = function(content, time) {
  var timer = 0
  if( typeof time != "undefined") {
    timer = time
    return new Promise(resolve => {
       setTimeout(() => {
         resolve(content.delete());
       }, timer);
    });
  } else {
    return new Promise(resolve => {
       setTimeout(() => {
         resolve(content.delete());
       }, timer);
    });
  }
}

exports.numformat = function(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K';
    } else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M';
    } else if(num < 900){
        return num;
    }
}
exports.genId = function (length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
exports.games = class games {
  constructor(name, guild, started) {
    this.game = name;
    this.guild = guild;
    this.started = started;
  }
}
exports.WelcomerCanvas = class WelcomerCanvas {
  constructor (options = {
    member: null,
    message: null,
    borderColor: null,
    welcomeColor: null,
    nameColor: null,
    messageColor: null,
    description: null,
    font: null,
    background: null
  }) {
    this.member = options.member;
    this.message = options.message;
    this.borderColor = options.borderColor;
    this.welcomeColor = options.welcomeColor;
    this.nameColor = options.nameColor;
    this.messageColor = options.messageColor;
    this.description = options.description;
    this.font = options.font;
    this.background = options.background;
  }
  async relace (member, content) {
    var object = content.split(' ')
    var temp = [...object]
    var memberMention = /^{member}/
    var guildName = /^{server}/
    var memberCount = /^{memberCount}/
    for (let i = 0; i < object.length; i++) {
      if (memberMention.test(object[i])) {
        temp[i] = temp[i].replace(memberMention, `<@${member.user.id}>`)
      }
      if (guildName.test(object[i])) {
        temp[i] = temp[i].replace(guildName, `${member.guild.name}`)
      }
      if (memberCount.test(object[i])) {
        temp[i] = temp[i].replace(memberCount, `${member.guild.memberCount}`)
      }
    }
    return temp.map(obj => obj).join(' ')
  }
  async render () {
    var content = this.message != null ? await this.relace(this.member, this.message) : null;
    var member = this.member;
    // setting
    var width = 1024;
    var height = 500;
    var welcomeColor = this.welcomeColor != null ? this.welcomeColor : "#fff"
    var nameColor = this.nameColor != null ? this.nameColor : "#fff"
    var messageColor = this.messageColor != null ? this.messageColor : "#fff"
    var borderColor = this.borderColor != null ? this.borderColor : "#fff"
    var font = this.font != null ? this.font : "Rubik"
    var description = this.description != null ? this.description : "Have A Nice Day"
    var userHeight = 440;
    var cleft = width / 2
    var cdown = 170
    var base;
    Canvas.registerFont(path.join(__dirname, '..', 'src', 'welcomer', 'font', `${font}.ttf`), { 
      family: `${font}`,
      weight: 'bold'
    });
    if (this.background == null) {
      base = await Canvas.loadImage(path.join(__dirname, '..', 'src', 'welcomer', 'base.jpg'));
    } else {
      var userBase = await get.buffer(this.background);
      base = await Canvas.loadImage(userBase.data)
    }
    
    var avaURL = await get.buffer(member.user.displayAvatarURL({ format : 'jpg' }));
    var avatar = await Canvas.loadImage(avaURL.data);
    var canvas = Canvas.createCanvas(width, height);
    var ctx = canvas.getContext('2d');
    
    ctx.drawImage(base, 0,0, width,height)
    
    ctx.beginPath();
    ctx.fillStyle= borderColor
    ctx.arc(cleft, cdown, 132, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.save();
    ctx.globalAlpha = 0.9;
    // circle 
    ctx.beginPath();
    ctx.arc(cleft, cdown, 125, 0, 2 * Math.PI);
    ctx.fill();
    // end circle
    ctx.beginPath();
    ctx.arc(cleft, cdown, 125, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.globalAlpha = 1;
    ctx.drawImage(avatar, (cleft)-125, (cdown)-125/*55*/, 250, 250);
    ctx.restore();
    
    ctx.fillStyle = welcomeColor;
    ctx.textAlign = "center";
    ctx.font = `bold 80px ${font}`;
    ctx.shadowOffsetX = 3
    ctx.shadowOffsetY = 4
    ctx.shadowColor = "rgba(0,0,0,0.3)"
    ctx.shadowBlur = 4
    ctx.fillText("WELCOME", width / 2, 375, 400);
    
    var nameHeight = userHeight -25
    var name = member.user.username+'#'+member.user.discriminator;
    // Username
    ctx.fillStyle = nameColor;
    ctx.textAlign = "center";
    ctx.font = `bold 40px ${font}`;
    ctx.fillText(name.toUpperCase(), width / 2, nameHeight);
    
    // Ucapan
    ctx.fillStyle = messageColor;
    ctx.textAlign = "center";
    ctx.font = `bold 30px ${font}`;
    ctx.fillText(description.toUpperCase(), width / 2, (userHeight)+20, 450);
    // End
    const message = content != null ? content.replace(/\\n/g, '\n') : null
    return {
      content: `${message}`,
      files: [{ 
            attachment: canvas.toBuffer(), 
            name: 'welcomer.png'
      }]
    }
  }
}
exports.Welcomer = class Welcomer {
  constructor (member, content, client) {
    this.client = client
    this.member = member;
    this.embed = content;
    this.content = content.description
  }
  async init () {
    let msg = await this.render()
    return msg
  }
  async relace (member, content) {
    var object = content.split(' ')
    var temp = [...object]
    var memberMention = /^{member}/
    var guildName = /^{server}/
    var memberCount = /^{memberCount}/
    for (let i = 0; i < object.length; i++) {
      if (memberMention.test(object[i])) {
        temp[i] = temp[i].replace(memberMention, `<@${member.user.id}>`)
      }
      if (guildName.test(object[i])) {
        temp[i] = temp[i].replace(guildName, `${member.guild.name}`)
      }
      if (memberCount.test(object[i])) {
        temp[i] = temp[i].replace(memberCount, `${member.guild.memberCount}`)
      }
    }
    return temp.map(obj => obj).join(' ')
  }
  async render () {
    var msg = await this.relace(this.member, this.content);
    var description = msg.replace(/\\n/g, '\n')
    return { embeds: [Object.assign({}, this.embed, { description: description })]}
  }
}
exports.rich = function (e, n) {
  return Object.assign({},e,n)
}
exports.timeconvert = function(secs) {
  const hours = Math.floor(secs / (60 * 60));
  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);
  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);
  return {
    h: hours,
    m: minutes,
    s: seconds
  };
}
exports.color = function (c) {
  if (c == undefined) return "#38b6ff";
  if (c == "random") return colorful();
  return colorful()
}


exports.database = admin.database();
exports.DISCORD_TOKEN = process.env.DISCORD_TOKEN;
exports.get = get;
exports.fdb = process.env.FIREBASE_DATABASEURL;
exports.SUPPORT_LINK = process.env.SUPPORT_LINK;
exports.PREFIX = process.env.client_prefix;
exports.dev_id = process.env.dev_id;