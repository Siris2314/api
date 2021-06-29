module.exports = {
	success: {
		success: "true",
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	hello: {
		hello: "world",
	},
	home: {
		success: "true",
		api: {
			economy: {
        request: "GET",
				link: "https://api.nekoyasui.ga/economy",
				source: "https://github.com/maisans-maid/Mai/blob/master/commands/social/profile.js",
				usage: {
					username: "Username (value)[Nekoyasui]",
					discriminator: "Discriminator (number)[6804]",
					color: "Color (hex)[#eee]",
					bio: "Bio (value)[Im Noob]",
					birthdate: "Birtday (date)[Nov 11, 2002]",
					wallet: "Wallet (number)[5000]",
					bank: "Bank (number)[5000]",
					tip: "Tip (number)[1]",
					level: "Server Level (number)[1]",
					exp: "Server XP (number)[250]",
					rank: "Server Rank (number)[1]",
					global: "Global Rank (number)[1]",
					avatar: "Profile Pic (link)[https://i.imgur.com/7BLsVJ5.png]",
					wallpaper: "Wallpaper (link)[https://i.imgur.com/e6uzQaA.jpg]",
					pattern: "Pattern (link)[https://i.imgur.com/nx5qJUb.png]",
					hat: "Wreath (link)[https://i.imgur.com/u64ReU3.png]",
					wreath: "Wreath (link)[https://i.imgur.com/bzhoYpa.png]",
					emblem: "Emblem (link)[https://i.imgur.com/NmpP8oU.png]",
				},
				example: `https://api.nekoyasui.ga/economy?username=Nekoyasui&discriminator=6804&color=&bio=Im%20noob&birthdate=November 9,2002&wallet=5000&bank=5000&tip=1&level=4&exp=250&rank=1&global=6&avatar=https://i.imgur.com/7BLsVJ5.png&wallpaper=&pattern=https://i.imgur.com/mdx9uHB.jpg&hat=https://i.imgur.com/u64ReU3.png&wreath=https://i.imgur.com/bzhoYpa.png&emblem=https://i.imgur.com/CmdVWzS.png`,
			},
			chat: {
        request: "POST",
				link: "https://api.nekoyasui.ga/chat",
				//source: "https://github.com/maisans-maid/Mai/blob/master/commands/social/profile.js",
				usage: {
          message: "Message (value)[hi]",
          uid: "UID (number)[message.author.id]",
          bot: {
            name: "Name (value)[Nekoyasui]",
            birthdate: "Birthdate (date)[11/2/2002]",
            prefix: "Prefix (value)[?]",
            gender: "Gender (value)[male]",
            description: "Description (value)[I'm a Multipurpose Discord Bot with many features.]"
          }
        },
				code: `https://gist.github.com/NekoYasui/d47783cb71464b4743c3ae5d333cdb48`,
      }
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
		creators: {
			1: "Nekoyasui#1400"
		},
	},
	notfound: {
		success: "false",
		error: {
			type: "HttpStatus",
			message: "404 - Not Found"
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	discriminator: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The discriminator field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	username: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The username field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	color: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The color field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	color_format: {
		success: "false",
		error: {
			type: "ColorException",
			message: "The color field must valid HEX color."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	bio: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The bio field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	birthdate: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The birthdate field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	date: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The birthdate field are invalid date format."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	wallet: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The wallet field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	bank: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The bank field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	tip: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The tip field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	level: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The level field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	xp: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The xp field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	rank: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The rank field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	global: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The global field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	avatar: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The avatar field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	avatar_format: {
		success: "false",
		error: {
			type: "ImageTypeException ",
			message: "The avatar field must be (png|jpeg) type url."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	wallpaper: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The wallpaper field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	wallpaper_format: {
		success: "false",
		error: {
			type: "ImageTypeException ",
			message: "The wallpaper field must be (png|jpeg) type url."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	pattern: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The pattern field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	pattern_format: {
		success: "false",
		error: {
			type: "ImageTypeException ",
			message: "The pattern field must be (png|jpeg) type url."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	uid: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The uid field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	owner: {
    required: {
        success: "false",
        error: {
          type: "ValidationException",
          message: `The owner information is required.
          ownerid`
        },
        links: {
          website: "http://nekoyasui.ga/",
          github: "https://github.com/nekoyasui",
          discord: "http://discord.gg/n6EnQcQNxg",
        },
      },
    id: {
        success: "false",
        error: {
          type: "ValidationException",
          message: "The ownerid field is required."
        },
        links: {
          website: "http://nekoyasui.ga/",
          github: "https://github.com/nekoyasui",
          discord: "http://discord.gg/n6EnQcQNxg",
        },
      },
    username: {
        success: "false",
        error: {
          type: "ValidationException",
          message: "The ownername field is required."
        },
        links: {
          website: "http://nekoyasui.ga/",
          github: "https://github.com/nekoyasui",
          discord: "http://discord.gg/n6EnQcQNxg",
        },
      },
    discriminator: {
        success: "false",
        error: {
          type: "ValidationException",
          message: "The ownertag field is required."
        },
        links: {
          website: "http://nekoyasui.ga/",
          github: "https://github.com/nekoyasui",
          discord: "http://discord.gg/n6EnQcQNxg",
        },
      },
	},
	prefix: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The prefix field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	message: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The message field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	},
	name: {
		success: "false",
		error: {
			type: "ValidationException",
			message: "The name field is required."
		},
		links: {
			website: "http://nekoyasui.ga/",
			github: "https://github.com/nekoyasui",
			discord: "http://discord.gg/n6EnQcQNxg",
		},
	}
};