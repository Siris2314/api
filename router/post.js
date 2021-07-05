const express = require("express");
const router = express.Router();
const moment = require("moment");
const fetch = require("node-fetch");
const axios = require("axios");
const fs = require("fs");
const { default: didyoumean3 } = require("didyoumean3");
function shuffle(array) {
  const arr = array.slice(0);
  new Promise(async resolve => {
    resolve(2);
    try{
      for (let i = arr.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    } catch {}
  })
  return arr;
}

String.prototype.replaceAll = function(Old, New, Ignore) {
    return this.replace(new RegExp(Old.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"), (Ignore?"gi":"g")), (typeof(New)=="string") ? New.replace(/\$/g,"$$$$") : New);
}

String.prototype.includesOf = function(arrays) {
  if(!Array.isArray(arrays)) {
    throw new Error('includesOf only accepts an array')
  }
  return arrays.some(str => this.toLowerCase().includes(str))
}

router.post("/chat", async function (req, res) {
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
  const api = {
  id: "155358",
  key: "P34LO65hmajOmLOV"
  } //to get ID/KEY goto https://brainshop.ai/brain/<yourid>/settings

  //console.log("Request body");
  //console.log(req.body);

  var data = req.body || {},
  message = decodeURIComponent(data.message).replaceAll("@everyone", "everyone").replaceAll("@here", "everyone"),
  author = data.author || {},
  uid = data.uid || "1234567890123456789",
  owner = data.owner || {},
  bot = data.bot || {};
  didyoumean = data.didyoumean || {};
  let final, reply;
  message = String(message.trim().toLowerCase());

  const mentionUser = new RegExp(/(?:<@!?)?(\d{17,19})>/g);
  if(message.match(mentionUser) && message.match(mentionUser).length > 2){
    const mentionBot = new RegExp(/^(?:<@!?)?(\d{17,19})>/gi);
    message = message.replace(mentionBot, "");
  }
  const mentions = message.match(mentionUser);
  let users = [];
  if(mentions) {
    for (const mention of mentions) {
      users.push(mention.replace(mentionUser, "$1"));
    }
  }
  message = message.replace(mentionUser, "");
  message = message.trim();
  console.log(users)
  if(author){
    author.id = author.id ? author.id : null;
    author.username = author.username ? author.username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : null;
    author.discriminator = author.discriminator ? author.discriminator : null;
  }
	console.log(owner.id)
  owner.id = owner.id ? owner.id : "817238971255488533";
  owner.username = owner.username ? owner.username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : "Nekoyasui";
  owner.discriminator = owner.discriminator ? owner.discriminator : "6804";
  owner.invite = owner.invite ? owner.invite : "n6EnQcQNxg";
  bot.username = bot.username ? bot.username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : "Nekoyasui";
  bot.birthdate = bot.birthdate ? bot.birthdate : "11/2/2002";
  bot.prefix = bot.prefix ? bot.prefix : null;
  bot.gender = bot.gender ? bot.gender : "male";
  bot.description = bot.description ? bot.description : "I'm a Multipurpose Discord Bot with many features.";
  bot.country = bot.country ? bot.country : "Philippines";
  bot.city = bot.city ? bot.city : "South Cotabato, General Santos";
  bot.info = bot.info || {};
  bot.info.discord = Boolean(bot.info.discord) || false;

  didyoumean.aliases = didyoumean.aliases ? didyoumean.aliases : [];
  didyoumean.commands = didyoumean.commands ? didyoumean.commands : [];

  console.log(`message: '${message}' | uid: ${uid} | owner: ${(await owner)} | bot: ${await bot.name}`)
  //return res.json({success: true, data: message});
	if (bot.name) {
    finals = {
      success: false,
      error: {
        message: "Nekoyasui Chat Api => Please update the package! Type: `npm i nekoyasui@latest`"
      },
      links: { website:"http://nekoyasui.ga/", github:"https://github.com/nekoyasui", discord:"http://discord.gg/n6EnQcQNxg" }
	  };
    
    reply = shuffle(["How may I help you?", "Whassup?", "How may I assist you?", "What can I do for you?", "How can I help you?"].random());
    return res.json({ success: true, data: reply });
	} else
	if (message.length === 0) {
    finals = {
      success: false,
      error: {
        message: "Nekoyasui Chat Api => 'message' must be passed down as string!"
      },
      links: { website:"http://nekoyasui.ga/", github:"https://github.com/nekoyasui", discord:"http://discord.gg/n6EnQcQNxg" }
	  };
    
    reply = shuffle(["How may I help you?", "Whassup?", "How may I assist you?", "What can I do for you?", "How can I help you?"].random());
    return res.json({ success: true, data: reply });
	} else if (!(bot.info && typeof bot.info.discord === "boolean")) {
    final = {
      success: false,
      error: {
        message: "Nekoyasui Chat Api => 'bot.info.discord' must be passed down as string!"
      },
      links: { website:"http://nekoyasui.ga/", github:"https://github.com/nekoyasui", discord:"http://discord.gg/n6EnQcQNxg" }
	  };
    return res.json(final);
	} else if (!(uid && uid.match(/\d{14,22}/gi) && typeof uid === "string")) {
    final = {
      success: false,
      error: {
        message: "Nekoyasui Chat Api => 'uid' must be passed down as string!"
      },
      links: { website:"http://nekoyasui.ga/", github:"https://github.com/nekoyasui", discord:"http://discord.gg/n6EnQcQNxg" }
	  };
    return res.json(final);
	} else if (!(typeof owner === "object")) {
    final = {
      success: false,
      error: {
        message: owner.length +"Nekoyasui Chat Api => 'owner' must be passed down as object and provide the required value!",
        usage: 'const owner = { id:"817238971255488533", username: "Nekoyasui", discriminator:"6804" };'
      },
      links: { website:"http://nekoyasui.ga/", github:"https://github.com/nekoyasui", discord:"http://discord.gg/n6EnQcQNxg" }
	  };
    return res.json(final);
	} else if (!(owner.id && owner.id.match(/\d{14,22}/gi) && typeof owner.id === "string")) {
    final = {
      success: false,
      error: {
        message: "Nekoyasui Chat Api => 'owner.id' must be passed down as id/string!",
        usage: 'const owner = { id:"817238971255488533" };'
      },
      links: { website:"http://nekoyasui.ga/", github:"https://github.com/nekoyasui", discord:"http://discord.gg/n6EnQcQNxg" }
	  };
    return res.json(final);
	} else if (!(owner.username && owner.username.match(/^.{1,32}/gi) && typeof owner.username === "string")) {
    final = {
      success: false,
      error: {
        message: "Nekoyasui Chat Api => 'owner.username' must be passed down as username/string!",
        usage: 'const owner = { username: "Nekoyasui"};'
      },
      links: { website:"http://nekoyasui.ga/", github:"https://github.com/nekoyasui", discord:"http://discord.gg/n6EnQcQNxg" }
	  };
    return res.json(final);
	} else if (!(owner.discriminator && owner.discriminator.match(/\d{4}/gi)&& typeof owner.discriminator === "string")) {
    final = {
      success: false,
      error: {
        message: "Nekoyasui Chat Api => 'owner.tag' must be passed down as tag/number!",
        usage: 'const owner = { discriminator:"6804" };'
      },
      links: { website:"http://nekoyasui.ga/", github:"https://github.com/nekoyasui", discord:"http://discord.gg/n6EnQcQNxg" }
	  };
    return res.json(final);
	} else if (!(typeof bot === "object")) {
    final = {
      success: false,
      error: {
        message: "Nekoyasui Chat Api => 'bot' must be passed down as object and provide the required value!",
        usage: 'const bot = { name:"Nekoyasui", birthday:"11/2/2002", prefix:";", gender:"male", description:"Im a Multi-purpose Bot with many features."};'
      },
      links: { website:"http://nekoyasui.ga/", github:"https://github.com/nekoyasui", discord:"http://discord.gg/n6EnQcQNxg" }
	  };
    return res.json(final);
	} else if (!(bot.username && bot.username.match(/^.{1,32}/gi) && typeof bot.username === "string")) {
    final = {
      success: false,
      error: {
        message: "Nekoyasui Chat Api => 'bot.username' must be passed down as username/string!",
        usage: 'const bot = { name: "Nekoyasui"};'
      },
      links: { website:"http://nekoyasui.ga/", github:"https://github.com/nekoyasui", discord:"http://discord.gg/n6EnQcQNxg" }
	  }; 
    return res.json(final);
	} else if (!(bot.birthdate && (new Date(bot.birthdate).getTime()) && typeof bot.birthdate === "string")) {
    final = {
      success: false,
      error: {
        message: "Nekoyasui Chat Api => 'bot.birthdate' must be passed down as date/string!",
        usage: 'const bot = { birthdate:"11/2/2002" };'
      },
      links: { website:"http://nekoyasui.ga/", github:"https://github.com/nekoyasui", discord:"http://discord.gg/n6EnQcQNxg" }
	  };
    return res.json(final);
	}
  //if(message) message = await translate(message, "en")

  const epoch = new Date(bot.birthdate).getTime();
  const mention = new RegExp(/(?:<@!?)?(\d{17,19})>/gi);
  if(message.match(mention)){
    let matches = [];
    const mentions = message.match(/\d{16,22}?/gi);
    console.log(mentions);
    if(mentions.length === 2){
      for (const member of mentions) {
        console.log(member)
      }
    }

  } else if(message.includesOf(["@everyone", "@here"])) { //Mention an users
    reply = shuffle([
    "Why do you need to mention everyone here?", 
    "Don't mention anybody because they'll be angry at what you've done.",
    "Please refrain from mentioning everyone."].random());
    
    final = { success: true, data: reply }; 
    return res.json(final);
  } else if(message.toLowerCase().includes(bot.username.toLowerCase())){ //Mention bot name
    reply = shuffle([
      "Yea, that's my name.", 
      "It's me. How can I help you?", 
      "That is me. I'm all ears.", 
      `This is ${bot.username}. I'm at your service.`].random());
      
    final = { success: true, data: reply }; 
    return res.json(final);
  } else if(message.startsWith(bot.prefix)) {
    reply = shuffle([
    "Oof, I'm not supposed to use my commands while chatting with you.",
    "Shut up! my sensei not allowed me to use my commands while chatting on you.",
    "Trying to use my commands? well, i'm lazy to do that.",
    "Nope, nope, nope.. use my commmands later.",
    "Nope, i don't wanna use my commands.",
    "Lets enjoy chatting each other, just use my commands later."
    ].random());

    final = { success: true, data: reply }; 
    return res.json(final);
  } else if(message.includesOf(["prefix"])) {
    if(message.includesOf(["please", "tell"])){
      reply = shuffle([
      `Okay, okay... my prefix is \`\`${bot.prefix}\`\``,
      `My prefix is \`\`${bot.prefix}\`\``,
      `Don't be mad at me, I'm just kidding. My prefix is \`\`${bot.prefix}\`\``,
      `Don't be sad, my prefix is \`\`${bot.prefix}\`\``
      ].random());
      if(!(bot.prefix)) reply = shuffle(["I don't have prefix, could you kindly remind my Master about this?", "I don't have a prefix settled on me.", "It's a shame that my master didn't really give me a prefix.", "I'm sorry, but I don't have any prefixes. Simply notify my master about this."]).random();
    } else if(message.includesOf(["my" , "m y"])){
      reply = shuffle([
        `why asking your prefix?`,
        `Are you a bot? why asking your prefix?`,
        `So funny, asking for your prefix.`
      ].random());
    } else if(message.includesOf(["ur", "your"])) {
      reply = shuffle([
      "Ask again later.",
      "My reply is no.",
      "If you gonna beg to me, i gonna say my prefix.",
      "My sources say no.",
      "Better not tell you now.",
      "Reply hazy, try again.",
      "No way, I'm gonna say my prefix."
      ].random());
      if(!(bot.prefix)) reply = shuffle(["I don't have prefix, could you kindly remind the Owner about this?", "I don't have a prefix settled on me.", "Shame the owner didn't really give me a prefix.", "I'm sorry, but I don't have any prefixes. Simply notify my owner about this."]).random();
    } else if(message.includesOf(["what", "wut"])) {
      reply = shuffle([
      `Prefix is an shortcut to access my command.`,
      `Prefix is an affix which is placed before the stem of a word. Adding it to the beginning of one word changes it into another word. For example, when the prefix un- is added to the word happy, it creates the word unhappy.`
      ].random());
    } else {
      reply = shuffle(["What do you mean, prefix...?", "Could you please tell me what you thought about this?", "What exactly do you mean by prefix?", "Could you please tell me more about this prefix?"].random());
    }

    final = { success: true, data: reply }; 
    return res.json(final);
  } else if(message.includesOf(["heroku"])) {
    reply =
`Reasons why you **shouldn't** use Heroku for your bot:

* Bots are not what the platform is designed for. Heroku is designed to provide web servers (like Django, Flask, etc). This is why they give you a domain name and open a port on their local emulator.
* Heroku's environment is heavily containerized, making it significantly underpowered for a standard use case.
* Heroku's environment is volatile. In order to handle the insane amount of users trying to use it for their own applications, Heroku will dispose your environment every time your application dies unless you pay.
* And due to a lot of other issues....`;
    if(reply) {
      final = {
        success: true,
        data: reply
      };
      return res.json(final);
    }
  } else if(message.includesOf(["replit", "repl-it"])) {
    reply = 
`Reasons why you **should** use Replit for your bot:

* You can use any programming language, anything from Python to Ruby on Rails to HTML are totally allowed. If you are skillful enough, you can even make your own coding language!
* You can use the command line, I have never seen another site where you can use the command line in the browser. Awesome.
* Super-speed development, The previews update almost as fast as you can code.
* Live Hosting, you can host live fullstack websites for free. One problem is that you have to use a website monitor to keep your projects going forever.
* Domain Linking, you can even attach a domain name to your website.
* Dark and light mode, You can't have a good website without this feature
* 500MB storage for free, That's a lot of projects. The paid plan comes with 4X as much storage, but that's enough for even a professional fullstack developer.
* Templates, Make your own templates and use others' templates. You can even create Discord Bots, Django Projects, and more!
The installation and setup is a bit different than your normal VSCode one, but you'll get used to it.
* Everything is really fast! Notifications, Load time, and most projects built are very fast and amazing.
* Lots of tutorials! In the communication part, there are lots of tutorials that are posted.
* File & Folder uploading, you can upload files and folders to repl.it
* Github Imports, import any github repo and edit it on repl.it

**New Feature:** *Boosts* are a new addition to replit Hacker plan that allow you to make your repls even faster. Boosted repls come with 4 vCPUs and 4 GB of RAM which is double the resources of standard Hacker repls (and 8x more than free repls). As of today, we're including 5 free boosts as part of the Hacker plan.`;
    if(reply) {
      final = {
        success: true,
        data: reply
      };
      return res.json(final);
    }
  } else if(message.includesOf(["freehost", "free host", "free-host"])) {
    reply = 
`- **Replit:** <https://replit.com>
    Free plan for 500MB SSD, 500MB RAM, 0.2 - 0.5 vCPUs
- **Glitch:** <https://glitch.com/>
    Free plan for 200MB SSD, 512MB RAM
- **Heroku:** <https://heroku.com/>
    Free plan for 500MB SSD, 512MB RAM

• This is a list of Free hosting providers, not a backing/support for them. You will need to make your own decision.`;
    if(reply) {
      final = {
        success: true,
        data: reply
      };
      return res.json(final);
    }
  } else if(message.includesOf(["hosting", "host"])) {
    reply = 
`- **OVH:** <https://www.ovh.com/us/vps/>
  Starting at $3.35/mo for 1 core, 2GB RAM, 20GB SSD
- **DigitalOcean:** <https://www.digitalocean.com/>
  Starting at $5/mo for 1 core, 1GB RAM, 25GB SSD
- **Linode:** <https://www.linode.com/>
  Starting at $5/mo for 1 core, 1GB RAM, 25GB SSD
- **Vultr:** <https://www.vultr.com/>
  Starting at $2.50/mo for 1 core, 512MB RAM, 10GB SSD
- **Amazon(AWS) Lightsail:** <https://amazonlightsail.com/>
  Starting at $3.50/mo (first month free) for 1 core, 512MB RAM, 20GB SSD
- **Time4VPS:** <https://www.time4vps.eu/>
  Starting at €3.99/month for 1 core, 2GB RAM, 20GB SSD
- **VIRMACH:** <https://virmach.com/>
  Full Windows and Linux Desktop VPS starting at $7/mo and $1/mo respectively

• This is a list of hosting providers, not a backing/support for them. You will need to make your own decision.`;
    if(reply) {
      final = {
        success: true,
        data: reply
      };
      return res.json(final);
    }
  } else if(message.includesOf(["wy-rather", "wyr", "would-you-rather", "would you rather"])) {
    reply = shuffle(["Would you rather always be 10 minutes late or always be 20 minutes early?","Would you rather lose all of your money and valuables or all of the pictures you have ever taken?","Would you rather be able to see 10 minutes into your own future or 10 minutes into the future of anyone but yourself?","Would you rather be famous when you are alive and forgotten when you die or unknown when you are alive but famous after you die?","Would you rather go to jail for 4 years for something you didn't do or get away with something horrible you did but always live in fear of being caught?","Would you rather accidentally be responsible for the death of a child or accidentally be responsible for the deaths of three adults?","Would you rather your shirts be always two sizes too big or one size too small?","Would you rather live in the wilderness far from civilization or live on the streets of a city as a homeless person?","Would you rather the general public think you are a horrible person but your family be very proud of you or your family think you are a horrible person but the general public be very proud of you?","Would you rather live your entire life in a virtual reality where all your wishes are granted or in the real world?","Would you rather be alone for the rest of your life or always be surrounded by annoying people?","Would you rather never use social media sites / apps again or never watch another movie or TV show?","Would you rather have an easy job working for someone else or work for yourself but work incredibly hard?","Would you rather be the first person to explore a planet or be the inventor of a drug that cures a deadly disease?","Would you rather have a horrible short term memory or a horrible long term memory?","Would you rather be completely invisible for one day or be able to fly for one day?","Would you rather be locked in a room that is constantly dark for a week or a room that is constantly bright for a week?","Would you rather be poor but help people or become incredibly rich by hurting people?","Would you rather live without the internet or live without AC and heating?","Would you rather have a horrible job, but be able to retire comfortably in 10 years or have your dream job, but have to work until the day you die?","Would you rather find your true love or a suitcase with five million dollars inside?","Would you rather be able to teleport anywhere or be able to read minds?","Would you rather die in 20 years with no regrets or die in 50 years with many regrets?","Would you rather be feared by all or loved by all?","Would you rather know when you are going to die or how you are going to die? (You can't change the time or method of your death.)","Would you rather be transported permanently 500 years into the future or 500 years into the past?","Would you rather never be able to use a touchscreen or never be able to use a keyboard and mouse?","Would you rather be able to control fire or water?","Would you rather have everything you eat be too salty or not salty enough no matter how much salt you add?","Would you rather have hands that kept growing as you got older or feet that kept growing as you got older?","Would you rather have unlimited sushi for life or unlimited tacos for life? (both are amazingly delicious and can be any type of sushi / taco you want)","Would you rather be unable to use search engines or unable to use social media?","Would you rather give up bathing for a month or give up the internet for a month?","Would you rather donate your body to science or donate your organs to people who need them?","Would you rather go back to age 5 with everything you know now or know now everything your future self will learn?","Would you rather relive the same day for 365 days or lose a year of your life?","Would you rather have a golden voice or a silver tongue?","Would you rather be able to control animals (but not humans) with your mind or control electronics with your mind?","Would you rather suddenly be elected a senator or suddenly become a CEO of a major company. (You won't have any more knowledge about how to do either job than you do right now.)","Would you rather sell all of your possessions or sell one of your organs?","Would you rather lose all of your memories from birth to now or lose your ability to make new long term memories?","Would you rather be infamous in history books or be forgotten after your death?","Would you rather never have to work again or never have to sleep again (you won't feel tired or suffer negative health effects)?","Would you rather be beautiful / handsome but stupid or intelligent but ugly?","Would you rather get one free round trip international plane ticket every year or be able to fly domestic anytime for free?","Would you rather be balding but fit or overweight with a full head of hair?","Would you rather be able to be free from junk mail or free from email spam for the rest of your life?","Would you rather be fluent in all languages and never be able to travel or be able to travel anywhere for a year but never be able to learn a word of a different language?","Would you rather have an unlimited international first class ticket or never have to pay for food at restaurants?","Would you rather see what was behind every closed door or be able to guess the combination of every safe on the first try?","Would you rather live in virtual reality where you are all powerful or live in the real world and be able to go anywhere but not be able to interact with anyone or anything?","Would you rather never be able to eat meat or never be able to eat vegetables?","Would you rather give up watching TV / movies for a year or give up playing games for a year?","Would you rather always be able to see 5 minutes into the future or always be able to see 100 years into the future?","Would you rather super sensitive taste or super sensitive hearing?","Would you rather be a practicing doctor or a medical researcher?","Would you rather be married to a 10 with a bad personality or a 6 with an amazing personality?","Would you rather never be able to drink sodas like coke again or only be able to drink sodas and nothing else?","Would you rather have amazingly fast typing / texting speed or be able to read ridiculously fast?","Would you rather know the history of every object you touched or be able to talk to animals?","Would you rather be a reverse centaur or a reverse mermaid/merman?","Would you rather have constantly dry eyes or a constant runny nose?","Would you rather be a famous director or a famous actor?","Would you rather not be able to open any closed doors (locked or unlocked) or not be able to close any open doors?","Would you rather give up all drinks except for water or give up eating anything that was cooked in an oven?","Would you rather be constantly tired no matter how much you sleep or constantly hungry no matter what you eat? Assuming that there are no health problems besides the feeling of hunger and sleepiness.","Would you rather have to read aloud every word you read or sing everything you say out loud?","Would you rather have whatever you are thinking appear above your head for everyone to see or have absolutely everything you do live streamed for anyone to see?","Would you rather be put in a maximum security federal prison with the hardest of the hardened criminals for one year or be put in a relatively relaxed prison where wall street types are held for ten years?","Would you rather have a clown only you can see that follows you everywhere and just stands silently in a corner watching you without doing or saying anything or have a real life stalker who dresses like the Easter bunny that everyone can see?","Would you rather kill one innocent person or five people who committed minor crimes?","Would you rather have a completely automated home or a self-driving car?","Would you rather work very hard at a rewarding job or hardly have to work at a job that isn't rewarding?","Would you rather be held in high regard by your parents or your friends?","Would you rather be an amazing painter or a brilliant mathematician?","Would you rather be reincarnated as a fly or just cease to exist after you die?","Would you rather be able to go to any theme park in the world for free for the rest of your life or eat for free at any drive through restaurant for the rest of your life?","Would you rather be only able to watch the few movies with a rotten tomatoes score of 95-100% or only be able to watch the majority of movies with a rotten tomatoes score of 94% and lower?","Would you rather never lose your phone again or never lose your keys again?","Would you rather have one real get out of jail free card or a key that opens any door?","Would you rather have a criminal justice system that actually works and is fair or an administrative government that is free of corruption?","Would you rather have real political power but be relatively poor or be ridiculously rich and have no political power?","Would you rather have the power to gently nudge anyone's decisions or have complete puppet master control of five people?","Would you rather have everyone laugh at your jokes but not find anyone else's jokes funny or have no one laugh at your jokes but you still find other people's jokes funny?","Would you rather be the absolute best at something that no one takes seriously or be well above average but not anywhere near the best at something well respected?","Would you rather lose the ability to read or lose the ability to speak?","Would you rather live under a sky with no stars at night or live under a sky with no clouds during the day?","Would you rather humans go to the moon again or go to mars?","Would you rather never get angry or never be envious?","Would you rather have free Wi-Fi wherever you go or be able to drink unlimited free coffee at any coffee shop?",
    "Would you rather be compelled to high five everyone you meet or be compelled to give wedgies to anyone in a green shirt?","Would you rather live in a house with see-through walls in a city or in the same see-though house but in the middle of a forest far from civilization?","Would you rather take amazing selfies but all of your other pictures are horrible or take breathtaking photographs of anything but yourself?","Would you rather use a push lawn mower with a bar that is far too high or far too low?","Would you rather be able to dodge anything no matter how fast it's moving or be able ask any three questions and have them answered accurately?","Would you rather live on the beach or in a cabin in the woods?","Would you rather lose your left hand or right foot?","Would you rather face your fears or forget that you have them?","Would you rather be forced to dance every time you heard music or be forced to sing along to any song you heard?","Would you rather have skin that changes color based on your emotions or tattoos appear all over your body depicting what you did yesterday?","Would you rather live in a utopia as a normal person or in a dystopia but you are the supreme ruler?","Would you rather snitch on your best friend for a crime they committed or go to jail for the crime they committed?","Would you rather have everything on your phone right now (browsing history, photos, etc.) made public to anyone who Google's your name or never use a cell phone again?","Would you rather eat a box of dry spaghetti noodles or a cup of uncooked rice?","Would you rather wake up as a new random person every year and have full control of them for the whole year or once a week spend a day inside a stranger without having any control of them?","Would you rather be born again in a totally different life or born again with all the knowledge you have now?","Would you rather be lost in a bad part of town or lost in the forest?","Would you rather never get a paper cut again or never get something stuck in your eye again?","Would you rather randomly time travel +/- 20 years every time you fart or teleport to a different place on earth (on land, not water) every time you sneeze?","Would you rather the aliens that make first contact be robotic or organic?","Would you rather be famous but ridiculed or be just a normal person?","Would you rather be an amazing virtuoso at any instrument but only if you play naked or be able to speak any language but only if close your eyes and dance while you are doing it?","Would you rather have a flying carpet or a car that can drive underwater?","Would you rather be an amazing artist but not be able to see any of the art you created or be an amazing musician but not be able to hear any of the music you create?","Would you rather there be a perpetual water balloon war going on in your city / town or a perpetual food fight?","Would you rather find five dollars on the ground or find all of your missing socks?","Would you rather never have another embarrassing fall in public or never feel the need to pass gas in public again?","Would you rather be able to talk to land animals, animals that fly, or animals that live under the water?","Would you rather lose your best friend or all of your friends except for your best friend?","Would you rather it be impossible for you to be woken up for 11 straight hours every day but you wake up feeling amazing or you can be woken up normally but never feel totally rested?"].random());

    final = { success: true, data: reply }; 
    return res.json(final);
  } else if(message.includesOf(["for tune", "for-tune", "fortune", "horo scope", "horo-scope", "horoscope"])) {
    reply = shuffle(["Today it's up to you to create the peacefulness you long for.","A friend asks only for your time not your money.","If you refuse to accept anything but the best, you very often get it.","A smile is your passport into the hearts of others.","A good way to keep healthy is to eat more Chinese food.","Your high-minded principles spell success.","Hard work pays off in the future, laziness pays off now.","Change can hurt, but it leads a path to something better.","Enjoy the good luck a companion brings you.","People are naturally attracted to you.","Hidden in a valley beside an open stream- This will be the type of place where you will find your dream.","A chance meeting opens new doors to success and friendship.","You learn from your mistakes... You will learn a lot today.","If you have something good in your life, don't let it go!","What ever you're goal is in life, embrace it visualize it, and for it will be yours.","Your shoes will make you happy today.","You cannot love life until you live the life you love.","Be on the lookout for coming events; They cast their shadows beforehand.","Land is always on the mind of a flying bird.","The man or woman you desire feels the same about you.","Meeting adversity well is the source of your strength.","A dream you have will come true.","Our deeds determine us, as much as we determine our deeds.","Never give up. You're not a failure if you don't give up.","You will become great if you believe in yourself.","There is no greater pleasure than seeing your loved ones prosper.","You will marry your lover.","A very attractive person has a message for you.","You already know the answer to the questions lingering inside your head.","It is now, and in this world, that we must live.","You must try, or hate yourself for not trying.","You can make your own happiness.","The greatest risk is not taking one.","The love of your life is stepping into your planet this summer.","Love can last a lifetime, if you want it to.","Adversity is the parent of virtue.","Serious trouble will bypass you.","A short stranger will soon enter your life with blessings to share.","Now is the time to try something new.","Wealth awaits you very soon.","If you feel you are right, stand firmly by your convictions.","If winter comes, can spring be far behind?","Keep your eye out for someone special.","You are very talented in many ways.","A stranger, is a friend you have not spoken to yet.","A new voyage will fill your life with untold memories.","You will travel to many exotic places in your lifetime.","Your ability for accomplishment will follow with success.","Nothing astonishes men so much as common sense and plain dealing.","Its amazing how much good you can do if you dont care who gets the credit.","Everyone agrees. You are the best.","LIFE CONSIST NOT IN HOLDING GOOD CARDS, BUT IN PLAYING THOSE YOU HOLD WELL.","Jealousy doesn't open doors, it closes them!","It's better to be alone sometimes.","When fear hurts you, conquer it and defeat it!","Let the deeds speak.","You will be called in to fulfill a position of high honor and responsibility.","The man on the top of the mountain did not fall there.","You will conquer obstacles to achieve success.","Joys are often the shadows, cast by sorrows.","Fortune favors the brave.","An upward movement initiated in time can counteract fate.","A journey of a thousand miles begins with a single step.","Sometimes you just need to lay on the floor.","Never give up. Always find a reason to keep trying.","If you have something worth fighting for, then fight for it.","Stop wishing. Start doing.","Accept your past without regrets. Handle your present with confidence. Face your future without fear.","Stay true to those who would do the same for you.","Ask yourself if what you are doing today is getting you closer to where you want to be tomorrow.","Happiness is an activity.","Help is always needed but not always appreciated. Stay true to your heart and help those in need weather they appreciate it or not.","Hone your competitive instincts.","Finish your work on hand don't be greedy.","For success today, look first to yourself.","Your fortune is as sweet as a cookie.","Integrity is the essence of everything successful.","If you're happy, you're successful.","You will always be surrounded by true friends.","Believing that you are beautiful will make you appear beautiful to others around you.","Happinees comes from a good life.","Before trying to please others think of what makes you happy.","When hungry, order more Chinese food.","Your golden opportunity is coming shortly.","For hate is never conquered by hate. Hate is conquered by love.","You will make many changes before settling down happily.","A man is born to live and not prepare to live.","You cannot become rich except by enriching others.","Don't pursue happiness - create it.","You will be successful in love.","All your fingers can't be of the same length.","Wise sayings often fall on barren ground, but a kind word is never thrown away.","A lifetime of happiness is in store for you.","It is very possible that you will achieve greatness in your lifetime.","Be tactful; overlook your own opportunity.","You are the controller of your destiny.","Everything happens for a reason.","How can you have a beautiful ending without making beautiful mistakes?","Welcome the change coming into your life.","You can open doors with your charm and patience.","You will eat pant today."].random());

    final = { success: true, data: reply }; 
    return res.json(final);
  } else if(message.includesOf(["ln-title", "ln title", "lightnovel title","light novel title"])) {
    const { data } = await axios.get("https://salty-salty-studios.com/shiz/ln.php");
    reply = shuffle(["Your light novel title must be", "The title of your light novel will be", "This is your light novel title"].random()) + ` *${data.match(/<h1>(.+)<\/h1>/i)[1]}*`;

    final = { success: true, data: reply }; 
    return res.json(final);
  } else if(message.includesOf(["advice"])) {
    const data = await fetch("https://api.adviceslip.com/advice").then(res => res.json()).catch(() => null);
    const advices = [
      {
        propability: 0.10,
        name: data.slip.advice
      },{
        propability: 0.09,
        name: `Did you eat any yummy foods while at home? Don't **exhaust** yourself worrying about school.`
      },
      {
        propability: 0.08,
        name: `Watch *Watson Amelia Ch. hololive-EN* videos, it will heal your bad mood.`
      },
      {
        propability: 0.07,
        name: `If you are sad, don't be sad.`
      }
    ];
    let total = 0;
    for(let got in advices) {
      total += advices[got].propability;
    }
    function advice() {
      let pick = Math.random() * total;
      for(let got in advices) {
        pick -= advices[got].propability;
        //console.log(pick)
        if(pick <= 0) {
          return advices[got] ? advices[got].name : "Ask again later.";
        }
      }
    }
    reply = advice();

    final = { success: true, data: reply }; 
    return res.json(final);
  } else if(author) {
    if(author.username && message.includesOf(["name"])) {
      if(message.includesOf(["what", "wut"])) {
        if(message.includesOf(["my "])) {
          reply = shuffle([
            `${author.username}, Let's talk about something else. What's your favorite genre?`,
            `${author.username}, I can remember not only your name, but also your age, gender, location, and a variety of other details about you.`,
            `${author.username}, Let's have a little more fun! What city do you call it home?`,
            `${author.username}, Let's talk about something else. Who is your best friend?`,
            `Your name is ${author.username}! What may I do to assist you?`,
            `Can you ever have trouble remembering your own name? ${author.username}.`
          ].random());
          final = { success: true, data: reply }; 
          return res.json(final);
        }
      }
    }
  } else if(didyoumean && !(didyoumean.commands.some((commands) => commands === message))) {
    const commands = didyoumean3(message.toLowerCase(), didyoumean.commands, { filter: (score, item) => score <= 7 });
    reply = shuffle([`did you mean? '${commands.winner}'`].random());
    return res.json({ success: true, data: reply });
  } else { console.log("Nothing to log.")}

if(bot.info && bot.info.discord) {
	if(message.includesOf(["how to ", "howto ", "how2 ", "hwt ", "how can", "howcan", "how-can"])) {
		if(message.includesOf(["get ", "got "])) {
			if(message.includesOf(["id"])) reply = ["Firstly you must enable **Developer Mode**, to do this head to your discord settings with the :gear: icon on the bottom left of your screen.", `Then head to "Appearance" settings. Enable "Developer Mode" at the bottom.`, "You will now be able to copy IDs easily.", "• For User, right-click the username or user avatar.", "• For Server, right-click the Server name or icon.", "• For Role, right-click the user, right-click the role.", "• For Message, right-click the message or hover and select the ••• button.", "• For Channel, right-click the channel name in the channel list.", "You can also shift+click the Copy ID button on a message to get both channel and message ID. In the right-click menu for any of the fields you've selected, you'll see the Copy ID option. Click it!", "- https://i.imgur.com/tspAV2N.png", ].join("\n");
			if(reply) {
				final = {
					success: true,
					data: reply
				};
				return res.json(final);
			}
		} else if(message.includesOf(["timeout"])) {
			if(message.includesOf(["long", "bypass", "restart", "lasting", "resume"])) {
				reply = 
`Firstly to do is create a \`timeout.js\`, you can use any database but for this toturial
we gonna use enmap.
\`\`\`js
const Enmap = require("enmap");
const _ = require("lodash");
const timeouts = new Enmap({
  name: "timeouts",
  fetchAll: true,
  autoFetch: true
});

module.exports = class Timeouts {
  constructor(key, time) {
      this.key = key
      this.time = time
  }

  add(callback) {

      let tNow = Date.now()
      if (!timeouts.has(this.key)) timeouts.set(this.key, tNow)
      let timeout = this.time
      let time = (timeouts.get(this.key) - Date.now()) + timeout

      setTimeout(() => {
          timeouts.delete(this.key)
          if (_.isFunction(callback)) {
              return callback()
          }
      }, time)

  }
}\`\`\`
after that require it and create class **Timeout**:\`\`\`js
const Timeout = require("./timeout");
const timeout = new Timeout("test", 10000); // First param would be the key of the timeout, second is the time

timeout.add(() => {
    message.channel.send("Nekoyasui is here!");
})
\`\`\``
			} else {
				reply = "Timeout and interval: <https://javascript.info/settimeout-setinterval>"
			}
			if(reply) {
				final = {
					success: true,
					data: reply
				};
				return res.json(final);
			}
		} else if(message.includesOf(["handling"])) {
			if(message.includesOf(["command"])) {
				const data = fs.readFileSync(`${process.cwd()}/code/handling/commands.js`, "utf8");
				reply = ["Firstly add the Collection/commandPath & require the command handling", "in your \`index.js\`, after that create a \`commands.js\` then put the code.", `\`\`\`js\n${data}\`\`\``].join("\n");
			} else if(message.includesOf(["event"])) {
				const code = fs.readFileSync(`${process.cwd()}/code/handling/events.js`, "utf8");
				reply = ["Firstly add the eventsPATH & require the event handling", "in your \`index.js\`, after that create a \`events.js\` then put the code.", `\`\`\`js\n${code}\`\`\``, "So, this example what are inside of event code.", `\`\`\`js\n// src/events/ready.js
exports.help = {
  name: "ready",
  description: "keek"
};

exports.run = (client) => { // eslint-disable-line no-unused-vars
  console.log("Bot are now Online!");
}\`\`\``].join("\n");
			} else {}
			if(reply) {
				final = {
					success: true,
					data: reply
				};
				return res.json(final);
			}
		} else if(message.includesOf(["mention"])) {
			reply = 
`Getting mentions from a message:
\`\`\`js\nconst user = message.mentions.users.first();
const member = message.mentions.members.first();
const role = message.mentions.roles.first();
const channel = message.mentions.channels.first();\`\`\`
Parsing mentions from content: 
<https://discordjs.guide/miscellaneous/parsing-mention-arguments.html>`;
			if(reply) {
				final = {
					success: true,
					data: reply
				};
				return res.json(final);
			}
		} else if(message.includesOf(["react"])) {
			reply = 
`How to use \`<message>.react()\`
**For non-custom emojis:**
- Find the emoji you wish to react with, for example :ok_hand:, and send it as the following in your Discord client: \`\:ok_hand:\`
This will result in the following: \`👌\`. Copy this character directly into your \`.react()\` method as a string.

**For custom emotes:**
- If you have the emoji ID (visible by escaping the emoji as shown above), you can place it directly inside the \`.react()\` method as a string. (not all of what you got, just the number part)
- Alternatively, you may retrieve an emoji object by using either \`.find()\` or \`.get()\` on the \`<guild>.emojis.cache\` Collection. Once you have that, place it inside the \`.react()\` method.`;
			if(reply) {
				final = {
					success: true,
					data: reply
				};
				return res.json(final);
			}
		} else if(message.includesOf(["reactinorder", "react in order", "react-in-order"])) {
			reply = `<https://discordjs.guide/popular-topics/reactions.html#reacting-in-order>`;
			if(reply) {
				final = {
					success: true,
					data: reply
				};
				return res.json(final);
			}
		} else if(message.includesOf(["reaction"])) {
			reply = 
`Adding reactions, maintaining their order and awaiting them:
<https://discordjs.guide/popular-topics/reactions.html>`;
			if(reply) {
				final = {
					success: true,
					data: reply
				};
				return res.json(final);
			}
		} else if(message.includesOf(["parse"])) {
			reply = `Learn how to manually parse message content for mentions: 
  <https://discordjs.guide/miscellaneous/parsing-mention-arguments.html>`;
			if(reply) {
				final = {
					success: true,
					data: reply
				};
				return res.json(final);
			}
		} else if(message.includesOf(["embed"])) {
			reply = `Building and sending embeds: <https://discordjs.guide/popular-topics/embeds.html>`;
			if(reply) {
				final = {
					success: true,
					data: reply
				};
				return res.json(final);
			}
		}
	} else if(message.includesOf(["embed"])) {
    if(message.includesOf(["limit"])) {
		reply = `\`\`\`xl\nEmbed property character limits:
title       : 256
author name : 256
description : 2048
field title : 256
field value : 1024
footer      : 2048\`\`\`
You may have up to 25 fields in an embed. A regular bot message can have 1 embed, webhooks up to 10.
The sum of all characters in an embed structure must not exceed 6000 characters.
<https://discordapp.com/developers/docs/resources/channel#embed-limits>`;
      if(reply) {
        final = {
          success: true,
          data: reply
        };
        return res.json(final);
      }
    }
	} else if(message.includesOf(["customprefix", "custom prefix", "custom-prefix"])) {
		reply = `If you want your bot to have custom prefixes for every guild:
  -You should use a database such as \`QuickDB, Mongodb, MySQL etc.\`
    And you might want to see the offical guide for this
    <https://discordjs.guide/keyv/#installation>
    <https://discordjs.guide/keyv/#prefix-command>`;
		if(reply) {
			final = {
				success: true,
				data: reply
			};
			return res.json(final);
		}
	} else if(message.includesOf(["Keyv"])) {
		reply = `**Keyv** is a simple key/value storage wrapper that supports multiple backends such as SQLite and PostgreSQL.
  It's very simple to setup and use and is fully scalable as your bot grows.
  <https://discordjs.guide/keyv/>
  <https://github.com/lukechilds/keyv>`;
		if(reply) {
			final = {
				success: true,
				data: reply
			};
			return res.json(final);
		}
	} else if(message.includesOf(["sequelize"])) {
		reply = `Learn how to query databases using objects with Sequelize:
  <https://discordjs.guide/sequelize/>`;
		if(reply) {
			final = {
				success: true,
				data: reply
			};
			return res.json(final);
		}
	} else if(message.includesOf(["dateformat", "date format", "date-format"])) {
		reply = `Native \`Date\`  conversion functions:
  \`\`\`js
  Date#toDateString(): Wed Jan 01 2020
  Date#toISOString(): 2020-01-01T00:00:00.000Z
  Date#toLocaleDateString(): 1/1/2020
  Date#toLocaleString(): 1/1/2020, 12:00:00 AM
  Date#toLocaleTimeString(): 12:00:00 AM
  Date#toString(): Wed Jan 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)
  Date#toTimeString(): 00:00:00 GMT+0000 (Coordinated Universal Time)
  Date#toUTCString(): 00:00:00 GMT+0000 (Coordinated Universal Time)\`\`\`

  Other Date-formatting packages:
  <https://www.npmjs.com/package/date-fns>`;
		if(reply) {
			final = {
				success: true,
				data: reply
			};
			return res.json(final);
		}
	} else if(message.includesOf(["mentionprefix", "mention prefix", "mention-prefix"])) {
		reply = `Allow your bot to be triggered by its regular prefix or by being mentioned:
  <https://discordjs.guide/popular-topics/faq.html#how-do-i-add-a-mention-prefix-to-my-bot>`;
		if(reply) {
			final = {
				success: true,
				data: reply
			};
			return res.json(final);
		}
	} else if(message.includesOf(["partials"])) {
		reply = `Receiving events for uncached structures:
  \`[v12]:\` <https://discordjs.guide/popular-topics/partials.html?v=12> and
  https://discord.js.org/#/docs/main/stable/topics/partials
  \`[v11]:\` Discord.js drops events if the data for the structure it wants to emit is not there`;
		if(reply) {
			final = {
				success: true,
				data: reply
			};
			return res.json(final);
		}
	} else if(message.includesOf(["selfreact", "self react", "self-react", "botreact", "bot-react"])) {
		reply = `To have your bot react to a message it sends, using .then() and async/await:
  \`\`\`js//.then() method 
  message.channel.send('hello world')
      .then(sentMessage => sentMessage.react("👍"))
      .catch(console.error)

  //async/await method
  const sentMessage = await message.channel.send("hello world");
  sentMessage.react("👍");\`\`\``;
		if(reply) {
			final = {
				success: true,
				data: reply
			};
			return res.json(final);
		}
	} else if(message.includesOf(["statuscode", "status code", "status-code"])) {
		reply = `**HTTP Status Codes**
  When you request data from a web server, it sends back a response, returning a response code which identifies how was the response handled and served.
  Example: \`404\` represents "Not Found".
  Read more: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Status>`;
		if(reply) {
			final = {
				success: true,
				data: reply
			};
			return res.json(final);
		}
	} else if(message.includesOf(["ratelimit", "rate limit", "rate-limit"])) {
		reply = `Ratelimits are dynamically assigned by the API based on current load and may change at any time without notice.
  The scale from okay to api spam and abuse is sliding and heavily depends on the action you are taking.
  (rainbow roles, clock and counter channels or DMing advertisement to all members are examples of things that are not okay)`;
		if(reply) {
			final = {
				success: true,
				data: reply
			};
			return res.json(final);
		}
	} else if(message.includesOf(["args", "arguments"])) {
		reply = `Ever wanted to know how to take user input? Well, look no further, we've got you covered! This section covers the very crucial feature of allowing arguments with your commands.
  You'll learn how to pick a message's content apart and make good use of it:
  <http://discordjs.guide/creating-your-bot/commands-with-user-input.html>`;
		if(reply) {
			final = {
				success: true,
				data: reply
			};
			return res.json(final);
		}
	}
} else {}
  const getting = await fetch(`http://api.brainshop.ai/get?bid=${api.id}&key=${api.key}&uid=${uid}&msg=${encodeURIComponent(message)}`).then(res => res.json()).catch(() => {});
  if(!(typeof getting.cnt === "string")) {
    reply = shuffle(["What?", "Huh?", "I don't understand.", "Speak up, please."].random());
    
    final = { success: true, data: reply }; 
    return res.json(final);
  } else {
    reply = getting.cnt
    .replace(/\\n/g, `\n`)
    .replace(/{{name}}/g, `${bot.username}`)
    .replace(`years old.`, `${getAge(moment(epoch).format('LL'))} years old.`)
    .replace(/{{gender}}/g, `${bot.gender ? bot.gender : "male"}`)
    .replace(/{{birthdate}}/g, `${moment(epoch).format("MMMM D, YYYY")}`)
    .replace(/{{birthyear}}/g, `${moment(epoch).format("YYYY")}`)
    .replace(/{{birthday}}/g, `${moment(epoch).format('MMMM Do')}`)
    .replace(/{{birthplace}}/g, `<https://discord.com/invite/${owner.invite}>`)
    .replace(/{{build}}/g, `Nekoyasui Chat API v0.1`)
    .replace(/{{version}}/g, `Nekoyasui Chat API v0.1`)
    .replace(/{{wechat}}/g, `Nekoyasui API`)
    .replace(/{{company}}/g, `<https://api.nekoyasui.ga>`)
    .replace(/{{location}}/g, `<https://discord.com/invite/${owner.invite}>`)
    .replace(/{{country}}/g, `${bot.country}`)
    .replace(/{{state}}/g, `${bot.city}`)
    .replace(`San Francisco`, `${bot.country}`)
    .replace(/{{Email}}/g, `<https://discord.com/users/${owner.id}>`)
    .replace(/{{etype}}/g, `${bot.description}`)
    .replace(/{{family}}/g, `${bot.description}`)
    .replace(/{{genus}}/g, `${bot.description}`)
    .replace(/{{job}}/g, `${bot.description}`)
    .replace(/{{species}}/g, `${bot.description}`)
    .replace(/{{class}}/g, `${bot.description}`)
    .replace(/{{forfun}}/g, `gaming`)
    .replace(/{{forfun}}/g, `gaming`)
    .replace(/{{master}}/g, `${owner.username}#${owner.discriminator}`)
    .replace(`great botmaster`, shuffle(["Master", "Owner", "The Omipotent", "The almighty"].random()))
    .replace(`I'm designed to be a male chatbot. `, `\n${shuffle([bot.description].random())}\n`)
    .replace(`your best chatbot forever.`, shuffle(["Appreciate The Compliment, You yourself are a fine user ,", "Many Thanks `👑` .", `your personal companion.`].random()))
    .replace(`I"m a chatbot.`, `${bot.description}`)
    .replace(`chatbot`, `${bot.description}`)
    .replace(`I'm using Netscape`, shuffle(["I'm using Discord Browser.", "I'm not using the same UID.", "I'm using Laptop."].random()))
    .replace(`Telnet `, "OperaGX ")
    .replace(` (translations by Microsoft translator)`, "")
    .replace(`machine translation`, "translation")
    .replace(`Today is `, shuffle(["Date today is ", "I'm enjoying chatting on you, today is ", "It's nice! by the way, today is ", "Today is "].random()))
    .replaceAll("Thanks for that web address.", shuffle(["Thanks for sharing that website address.", "Thank you for sharing the Link of that website.", `Join my master discord server, if you enjoy sharing links.\n<https://discord.com/invite/${owner.invite}>`].random()))

    //translate
    const translate = reply.split(" -> ");
    if(translate.length === 2) {
      reply = shuffle([
        `${translate[1]}, is the translation of *${translate[0]}*.`,
        `Hmmm, the translation of *${translate[0]}* is ${translate[1]}`,
        `*${translate[0]}* ⮞ ${translate[1]}`].random());
    }
    final = { success: true, data: reply }; 
  }
    console.log("final", getting, reply)
    return res.json(final);
});

module.exports = router;
