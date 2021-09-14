![SoloLeveling](https://i.imgur.com/6UMDGFk.png)

SoloLeveling is the ***original*** multi-class single character leveling script for Kolbot. The overall goal of the project is to be the easiest to use and fastest leveling script for any character class.

**NOTE:** This script is designed to be only run from [https://github.com/blizzhackers/kolbot](https://github.com/blizzhackers/kolbot). Most errors occur from using the wrong Kolbot repo installation. 

If you enjoy using SoloLeveling consider supporting me at [buymeacoffee.com/isid0re](https://www.buymeacoffee.com/isid0re).

## How SoloLeveling came to exist and where its going
***Standing on the shoulders of giants - Sir Isaac Newton*** 

Autoplay bots have been around for a while, so the concept of a kolbot based leveling script isn't new. What previously existed were sorceress based leveling bots focused on MF farming: Sonic, AutoPlay, and AutoSorc, respectively. Each on of those built on eachother to create a method that worked for what most botters want, a fast script that can get to hell and MF the key areas for profit. 

That wasn't what I wanted or needed. I play solo with limited time for gaming, therefore I needed a way to level up my characters and gear them up by themselves so I had a character ready to use when I wanted to play the character, regardless of the class.

Initially, I wanted a paladin to try and do Ubers, but I didn't want to level up a paladin. At the same time the covid pandemic was in full swing and I had become aware of the speedrunner community. With the lack of a non-sorceress leveling script and new found knowledge of speedrunner methods to level quickly, I started a new hobby learning to code. Thus, the process of making my own leveling script for all classes was born. 

I'm not a coder or programmer, but I do have a background in structured thought. So I started by looking at the sorceress based scripts to see if they could be modified. The results showed it was not an ideal solution. Therefore, I started building off the quest.js script of regular kolbot and attempted to keep it with as minimal modifications as possible. 

With lots of questions asked on blizzhackers discord initially, I started adding in functions to fix problems with walking scripts, such as the act 5 monster doors, summoner telepad portals, and objects blocking the pathing movements.

Prior to the SoloLeveling, leveling scripts either used static or algebraic lines to evaluate tiers. I didn't like that approach as it lead to over emphasising certain resists or attributes, so I created the rating system dynamictiers.js. It was the creation of my own dynamictier functions when SoloLeveling truly became its own script. It was that point, when I decided I could really make it fully automated and something that went beyond what currently existed.

Since inception I've added in completely new functions that have become standard operating for walking bots, a methodology that allowed the bot to be driven completely from the profile without any file edits, a truly dynamic autoequip scoring, autoequipping for charms, implemented baalwave skipping, and real time diablo lightning avoidance. 

Using trial and error over the course of its development the bot has grown to its current status and it will continue to get better. It is a far cry from my original single file script. While I've brought innovation and a novel approach to using kolbot, I have been fortunate to have been advised by some of the major thought leaders of blizzhackers: Jaenster, DZIK, Nishimura_Katsuo, macohan, Laz, Fa-b, and Noah in one way or another. Their guidance has really helped improve my programming skills and understanding of botting. 

I never had planned to release this bot to the public as it was for my own personal hobby project. It became public because I didn't know how to setup a github repo and inadvertantly made it available to others. Since it became public domain I rolled with it and others started to take notice. SoloLeveling has always been a personal hobby project and not something planned or developed for recognition of the community. There has never been a team of developers for SoloLeveling either, but there have been users of the script who submitted PRs to help it along. Since its popularity has grown after the Kolbot-Forever youtube video, others have decited to make their own versions based off my script. 

I am content to just work on my little project and complete the original goal: the easiest to use and fastest leveling script for any character class. I believe i have succeeded in the first part with the fully profile driven mechanics. As for the fastest leveling script, I continue to try out different methods, build designs, and script sequences that can work with kolbot. 

Thank you all for your appreciation of SoloLeveling and continued support. I am truly flattered by the attention my hobby project has gained.

## Features
- Operates in Hell difficulty within 24 hours
- Includes character build options for final respec
- Plays and finishes the game through Act 5 Hell
- Hires class/build specific mercenary
- Fully configured Autoequip for bot and mercenary (includes inventory charms)
- Makes and equips CTA and spirit shield on swap
- Will add and use sockets (for ex. PDiamonds to Moser's, Ral to Andariel's Visage)

## Available Characters and Builds
| Amazon | Sorceress | Necromancer | Paladin | Barbarian | Druid | Assassin |
|:------:|:-------:|:-------:|:------:|:------:|:------:|:-----:|
| Javazon | Cold | Poison | Hammerdin| Singer | Wind |Trapsin|
| Witchyzon | BlizzBaller |   Bone | Smiter| Frenzy | Elemental | Bumper |
| Bumper | Meteorb | Summon | Bumper | Whirlwind| Bumper |
| | Blova | Bumper | | Bumper |
| | Lightning | |
| | Bumper |

## Frequently Asked Questions
**Q: Why isn't the bot making the build I selected?**

**A:** The bot follows a set build progression. As it progresses, it will respecialize 2 times transitioning from a start build to a leveling build, ending at the selected finalbuild.

**Q: The bot has beaten diablo (classic) / baal, so why isn't moving on to the next difficulty?**

**A:** The bot will only progress once it has reached a minimum minimum character level (33 for normal and 65 for nightmare) and will not start the next difficulty with negative resistances. If the bot is more than 5 levels higher than the minimum character level and has not reached the required resistances, it will automatically move to the next difficulty.

**Q: How can I run more than one of the same class?**

**A:** Simply append a number after the class name. For example, if you want to run 5 sorceresses just name the profiles: `SCL-SORC-1`, `SCL-SORC-2`, `SCL-SORC-3`, `SCL-SORC-4`, `SCL-SORC-5`. Example Profile Names are listed at the bottom of the install guide.

**Q: HELP!!! There an error when starting the bot?**

**A:** There was a bad installation OR the profile settings are wrong. First verify that you using the kolbot version linked the install guide below. Next, confirm you have installed all the files into their proper locations (including overwriting the existing `_customconfig.js` and `default.dbj`). Finally, verify the profile name and infotag follow the format of the install guide's instructions.

## Install Guide
| Step | Instructions | |
|:------:|:-------|-------:|
| 1.| Download Kolbot here: [github.com/blizzhackers/kolbot](https://github.com/blizzhackers/kolbot). |![blizzhackers github](https://i.imgur.com/RksqKEA.jpg) |
| 2.| Click the green button to Download SoloLeveling. |![enter image description here](https://i.imgur.com/cNqZDbW.jpg) |
| 3.a| Copy and paste the following: `default.dbj`, `D2BotSoloLevelingEntry.dbj`, `D2BotSoloCleaner.dbj`, and the entire `\libs` folder into `\d2bs\kolbot`.| |
|3.b|A successful installation will show 2 new files in the folder and look similar to the second image|![extract into](https://i.imgur.com/5OxVVNH.jpg)| 4.| Select Add for new a Kolbot Profile. | ![Add-profile.jpg](https://imgur.com/tHs9ZoH.jpg)|
| 4.a| Select and Input a profile name. See the **Possible Profile Name Choices** below for a list of available options. | ![set profile name](https://imgur.com/B865nPU.jpg) |
| 4.b| ***Optional*** Input your account name. If no name than a random account is created. | |
| 4.c|***Optional*** Input your account password. If no name than a random password is created. | |
| 4.d|***Optional*** Input your character name. If no name than a random name is created. | ![enter character name](https://i.imgur.com/Casmjbc.jpg) |
|5.| Select Entry Script `D2BotSoloLevelingEntry.dbj`.| ![Select Entry Script](https://imgur.com/tZnH7kU.jpg)|
|6.| Input your Info Tag Information. See **Available Characters and Builds** for a a list of options. <br><br> Make sure the spelling matches the listed builds and there are no trailing spaces. | ![enter image description here](https://i.imgur.com/gmUQvbw.jpg)|
|7.|Ensure your Game Path, Key List, Realm, Mode are all set on the settings you want to use then click Apply.||
|8.|Run the Bot.||
|9.|Enjoy!||

## Possible Profile Names 
| Prefix | Description|
|:----|:--|
|HCCNL| Hardcore Classic NonLadder|
|HCCL| Hardcore Classic Ladder|
|HCNL| Hardcore Expansion NonLadder|
|HCL| Hardcore Expansion Ladder|
|SCCNL| Softcore Classic NonLadder|
|SCCL| Softcore Classic Ladder|
|SCNL| Softcore Expansion NonLadder|
|SCL| Softcore Expansion Ladder|

| Suffix | Description|
|:----|:--|
|ZON| Amazon Class|
|SORC| Sorceress Class|
|NECRO| Necromancer Class|
|PAL| Paladin Class|
|BARB| Barbarian Class |
|DRU| Druid Class|
|SIN| Assassin Class|

#### Example Profile Names
- **SCL-PAL** would make a softcore expansion ladder paladin
- **HCL-SIN** would make a hardcore expansion ladder assassin
- **SCNL-SORC** would make a softcore expansion nonladder sorceress
- **HCNL-DRU** would make a hardcore expansion nonladder druid
- **SCCL-NECRO** would make a softcore classic ladder necromancer
- **HCCL-NECRO** would make a hardcore classic ladder necromancer
- **SCCNL-PAL** would make a softcore classic nonladder paladin
- **HCCNL-SORC** would make a hardcore classic nonladder sorceress

## Discord
Join me on Discord. Link is here: https://discord.gg/q7tME8RAHh

## Support SoloLeveling
This is a hobby project that I'm doing in my spare time. So if you enjoy using SoloLeveling consider supporting me at [buymeacoffee.com/isid0re](https://www.buymeacoffee.com/isid0re).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)

## Banner Image 
The banner for SoloLeveling was graciously provided by Patricia Dias.
