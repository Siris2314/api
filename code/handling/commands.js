//Author : Nekoyasui#6804 (817238971255488533)

// index.js
client.commands = new Collection();
client.aliases = new Collection();
client.helps = new Collection();
client.commandsPATH = `${process.cwd()}/src/commands`;

require(`${process.cwd()}/handling/commands.js`)(client);//Handling


// handling/commands.js
const fs = require("fs");

module.exports = (client) => {
  const path = `${process.cwd()}/src/commands`;
  const categories = fs.readdirSync(`${path}/`).filter((category) => !category.includes("."));
  if (categories.length <= 0) return console.log(`❎ | Could not find any category at ${path}`);
  for (const category of categories) { console.log("Commands Handling", `${category} Category`);

    const commands = fs.readdirSync(`${path}/${category}/`)
    .filter((files) => files.split(".").pop() === "js");
    if (commands.length <= 0) return console.log(`❎ | Couldnt find any commands at ${path}/${category}`);

    for (const file of commands) {
      const command = require(`${path}/${category}/${file}`);
      delete require.cache[require.resolve(`${path}/${category}/${file}`)];

      if(!(command.name)) return console.error(`❌ | ${file} > missing a help.name`);
      console.log("Commands Handling", `✅ | ${command.name} Command`);
      
      //Start setting up the Collection
      client.commands.set(command.name, command);
      command.aliases.forEach((alias) => {
        client.aliases.set(alias, command.name);
      });

    }
  }
}