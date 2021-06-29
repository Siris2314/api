//Author : Nekoyasui#6804 (817238971255488533)

// index.js
client.eventsPATH = `${process.cwd()}/src/events`;
require(`${process.cwd()}/handling/events.js`)(client);//Handling

// handling/events.js
const fs = require("fs");

module.exports = (client) => {
  const path = client.eventsPATH;
  const events = fs.readdirSync(`${path}/`).filter((files) => files.split(".").pop() === "js");
  if (events.length <= 0) return console.log("Events Handling", `❎ | Could not find any events listener at  ${path} folder`);

  for (const file of events) {
    const event = require(`${path}/${file}`);
    delete require.cache[require.resolve(`${path}/${file}`)];
    
    const Name = file.split(".")[0];
    console.log("Events Handling", `✅ | ${Name} Event`);

    if(!(event.help)) throw new Error(`${file} > Help function is required!.`);
    if(!(event.help.name)) throw new Error(`${file} > missing a help.name, or help.name is not a string.`);
    if(!(event.run)) throw new Error(`${file} > Run function is required!.`);

    //client.on(event.help.name, event.run.bind(null, client));
    client.on(event.help.name, (...args) => event.run(client, ...args));
  }
}