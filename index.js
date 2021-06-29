
const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require('fs');
const moment = require("moment")
const variable = require("./variables");
const port = process.env.PORT || 5000;
const express = require("express");
const app = express(),
helmet = require("helmet");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet());
const ip = require("ip");
const compression = require("compression");
app.use(compression());
const doComp = (req, res) => {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
};
app.use(compression({filter: doComp, level: 7}));
app.disable("x-powered-by");

Object.defineProperty(String.prototype, "toProperCase", {
	value: function() {
		return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
	}
});

Object.defineProperty(String.prototype, "toCapitalFirstCase", {
	value: function() {
		return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1));
	}
});

Object.defineProperty(String.prototype, "fixedUsername", {
	value: function() {
		return this.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
});

Object.defineProperty(Array.prototype, "random", {
value: function() {
	//return this.splice(Math.floor(Math.random() * this.length), 1);
	return this[Math.floor(Math.random() * this.length)];
}
});

String.prototype.replaceAll = function(Old, New, Ignore) {
    return this.replace(new RegExp(Old.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"), (Ignore?"gi":"g")), (typeof(New)=="string") ? New.replace(/\$/g,"$$$$") : New);
}

String.prototype.includesOf = function(arrays) {
  if(!Array.isArray(arrays)) {
    throw new Error('includesOf only accepts an array')
  }
  return arrays.some(str => this.toLowerCase().includes(str))
}
//Register Font
registerFont('./font/Baar.ttf', { family: 'Baar' });
registerFont('./font/Cocogoose.ttf', { family: 'Cocogoose' });
registerFont('./font/FeastBBR.ttf', { family: 'FeastBB' });
registerFont('./font/Number.ttf', { family: 'Number' });
registerFont('./font/Hack-Regular.ttf', { family: 'Hack-Regular' });
registerFont('./font/LemonMilk.otf', { family: 'LemonMilk' });


app.get("/", (req, res) => {
  console.log(ip.address())
  console.log(req.connection.remoteAddress);
	res.set("Content-Type", "application/json");
	res.status(200).send(JSON.stringify(variable.home, null, 2));
});


app.get("/adventure", async (req, res) => {
  const { username, discriminator, avatar, wallpaper, level, exp } = req.query;
  const canvas = createCanvas(1237, 699);
  const ctx = canvas.getContext("2d");

  var panel = {};
  panel.body = await loadImage("https://i.imgur.com/YCcvT0b.png");
  panel.banner = {};
  panel.banner.front = await loadImage("https://i.imgur.com/Oh6SzYy.png");
  panel.banner.back = await loadImage("https://i.imgur.com/R3MtFcH.png");
  panel.avatar = {};
  panel.avatar.front = await loadImage("https://i.imgur.com/1yZjvTf.png");
  panel.avatar.back = await loadImage("https://i.imgur.com/SbVeErm.png");

  const _wallpaper = await loadImage(wallpaper || "https://i.imgur.com/e6uzQaA.jpg");
  const _avatar = await loadImage(avatar || "https://i.imgur.com/7BLsVJ5.png");

  const data = { level : xp || 1, xp : exp || 0 };
  var xp = {};
  xp.cap = (50 * Math.pow(data.level, 2)) + (250 * data.level);
  xp.lowerLim = (50 * Math.pow(data.level - 1, 2)) + (250 * (data.level - 1));
  xp.range = xp.cap - xp.lowerLim;
  xp.current = data.xp - xp.lowerLim;
  xp.percent = xp.current / xp.range;

	const datas = [];
	/*[
    { id: 1, name: "Newbie Class", type: "class" },
    { id: 2, name: "Dull Weapon", type: "sword" },
    { id: 3, name: "Bomb", type: "utility" },
    { id: 4, name: "Boomerang", type: "utility" },
    { id: 5, name: "GoodBye Ring", type: "utility" },
    { id: 6, name: "Bro Fist", type: "utility" },
    { id: 7, name: "Hell Helm", type: "helm" },
    { id: 8, name: "Arcane Hat", type: "helm" }
	]*/
  items = datas.sort(function(a, b) {
    const _a = a.type ? a.type : a;
    const _b = b.type ? b.type : b;
    if (_a < _b) return -1; if (_a > _b) return 1; return 0; });

  var slot = {};
  slot[1] = items[0];
  slot[2] = items[1];
  slot[3] = items[2];
  slot[4] = items[3];
  slot[5] = items[4];
  slot[6] = items[5];
  slot[7] = items[6];
  slot[8] = items[7];

  // add panel body
  ctx.drawImage(panel.body, 0, 0, canvas.width, canvas.height);

  // add panel banner back
  ctx.beginPath();
  ctx.drawImage(panel.banner.back, 430, 35, canvas.width - 530, canvas.height - 395);
  ctx.restore();

  // add banner wallpaper
  ctx.beginPath();
  ctx.drawImage(_wallpaper, 430, 35, canvas.width - 530, canvas.height - 395);
  ctx.restore();

  // add banner name
  ctx.beginPath();
  ctx.font = "70pt FeastBB";
  ctx.fillStyle = "#eee";
  ctx.textAlign = "left";
  ctx.shadowColor = "#000";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillText(username ? username.toUpperCase() : "Nekoyasui", 460, 270, 320);
  ctx.font = "45pt FeastBB";
  ctx.fillStyle = "#eee";
  ctx.textAlign = "left";
  ctx.fillText(`#${discriminator ? discriminator : "6804"}`, 460, 320, 320);
  ctx.restore();

  // add xp
  ctx.arc(canvas.width - 165, canvas.height - 410, 35, 0, Math.PI * 2);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width - 165, canvas.height - 410, 35, Math.PI * 1.5, Math.PI * 1.5 + (Math.PI * 2 * xp.percent || 1));
  ctx.strokeStyle = "#eee";
  ctx.stroke();

  // add level
  ctx.beginPath();
  ctx.font = "25px LemonMilk";
  ctx.fillStyle = "#eee";
  ctx.textAlign = "center";
  ctx.fillText(data.level || "1", canvas.width - 165, canvas.height - 410, 35);
  ctx.font = "15px Cocogoose";
  ctx.textAlign = "center";
  ctx.fillText("LEVEL", canvas.width - 165, canvas.height - 395, 35);

  // add panel banner front
  ctx.beginPath();
  ctx.drawImage(panel.banner.front, 0, 0, canvas.width, canvas.height);
  ctx.restore();

  // add inventory
  ctx.beginPath();
  ctx.font = "25px LemonMilk";
  ctx.fillStyle = "#eee";
  ctx.textAlign = "left";
  ctx.fillText(slot[1] || "No Slot", canvas.width - 740, canvas.height - 283, 262);
  ctx.fillText(slot[2] || "No Slot", canvas.width - 740, canvas.height - 218, 262);
  ctx.fillText(slot[3] || "No Slot", canvas.width - 740, canvas.height - 150, 262);
  ctx.fillText(slot[4] || "No Slot", canvas.width - 740, canvas.height - 80, 262);
  ctx.fillText(slot[5] || "No Slot", canvas.width - 388, canvas.height - 283, 262);
  ctx.fillText(slot[6] || "No Slot", canvas.width - 388, canvas.height - 218, 262);
  ctx.fillText(slot[7] || "No Slot", canvas.width - 388, canvas.height - 150, 262);
  ctx.fillText(slot[8] || "No Slot", canvas.width - 388, canvas.height - 80, 262);

  // add panel avatar back
  ctx.beginPath();
  ctx.drawImage(panel.avatar.back, 0, 0, canvas.width, canvas.height);
  ctx.restore();

  // add avatar
  ctx.beginPath();
  ctx.drawImage(_avatar, 77.5, 45, canvas.width - 951, canvas.height - 411);
  ctx.restore();

  // add panel avatar front
  ctx.beginPath();
  ctx.drawImage(panel.avatar.front, 0, 0, canvas.width, canvas.height);
  ctx.restore();

  res.setHeader("Content-Type", "image/png"); //Post the image
  res.status(200)
  canvas.pngStream().pipe(res);
});

app.get("/economy", async (req, res) => {
	//details
	let username = req.query.username;
  if(!username) return res.redirect(variable.home.api.economy.example);
	let discriminator = req.query.discriminator;
	let color = req.query.color;
	let bio = req.query.bio;
	let birthdate = req.query.birthdate;
	let wallet = req.query.wallet;
	let bank = req.query.bank;
	let tip = req.query.tip;
	let server_level = req.query.level;
	let server_xp = req.query.exp;
	let server_rank = req.query.rank;
	let global_rank = req.query.global;
  let custom = {
    one: req.query.info1,
    two: req.query.info2
  }
	//console.log(`discriminator: ${discriminator}\nusername: ${username}\ncolor: ${color}\nbio: ${bio}\nbirthdate: ${birthdate}\nwallet: ${wallet}\nbank: ${bank}\ntip: ${tip}\nlevel: ${server_level}\nexp: ${server_xp}\nrank: ${server_rank}\nglobal: ${global_rank}\n`)

	if (!discriminator) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.discriminator, null, 2));
	}
	if (!username) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.username, null, 2));
	}
	if (!bio) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.bio, null, 2));
	}
	if (!birthdate) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.birthdate, null, 2));
	}
	if (!wallet) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.wallet, null, 2));
	}
	if (!bank) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.bank, null, 2));
	}
	/*if (!tip) {
		res.set("Content-Type", "application/json");
		return res.send(JSON.stringify(variable.tip, null, 2));
  }*/
	if (!server_level) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.level, null, 2));
	}
	if (!server_xp) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.xp, null, 2));
	}
	if (!server_rank) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.rank, null, 2));
	}
  if(color && !(color.match(/[0-9a-f]{6}|default/i))){
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.color_format, null, 2));
  } else {
    color = color ? String('#' + color) : null;
  }
	/*if (!global_rank) {
		res.set("Content-Type", "application/json");
		return res.send(JSON.stringify(variable.global, null, 2));
	}**/
  
	//images
	let defavatar = ["https://i.imgur.com/8h73nEM.png", "https://i.imgur.com/ukKgH5a.png", "https://i.imgur.com/XdPaCuo.png", "https://i.imgur.com/ic53lZB.png", "https://i.imgur.com/bPFZEET.png"].random();
	let avatar = req.query.avatar? req.query.avatar : defavatar;
	let wallpaper = req.query.wallpaper? req.query.wallpaper : "https://i.imgur.com/e6uzQaA.jpg";
	let pattern = req.query.pattern? req.query.pattern : "https://i.imgur.com/nx5qJUb.png";
	let emblem = req.query.emblem? req.query.emblem : null;
	let wreath = req.query.wreath? req.query.wreath : null;
	let hat = req.query.hat? req.query.hat : null;

	if (!avatar) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.avatar, null, 2));
	}
  if(!(avatar.match(/(https?:\/\/.*\.(?:png|jpg))/i))){
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.avatar_format, null, 2));
  }
	if (!wallpaper) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.wallpaper, null, 2));
	}
  if(!(wallpaper.match(/(https?:\/\/.*\.(?:png|jpg))/i))){
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.wallpaper_format, null, 2));
  }
	if (!pattern) {
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.pattern, null, 2));
	}
  if(!(pattern.match(/(https?:\/\/.*\.(?:png|jpg))/i))){
		res.set("Content-Type", "application/json");
		return res.status(200).send(JSON.stringify(variable.pattern_format, null, 2));
  }
  birthdate = birthdate.replace(/%20/g, " ");
  let bdate = new Date(birthdate), 
  epoch = bdate.getTime();
  if(birthdate && !epoch) {
    res.set("Content-Type", "application/json");
    return res.status(200).send(JSON.stringify(variable.date, null, 2));
  };
      const birthday = moment(epoch).format('LL'); 
      const server_data = {
        level : server_level,
        xp : server_xp
      }
      const cap = (50 * Math.pow(server_data.level, 2)) + (250 * server_data.level);
      const lowerLim = (50 * Math.pow(server_data.level-1,2)) + (250 * (server_data.level-1));
      const range = cap - lowerLim;
      const currxp = server_data.xp - lowerLim;
      const percentDiff = currxp / range;

      console.log(cap, lowerLim, range, currxp)
      try {
      const canvas = createCanvas(800,600);
      const ctx = canvas.getContext('2d');
      color = color? color: 'rgb(255,165,79)';
      username = username? username: "";
      wallpaper = await loadImage(wallpaper);
      pattern = await loadImage(pattern);
      avatar = await loadImage(avatar);
      hat = await loadImage(hat);
      wreath = await loadImage(wreath);
      emblem = await loadImage(emblem);

      // add the wallpaper
      ctx.drawImage(wallpaper,300,65,495,250);

      // add the bio card
      ctx.beginPath();
      ctx.moveTo(300,315);
      ctx.lineTo(canvas.width-5,315);
      ctx.lineTo(canvas.width-5,canvas.height-25);
      ctx.lineTo(300, canvas.height - 25);
      ctx.fillStyle = '#2F3136'
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 40;
      ctx.shadowOffsetX = -10;
      ctx.shadowOffsetY = -40;
      ctx.fill();

      // add bio outline
      ctx.beginPath();
      ctx.moveTo(362, 338);
      ctx.lineTo(canvas.width-40, 338)
      ctx.arcTo(canvas.width-20, 338, canvas.width - 20, 358, 20);
      ctx.lineTo(canvas.width-20, 378)
      ctx.arcTo(canvas.width -20, 398, canvas.width - 40, 398, 20);
      ctx.lineTo(330, 398)
      ctx.arcTo(310,398,310,378,20)
      ctx.lineTo(310, 358)
      ctx.arcTo(310,338,330,338,20)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(225,225,225,0.8)'
      ctx.stroke();
      // add bio title
      ctx.beginPath();
      ctx.font = '20px Baar'
      ctx.fillStyle = 'rgba(225,225,225,0.8)'
      ctx.fillText('BIO', 330, 345, 50)

      // add bio text to bio carrd
      ctx.beginPath();
      ctx.font = '18px Hack'
      ctx.fillStyle = 'rgba(225,225,225,0.9)'
      ctx.textAlign = 'center'
      ctx.fillText(bio? bio : "N/A", 555, 376, 490)

      // add birthday outline
      ctx.beginPath();
      ctx.moveTo(403, 419);
      ctx.lineTo(520,419);
      ctx.arcTo(540,419,540,439,20);
      ctx.arcTo(540,459,520,459,20);
      ctx.lineTo(330,459);
      ctx.arcTo(310,459,310,439,20);
      ctx.arcTo(310,419,320,419,20);
      ctx.stroke();

      // add birthday title
      ctx.beginPath();
      ctx.font = '18px Baar'
      ctx.fillStyle = 'rgba(225,225,225,0.8)'
      ctx.textAlign = 'left'
      ctx.fillText('BIRTHDAY', 330, 425, 80)

      // add birthday text to birthday card
      ctx.beginPath();
      ctx.font = '15px Hack'
      ctx.fillStyle = 'rgba(225,225,225,0.9)'
      ctx.fillText(birthday? birthday : "Not Set", 330, 445, 230)

      // add balance outline
      ctx.beginPath();
      ctx.moveTo(369,479);
      ctx.lineTo(520,479);
      ctx.arcTo(540,479,540,499,20);
      ctx.lineTo(540,509);
      ctx.arcTo(540,529,520,529,20);
      ctx.lineTo(330,529);
      ctx.arcTo(310,529,310,509,20);
      ctx.lineTo(310,499);
      ctx.arcTo(310,479,330,479,20);
      ctx.stroke();

      // add balance title
      ctx.beginPath();
      ctx.font = '18px Baar'
      ctx.fillStyle = 'rgba(225,225,225,0.8)'
      ctx.textAlign = 'left'
      ctx.fillText('INFO', 330, 485, 80)

      // add balance text to balance card
      ctx.beginPath();
      ctx.font = '15px Hack'
      ctx.fillStyle = 'rgba(225,225,225,0.9)'
      ctx.fillText(`${custom.one ? custom.one : "Points"}: ${wallet? wallet : '0'}`, 330, 512, 80)
      ctx.fillText(`${custom.two ? custom.two : "Heart"}: ${bank? bank: '0'}`, 430, 512, 80)

      // add emblem indicator
      if (!emblem){
        ctx.beginPath();
        ctx.fillStyle = 'rgba(225,225,225,0.8)'
        ctx.font = '25px Baar'
        ctx.textAlign = 'center'
        ctx.fillText('NO', 660 , 469, 150)
        ctx.fillText('EMBLEM', 660, 500, 150)
      } else {
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;
        ctx.beginPath();
        ctx.drawImage(emblem,580,400,160,160);
      };

      if((tip)){/*
      // add the tip shape
      ctx.beginPath();
      ctx.moveTo(795,10);
      ctx.lineTo(540,10);
      ctx.lineTo(580,70);
      ctx.lineTo(795,70);
      ctx.fillStyle = color;
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 20;
      ctx.fill();

      // write tip on tip shape
      ctx.beginPath();
      ctx.font = '30px LemonMilk'
      ctx.fillStyle = '#2F3136'
      ctx.textAlign = 'left'
      ctx.fillText('TIP',620,50,50)

      // write received tips on tip shape
      ctx.beginPath();
      ctx.font = '30px LemonMilk'
      ctx.textAlign = 'right'
      ctx.fillText(tip? tip: "1", canvas.width - 40, 50, 120)
      */}
      // reset shadow
      ctx.shadowOffsetY = 0;

      // add card on left side
      // add pattern inside card
      ctx.fillStyle = 'rgba(255,255,255,1)'
      ctx.beginPath();
      ctx.moveTo(0,65);
      ctx.lineTo(0,535);
      ctx.arcTo(0,585,50,585,50);
      ctx.lineTo(250,585);
      ctx.lineTo(300,585);
      ctx.arcTo(300,15,250,15,50);
      ctx.lineTo(50,15);
      ctx.arcTo(0,15,0,65,50);
      ctx.stroke();
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 10;
      ctx.fill();
      ctx.save();
      ctx.clip();
      ctx.drawImage(pattern,0,0,300,600);
      ctx.restore();

      // reset shadow
      ctx.shadowOffsetX = 0;

      // add wavy shape below the pattern
      ctx.beginPath();
      ctx.moveTo(0, 255);
      ctx.bezierCurveTo(0,265,50,265,50,255);
      ctx.bezierCurveTo(50,245,100,245,100,255);
      ctx.bezierCurveTo(100,265,150,265,150,255);
      ctx.bezierCurveTo(150,245,200,245,200,255);
      ctx.bezierCurveTo(200,265,250,265,250,255);
      ctx.bezierCurveTo(250,245,300,245,300,255);
      ctx.lineTo(300,585);
      ctx.lineTo(50,585);
      ctx.arcTo(0,585,0,535,50);
      ctx.fillStyle = color
      ctx.fill();
      ctx.shadowBlur = 0;


      // add name
      ctx.beginPath()
      ctx.font = '40px FeastBB'
      ctx.fillStyle = '#2F3136'
      ctx.textAlign = 'center'
      ctx.fillText(username? username.toProperCase() : discriminator.toProperCase(), 150, 356, 280)
      ctx.font = '15px Hack-Regular'
      ctx.fillText(username ? `${username.toProperCase()}#${discriminator}` : "", 150, 375, 280)

      // add xp
      ctx.arc(60,460,35,0,Math.PI*2);
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(60,460,35,Math.PI * 1.5,Math.PI * 1.5 + (Math.PI * 2 * percentDiff || 1))
      ctx.strokeStyle = '#2F3136'
      ctx.stroke();

      ctx.beginPath();
      ctx.font = '25px LemonMilk'
      ctx.fillStyle = '#2F3136'
      ctx.textAlign = 'center'
      ctx.fillText(server_data.level || '1', 60,460,35)
      ctx.font = '15px Cocogoose'
      ctx.textAlign = 'center'
      ctx.fillText('LEVEL', 60, 480, 35)

      ctx.beginPath();
      ctx.arc(150,460,40,0,Math.PI * 2);
      ctx.fillStyle = '#2F3136'
      ctx.fill();

      ctx.beginPath();
      ctx.font = '30px LemonMilk'
      ctx.fillStyle = color
      ctx.textAlign = 'center'
      ctx.fillText(server_rank? ordinalize(server_rank): 'N/A', 150,460,50)//server rank
      ctx.font = '15px Cocogoose'
      ctx.textAlign = 'center'
      ctx.fillText('SERVER', 150, 480, 50)

      ctx.beginPath();
      ctx.arc(240,460,40,0,Math.PI * 2);
      ctx.fillStyle = '#2F3136'
      ctx.fill();

      ctx.beginPath();
      ctx.font = '30px LemonMilk'
      ctx.fillStyle = color
      ctx.textAlign = 'center'
      ctx.fillText(global_rank? ordinalize(global_rank): 'N/A', 240,460,50)
      ctx.font = '15px Cocogoose'
      ctx.textAlign = 'center'
      ctx.fillText('GLOBAL', 240, 480, 50)

      // add avatar
      ctx.beginPath();
      ctx.arc(150,225,75, 0, Math.PI * 2);
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'
      ctx.stroke();
      ctx.closePath();
      ctx.save();
      ctx.clip();
      ctx.drawImage(avatar,75,150,150,150);
      ctx.restore();
      // add wreath
      if (wreath){
        ctx.beginPath();
        ctx.drawImage(wreath,60,145,180,180);
      };

      if (hat){
        ctx.beginPath();
        ctx.drawImage(hat,0,0,300,300);
      };
      
      res.setHeader("Content-Type", 'image/png'); //Post the image
      res.status(200)
      canvas.pngStream().pipe(res);

     } catch (e) {
       res.set("Content-Type", "application/json");
       return res.status(200).send(JSON.stringify({success: false, message: e}, null, 2));
     } 
     
function ordinalize(n = 0){
  return Number(n)+[,'st','nd','rd'][n/10%10^1&&n%10]||Number(n)+'th';
};
})//end

const post = require("./router/post");
app.use("/post", post);

app.get("*", (req, res) => {
	res.set("Content-Type", "application/json");
	res.status(404).send(JSON.stringify(variable.notfound, null, 2));
})

app.listen(port, () => {
  console.log("Rank Api is ready to flight..")
});
