# ttrpg-generator
A generator plugin for obsidian for TTRPGs that currently only generates NPCs. A while back I was having difficulty coming up with NPCs on the fly so I ended up making a really elaborate templater file which then also had a python script to edit it and it was a lot more nonsense than it was worth. I recently got back into DMing and found the process needlessly time-consuming so I decided to take on the even more time-consuming task of turning it into a plugin. 1 month later and here it is. An NPC generator that is highly customisable, highly detailed and doesn't rely on AI or an API key to use. To preface, parts of the plugin (especially the CSS as I am terrible with CSS) were made with the usage of AI as I am not a great programmer and did this between university courses. Please let me know issues or optimisations that can be made to make the plugin better. 

# Features:
- Generates NPCs.
- Has a table for all generated NPCs that updates with everything changed and can edit from within the index table
- Customisable options
- Customisable categories
- Customisable template
- Weighted randomiser and non-weighted
- You can add and remove items from the randomiser
- Editable properties by right click in the index table (for the normal table, all tabs, for the card view, only the plot relevancy)

# Known Issues:
- NPC Tokens do not come with the plugin download
- Sidebar index does not look as good in table view as it does in card view due to texxt being cut off unless it's the same size as the main window

# Installation:
## Manual:
- Download the main.js, styles.css and manifest.json
- Go to .obsidian/plugins
- Make a folder for this plugin
- Add the downloaded files to the new folder
- Refresh plugins and enable

## BRAT:
- Install the BRAT plugin (https://github.com/TfTHacker/obsidian42-brat) from the obsidian community plugins
- Add this link as a beta plugin: https://github.com/RedReaper-21/ttrpg-generator

# Future Features:
- I'll try to fix the NPC tokens issue but this is my first ever obsidian plugin so it may take a bit
- A potential shop generator because justbizns on the obsidian TTRPG discord pointed out that with some modifications, it can be used for that as well
- Better statblocks that change depending on the class of the NPC
- (This is still incredibly hypothetical and way down the line but is something i'd like to have) Some way to have the image change based on species, class, gender etc.

If you want to reach me, my discord username is redreaper_21
