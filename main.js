const {
  Plugin, Notice, Setting, PluginSettingTab,
  normalizePath, ItemView, Menu, Modal
} = require('obsidian');


const DEFAULT_DATA = {
  categories: {
    "Male First Names": { type: "list", items: ["Abel","Adam","Aiden","Alaric","Alastair","Albion","Aldrich","Alfred","Andreas","Arthur","Baldric","Barton","Baxter","Beorn","Bob","Bryan","Bucky","Cain","Carter","Casper","Caspian","Cassian","Cedric","Charles","Connor","Darian","Declan","Dominic","Eadric","Eamon","Edmond","Eren","Erik","Ethan","Ethelred","Fanthen","Finn","Finnian","Franklin","Garnt","Garrett","George","Gideon","Godric","Grimm","Hadrian","Harry","Harvey","Henri","Horatio","Igor","Ivo","Ivor","Jareth","Jasper","Jerome","John","Jorje","Julian","Kael","Khan","Leo","Leofric","Leon","Leoric","Levi","Liam","Loras","Luke","Luther","Magnus","Matthew","Merlin","Michael","Milo","Nate","Nathaniel","Nova","Orik","Owen","Percival","Quinn","Ragnar","Raphael","Roderick","Roman","Ronald","Rowan","Rupert","Rutherford","Salvor","Samuel","Sebastian","Sigurd","Silas","Steven","Thaddeus","Theodoric","Thorin","Thrain","Tim","Ulric","Valen","Varian","Vesper","Viktor","Weston","Wilson","Wulfric","Xalvador","Xavier","Yorick","Zachary","Zephyrus"] },
    "Female First Names": { type: "list", items: ["Aelith","Aethelflaed","Alianor","Anastasia","Anna","Ariadne","Astraea","Astrid","Aurora","Autumn","Ava","Belinda","Belladonna","Belphoebe","Bianca","Brynna","Cadence","Caelia","Calanthe","Callie","Calliope","Camellia","Candace","Cassandra","Catherine","Catriona","Cheryl","Chrys","Cinna","Dawn","Deborah","Drusilla","Eirwen","Eive","Elowen","Elsa","Esme","Eve","Fiora","Freya","Gem","Genevieve","Ginny","Guinevere","Gwendolyn","Gwyneth","Hermione","Iris","Isolde","Ivy","Jessamine","Jezabel","Jian","Karen","Katarina","Kathelynn","Kelly","Lilith","Lily","Liora","Luna","Lyra","Madrigal","Maeve","Mary","May","Monica","Morgana","Nikki","Nyssa","Ophelia","Persephone","Pixal","Quintessa","Rhiannon","Sabine","Samarah","Sandra","Sara","Seraphina","Serena","Sigrid","Sora","Tamisin","Thyra","Ursula","Valeria","Vesper","Willow","Wren","Xanthe","Ysolt","Yvaine","Zinnia","Zoe"] },
    "Non-Binary First Names": { type: "list", items: ["Aerin","Alex","Blair","Brook","Cassidy","Charlie","Dakota","Darcy","Echo","Emery","Finley","Foggy","Harper","Indigo","Jordan","Kai","Linden","Mal","Marlowe","Morgan","Onyx","Phoenix","Quinn","Raven","Reese","Riley","Robin","Rowan","Rune","Sable","Sage","Sam","Sasha","Shale","Skyler","Talon","Taryn","Taylor","Vesper","Wren","Xion","Zephyr"] },
    "Last Names": { type: "list", items: ["Abernath","Albetruss","Ashford","Bane","Berkley","Blackthorn","Blackwood","Boltsman","Briant","Brightmoon","Brightspark","Cahill","Castle","Castleford","Cole","Danton","Darkwater","Dawnbringer","Dragoncrest","Dragonhart","Duskendale","Eisley","Emberfall","Erikson","Fairchild","Fairman","Feynmans","Fickleback","Fisk","Forestfoot","Freeport","Frostbane","Frostspire","Frostwind","Gallow","Goldenhoard","Goldenshield","Granger","Graves","Grayson","Grimshaw","Hanondorf","Harmon","Havenhart","Hawthorn","Hawthorne","Hightower","Ironoak","Ironwood","Jackman","Kennedy","Kingsley","Kormack","Lightweaver","Lockwood","Lutharian","Marigold","Moonshadow","Mulaney","Murdock","Nightshade","North","Oakenshield","Page","Pike","Powell","Ravencrest","Ravenfield","Ravenscar","Reacher","Rockfell","Rockfeller","Schnauder","Shackley","Shadowend","Shamrock","Silverbrook","Silverleaf","Spivot","Starwhisper","Sterling","Stonefist","Stonehelm","Stormcrown","Stormrider","Torrent","Wayne","Whitethorn","Windrider","Winterbourne","Wolfe","Wolfsbane","Wyvernspur"] },
    "Species": { type: "weighted", items: [["Aasimar",1],["Changeling",1],["Dragonborn",5],["Dwarf",15],["Elf",1],["Firbolg",2],["Genasi",3],["Gnome",5],["Goliath",3],["Half-Elf",25],["Halfling",20],["Human",50],["Kenku",2],["Loxodon",1],["Orc",10],["Tabaxi",2],["Tiefling",15],["Triton",2],["Vampire",1],["Warforged",25]] },
    "Alignments": { type: "weighted", items: [["Chaotic Evil",3],["Chaotic Good",15],["Chaotic Neutral",15],["Jerk",10],["Lawful Evil",5],["Lawful Good",20],["Lawful Neutral",20],["Neutral Evil",4],["Neutral Good",35],["True Neutral",45]] },
    "Personality Traits": { type: "list", items: ["Aloof","Ambitious","Atheistic","Boastful","Brave","Cautious","Charismatic","Content","Cowardly","Curious","Disinterested","Dour","Friendly","Greedy","Humble","Loyal","Methodical","Naive","Optimistic","Pessimistic","Pious","Playful","Reckless","Sarcastic","Selfless","Serious","Shy","Stingy","Suspicious","Timid","Trusting","Untrustworthy","Witty","World-weary"] },
    "Motivations": { type: "list", items: ["Arcane Mastery","Artistic Creation","Criminal Enterprise","Debt Repayment","Escape Past","Family Honor","Find Redemption","Immortality","Knowledge","Love","Military Conquest","Natural Balance","Personal Fulfilment","Personal Legacy","PLOT RELEVANT","Political Ambition","Power","Protect a loved one","Redemption","Religious Zeal","Revenge","Scientific Discovery","Social Reform","Spiritual Enlightenment","Survival","Technological Advancement","Wealth"] },
    "Classes": { type: "weighted", items: [["Artificer",4],["Barbarian",8],["Bard",8],["Blood Hunter",3],["Cleric",10],["Commoner",75],["Death",0.0001],["Demonhunter",5],["Druid",7],["Echo Knight",2],["Fate Weaver",1],["Fighter",15],["Gunslinger",8],["Monk",7],["Paladin",7],["Ranger",7],["Rogue",12],["Samurai",5],["Sorcerer",6],["Spellblade",7],["Warlock",6],["Wizard",12]] },
    "Occupations": { type: "weighted", items: [["Alchemist",3],["Arcane Scholar",2],["Baker",5],["Bard",3],["Blacksmith",10],["Carpenter",4],["Cartographer",2],["Cook",8],["Cultist",1],["Demon's Servant",5],["Farmer",20],["Guard",12],["Hag's Apprentice",0.5],["Healer",8],["Herbalist",4],["Hitman",1],["Hunter",6],["Librarian",5],["Merchant",35],["Miner",5],["Noble",7],["Priest",7],["Sailor",8],["Scholar",7],["Scientist",25],["Thief",10],["Traveller",45]] },
    "Hair Colors": { type: "list", items: ["Amethyst","Auburn","Black","Blonde","Blue","Bronze","Brown","Chestnut","Copper","Coral Blue","Emerald","Fiery Red","Frosted Tips","Green","Honey Blonde","Jet Black","Midnight Blue","Pink","Platinum","Rainbow","Raven","Red","Salt-and-Pepper","Sapphire","Silver","Steel Gray","White"] },
    "Hair Styles": { type: "list", items: ["Afro","Asymmetrical","Bald","Bearded","Braided","Chignon","Curly","Double Braids","Dreadlocks","Elaborate Braids","Faux Hawk","Liberty Spikes","Long","Messy Bun","Mohawk","Mullet","Pageboy","Ponytail","Samurai Knot","Short","Side Shave","Straight","Top-Knot","Undercut","Victorian Updo"] },
    "Eye Colors": { type: "weighted", items: [["Amber",5],["Black",3],["Blue",25],["Brown",35],["Gold",2],["Green",15],["Grey",8],["Hazel",12],["Heterochromatic",1],["Red",1],["Silver",1],["Violet",0.5],["Yellow",1]] },
    "Features": { type: "weighted", items: [["Acid scars across the face",2],["Birthmark",15],["Burn marks",7],["Claw marks",4],["Crystal growths",1],["Cybernetic Eye",15],["Facial brand",3],["Feathers in hair",3],["Glowing tattoos",2],["Golden eyes",5],["Golden fingernails",2],["Heterochromia",4],["Mirrored Sunglasses",25],["Missing tooth",10],["None",40],["Petrified hand",1],["Piercings",8],["Prosthetic limb",3],["Ritual scars",6],["Scar across eye",15],["Silver hair streak",4],["Snake-like eyes",2],["Tattooed arms",12]] },
    "Inventory Items": { type: "weighted", items: [["Ancient Coin",12],["Dragon Scale",5],["Empty Wallet",45],["Expensive jewel",1],["Family Heirloom",8],["Forgotten Map",3],["Herb Pouch",25],["Journal",9],["Love Letter",15],["Magical Trinket",4],["Phone",1],["Pocket Knife",20],["Poison Vial",2],["Potion Kit",5],["Rusty Dagger",20],["Strange Key",7],["Sword",25],["Thieves Tools",10],["Tool Kit",6],["Wand of Healing",1]] },
    "Class Images": { type: "image_map", items: [["Artificer","artificer.png"],["Barbarian","barbarian.png"],["Bard","bard.png"],["Blood Hunter","bloodhunter.png"],["Cleric","cleric.png"],["Commoner","commoner.png"],["Death","death.png"],["Demonhunter","demonhunter.png"],["Druid","druid.png"],["Echo Knight","echoknight.png"],["Fate Weaver","fateweaver.png"],["Fighter","fighter.png"],["Gunslinger","gunslinger.png"],["Monk","monk.png"],["Paladin","paladin.png"],["Ranger","ranger.png"],["Rogue","rogue.png"],["Samurai","samurai.png"],["Sorcerer","sorcerer.png"],["Spellblade","spellblade.png"],["Warlock","warlock.png"],["Wizard","wizard.png"]] },
    "Genders": { type: "weighted", items: [["Female",50],["Male",50],["Non-Binary",1]] },
    "Party Relations": { type: "weighted", items: [["Cautious",15],["Curious",10],["Friendly",20],["Helpful",10],["Hostile",5],["Indifferent",60],["Suspicious",10]] },
    "Ages": { type: "weighted", items: (() => { let a = []; for(let i=15;i<=70;i++) a.push([i, i>=20&&i<=30?(i===25?7:7-Math.abs(i-25)):1]); return a; })() }
  },
  outputFolder: "DND/3-Mechanics/NPCs/NPC Generation",
  imageFolder: "DND/Assets/NPC Tokens",
  openLocation: "split-right",
  tableOpenLocation: "right",
  // Which columns to show in the index (keys from ALL_COLUMNS)
  visibleColumns: ["name","race","class","gender","age","alignment","occupation","plotRelevance"],
  // "table" | "cards"  — default layout mode for the index
  indexView: "table",
  defaultTemplate: `---
AssociatedGroup: 
Gender: {{gender}}
Race: {{species}}
Age: {{age}}
Class: {{class}}
Alignment: {{alignment}}
Occupation: {{occupation}}
Character-Role: 
Location: 
NoteIcon: npc
Vitality: Alive
Relevant: Y/N
tags:
  - npc
obsidianUIMode: preview
---

> [!infobox]
> # {{first_name}} {{last_name}}
> ![[{{classImage}}| {{class}} ]]
> ###### Basic Information
> Type |  Stat |
> ---|---|
> **Home** | \`VIEW[{Location}]\`  |
> **Group** | \`VIEW[{AssociatedGroup}]\` |
> **Occupation** | \`VIEW[{Occupation}]\` |
> **Sex** | \`VIEW[{Gender}]\` |
> **Race** | \`VIEW[{Race}]\` |
> **Age** | \`VIEW[{Age}]\` |
> **Condition** | Alive |
> > ###### Appearance
> Type |  Stat |
> ---|---|
> **Eye Colour** | {{eyeColour}} |
> **Hair Colour** | {{hairColour}} |
> **Hair Style** | {{hairStyle}} |
> ###### Rules Info
> Type |  Stat |
> ---|---|
> **Alignment** | \`VIEW[{Alignment}]\` |
> **Class** | \`VIEW[{Class}]\`  |
> **Character Role** | \`VIEW[{Character-Role}]\` |

\`BUTTON[DeleteThis]\`

# {{first_name}} {{last_name}}
## Profile

**Personality:** {{personality}}
**Motivation:** {{motivation}}
**Distinctive Features:** {{feature}}


## Backstory

(Insert a backstory here for textgenerator to elaborate upon)

**Occupation:** \`VIEW[{Occupation}]\` 
**Notable History:**  
- {{randomHistory}}  
**Secret:**  
- {{randomSecret}}

# Relationships
## Relationship with NPCs
- 
## Relationship with Party
- Initial Attitude: {{disposition}} 

**Roleplaying Notes:**  
- **Voice:** {{voice}}  
- **Speech Patterns:** {{speechPattern}}  
- **Common Phrases:**  
  - "{{dialogueGreeting}}"  
 - "{{dialogueLine}}"

# Inventory:
{{#each inventory}}
- {{this}}
{{/each}}

# Statblock and Encounters
> [!info] Statblock
> \`\`\`statblock
> name: {{first_name}} {{last_name}}
> monster: Commoner
> alignment: {{alignment}}
> traits: {{personality}}, {{feature}}
> \`\`\`

\`\`\`encounter-table
name: {{first_name}} {{last_name}}
creatures:
 - 1: Commoner
\`\`\``
};

// -------------------------------------------------------------------
// UTILITY FUNCTIONS
// -------------------------------------------------------------------
function weightedRandom(items) {
  if (!items || !items.length) return null;
  const total = items.reduce((s, e) => s + e[1], 0);
  let rand = Math.random() * total;
  for (const [value, weight] of items) {
    rand -= weight;
    if (rand < 0) return value;
  }
  return items[0][0];
}

function pickRandom(arr) {
  if (!arr || !arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

// -------------------------------------------------------------------
// DIALOGUE GENERATION
// -------------------------------------------------------------------
function generateDialogue(disposition, personality, occupation, species, location, firstName, lastName, motivation) {
  const dialogueBank = {
    greetings: {
      Cautious:    ["Who sent you?", "I don't recognize your colors...", "Speak your piece."],
      Curious:     ["What brings you to {location}?", "Haven't seen your kind before!", "You look like you've stories to tell."],
      Friendly:    ["Well met, traveler!", "Good to see friendly faces!", "Welcome to {location}!"],
      Helpful:     ["How can I assist?", "You look like you need aid!", "At your service!"],
      Hostile:     ["You're not welcome here.", "State your business quickly.", "I'm watching you..."],
      Indifferent: ["What do you want?", "Make it quick.", "Hmm?"],
      Suspicious:  ["That's a likely story.", "Your kind always wants something.", "Prove yourself."]
    },
    occupational: {
      "Alchemist":        ["This elixir turns {creature} blood to gold!", "Volatile mixtures today..."],
      "Arcane Scholar":   ["The {item} channels raw magic!", "My thesis on {creature}..."],
      "Baker":            ["Fresh {item} pies!", "Flour's scarce this season..."],
      "Bard":             ["Hear the ballad of {npc}?", "A coin for a tune?"],
      "Blacksmith":       ["My arm could use an apprentice.", "This steel came from the mountains of..."],
      "Carpenter":        ["Oak's best for {item}...", "Woodworm infestation in {location}..."],
      "Cartographer":     ["Updated maps of {location}!", "Here be {creature}..."],
      "Cook":             ["Try my famous {item} stew!", "You look half-starved..."],
      "Cultist":          ["The {creature} rises soon...", "Join us in dark communion..."],
      "Demon's Servant":  ["My master demands tribute.", "You'd best not get in our way."],
      "Farmer":           ["Crops ain't what they used to be.", "You seen my missing {creature}?"],
      "Guard":            ["Move along, citizen.", "Papers, please.", "Trouble brewing in {location}..."],
      "Hag's Apprentice": ["Eye of newt, tongue of {creature}...", "Grandmother wants a {item}..."],
      "Healer":           ["The sickness spreads...", "Herbs for what ails you!"],
      "Herbalist":        ["Mandrake root cures {creature} bites!", "Moonlight harvest only..."],
      "Hitman":           ["I don't discuss contracts.", "Nothing personal—just business."],
      "Hunter":           ["Saw {creature} tracks near {location}...", "Need pelts? I've fresh kills."],
      "Librarian":        ["Silence, please.", "The restricted section is off limits."],
      "Merchant":         ["Best prices this side of {location}!", "Special deal for you, friend..."],
      "Miner":            ["The deep tunnels whisper...", "Gem prices are falling again."],
      "Noble":            ["You dare address me so?", "My family built this {location}..."],
      "Priest":           ["{species} souls need saving too.", "The gods test us in strange ways."],
      "Sailor":           ["Storm's coming in from the {location}...", "Never trust a merfolk!"],
      "Scholar":          ["Did you know {randomFact}?", "The ancient texts speak of..."],
      "Scientist":        ["The hypothesis is... intriguing.", "Data doesn't lie—people do."],
      "Thief":            ["Nothing suspicious here, officer.", "I know ways in and out of {location}..."],
      "Traveller":        ["The roads to {location} are dangerous these days...", "I've seen things that would chill your blood..."]
    },
    personalityResponses: {
      Aloof:         ["Your affairs don't concern me.", "State your business..."],
      Ambitious:     ["I'll rule {location} someday!", "Power is the prize..."],
      Atheistic:     ["Gods? Fairy tales!", "We make our own fate!"],
      Boastful:      ["I once killed a {creature} with my bare hands!", "My {item} is legendary..."],
      Brave:         ["I'll face it with you!", "Danger is my middle name!"],
      Cautious:      ["Best not to risk it...", "Let me think first..."],
      Charismatic:   ["You're clearly someone important...", "Let's make history together!"],
      Content:       ["Simple life for me...", "Why want more?"],
      Cowardly:      ["Not my problem!", "I-I can't help you..."],
      Curious:       ["But why?", "How fascinating!"],
      Disinterested: ["...Sure.", "Whatever you say."],
      Dour:          ["Life is suffering.", "Get on with it."],
      Friendly:      ["Let's share a drink!", "Always happy to help!"],
      Greedy:        ["What's in it for me?", "My help doesn't come cheap..."],
      Humble:        ["I just got lucky...", "Others deserve credit..."],
      Loyal:         ["I swore an oath!", "My word is bond."],
      Methodical:    ["First we... then we...", "Systematic approach..."],
      Naive:         ["Everyone's basically good!", "It'll all work out..."],
      Optimistic:    ["Tomorrow will be better!", "There's always hope!"],
      Pessimistic:   ["We're all doomed anyway...", "What's the point?"],
      Pious:         ["{species} works in mysterious ways!", "Repent your sins!"],
      Playful:       ["Life's a game!", "Catch me if you can!"],
      Reckless:      ["What's the worst that could happen?", "Just jump in!"],
      Sarcastic:     ["Oh brilliant plan!", "Sure, that'll work..."],
      Selfless:      ["Take my last copper!", "How can I serve?"],
      Serious:       ["This is no joking matter.", "Focus!"],
      Shy:           ["*Mumbles*", "*Looks at feet*"],
      Stingy:        ["You'll pay for that.", "Nothing comes free."],
      Suspicious:    ["That seems unlikely.", "What's your real motive?"],
      Timid:         ["P-please don't hurt me...", "I'll stay out of your way..."],
      Trusting:      ["I believe you!", "Your word's enough..."],
      Untrustworthy: ["Would I lie?", "Let's say... I'm creative with truth."],
      "World-weary": ["Seen it all before...", "Youthful idealism..."],
      Witty:         ["As useful as a {item} in a brothel!", "Did you fall from heaven? Because..."]
    }
  };

  const cv = {
    location:   location || "this town",
    species,
    item:       pickRandom(["Sword of Kings", "Dragon Egg", "Mayor's Seal", "Cursed Chalice", "Enchanted Compass"]),
    creature:   pickRandom(["werewolves", "gelatinous cube", "mimics", "beholders", "basilisks"]),
    npc:        `${firstName} ${lastName}`,
    randomFact: pickRandom(["owlbears molt annually", "dragons hate peppermint", "the Underdark has 7 layers", "liches fear fresh flowers"])
  };

  const replace = str => str ? str.replace(/{(\w+)}/g, (m, p) => cv[p] ?? "") : "";
  const getPhrase = (obj, key) => obj[key] ? pickRandom(obj[key]) : null;

  const greeting     = getPhrase(dialogueBank.greetings, disposition) || "Hello.";
  const occLine      = Math.random() < 0.7 ? getPhrase(dialogueBank.occupational, occupation) : null;
  const persLine     = Math.random() < 0.5 ? getPhrase(dialogueBank.personalityResponses, personality) : null;
  const dialogueLine = occLine || persLine
    || `${personality} ${occupation}: '${(motivation || "mystery").toLowerCase()} is what matters!'`;

  return { greeting: replace(greeting), line: replace(dialogueLine) };
}

class EditCellModal extends Modal {
  constructor(app, label, currentValue, onSubmit) {
    super(app);
    this.label = label; this.currentValue = currentValue; this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h3', { text: `Edit ${this.label}` });
    const input = contentEl.createEl('input', { type: 'text', value: this.currentValue });
    input.style.cssText = 'width:100%;margin-bottom:1em;';
    const btns = contentEl.createDiv();
    btns.style.cssText = 'display:flex;justify-content:flex-end;gap:8px;';
    btns.createEl('button', { text: 'Cancel' }).onclick = () => this.close();
    btns.createEl('button', { text: 'Save', cls: 'mod-cta' }).onclick = () => { this.onSubmit(input.value); this.close(); };
    input.focus(); input.select();
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter')  { this.onSubmit(input.value); this.close(); }
      if (e.key === 'Escape') this.close();
    });
  }
  onClose() { this.contentEl.empty(); }
}

class ConfirmModal extends Modal {
  constructor(app, title, message, onConfirm) {
    super(app);
    this.title = title; this.message = message; this.onConfirm = onConfirm;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h3', { text: this.title });
    contentEl.createEl('p',  { text: this.message });
    const btns = contentEl.createDiv();
    btns.style.cssText = 'display:flex;justify-content:flex-end;gap:8px;margin-top:1em;';
    btns.createEl('button', { text: 'Cancel' }).onclick = () => this.close();
    btns.createEl('button', { text: 'Delete', cls: 'mod-warning' }).onclick = () => { this.onConfirm(); this.close(); };
  }
  onClose() { this.contentEl.empty(); }
}

// SHARED NPC INDEX RENDERER
// Renders the full NPC index UI into any container element.
// Used by both the sidebar ItemView and the inline codeblock processor.

const ALL_COLUMNS = [
  { key: "name",          label: "Name",       editable: false, minWidth: 90  },
  { key: "race",          label: "Race",       editable: true,  minWidth: 70  },
  { key: "class",         label: "Class",      editable: true,  minWidth: 70  },
  { key: "gender",        label: "Gender",     editable: true,  minWidth: 60  },
  { key: "age",           label: "Age",        editable: true,  minWidth: 40  },
  { key: "alignment",     label: "Alignment",  editable: true,  minWidth: 90  },
  { key: "occupation",    label: "Occupation", editable: true,  minWidth: 90  },
  { key: "plotRelevance", label: "Plot",       editable: true,  minWidth: 45  },
];

// Minimum width (px) before we drop to card list
const BREAKPOINT_CARDLIST = 200;

class NPCIndexRenderer {
  /**
   * @param {object} opts
   * @param {HTMLElement}  opts.container   - The DOM element to render into
   * @param {object}       opts.plugin      - Plugin instance (for settings, vault access)
   * @param {App}          opts.app         - Obsidian App instance
   * @param {boolean}      [opts.embedded]  - true when rendered inside a note codeblock
   */
  constructor({ container, plugin, app, embedded = false }) {
    this.container    = container;
    this.plugin       = plugin;
    this.app          = app;
    this.embedded     = embedded;

    this.data         = [];
    this.filteredData = [];
    this.sortColumn   = "name";
    this.sortDir      = "asc";
    this.filterQuery  = "";

    this._resizeObs   = null;
    this._resizeTimer = null;
    this._debounce    = null;
    this._vaultHandlers = [];

    // Track current view mode locally (starts from plugin setting)
    this._viewMode    = plugin.settings.indexView || "table";
  }

  // ── Lifecycle ──────────────────────────────────────────────────────

  async mount() {
    await this.loadNPCs();
    this.applyFilter();
    this.buildUI();
    this._watchVault();
  }

  destroy() {
    if (this._resizeObs)   { this._resizeObs.disconnect(); this._resizeObs = null; }
    if (this._resizeTimer) clearTimeout(this._resizeTimer);
    if (this._debounce)    clearTimeout(this._debounce);
  }

  // ── Data loading ───────────────────────────────────────────────────

  async loadNPCs() {
    const folder = this.plugin.settings.outputFolder;
    const files = this.app.vault.getMarkdownFiles().filter(f => f.path.startsWith(folder));
    this.data = await Promise.all(files.map(async file => {
      const content = await this.app.vault.read(file);
      const fm = this._parseFrontmatter(content);
      return {
        file,
        name:          file.basename,
        gender:        fm.Gender     || "—",
        race:          fm.Race       || "—",
        age:           fm.Age        || "—",
        class:         fm.Class      || "—",
        alignment:     fm.Alignment  || "—",
        occupation:    fm.Occupation || "—",
        plotRelevance: fm.Relevant   || "—"
      };
    }));
    this._sort(this.data);
  }

  _parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return {};
    const fm = {};
    for (const line of match[1].split("\n")) {
      const ci = line.indexOf(":");
      if (ci === -1) continue;
      const key = line.slice(0, ci).trim();
      let val = line.slice(ci + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      fm[key] = val;
    }
    return fm;
  }

  // Sorting / filtering 

  _sort(arr) {
    arr.sort((a, b) => {
      let av = (a[this.sortColumn] || "").toString().toLowerCase();
      let bv = (b[this.sortColumn] || "").toString().toLowerCase();
      if (this.sortColumn === "age") {
        const an = parseFloat(av), bn = parseFloat(bv);
        if (!isNaN(an) && !isNaN(bn)) return this.sortDir === "asc" ? an - bn : bn - an;
      }
      if (av < bv) return this.sortDir === "asc" ? -1 : 1;
      if (av > bv) return this.sortDir === "asc" ?  1 : -1;
      return 0;
    });
  }

  applyFilter() {
    const q = this.filterQuery.trim().toLowerCase();
    this.filteredData = q
      ? this.data.filter(npc => Object.values(npc).some(v => typeof v === "string" && v.toLowerCase().includes(q)))
      : [...this.data];
  }

  setSortColumn(col) {
    this.sortDir = this.sortColumn === col ? (this.sortDir === "asc" ? "desc" : "asc") : "asc";
    this.sortColumn = col;
    this._sort(this.filteredData);
    this._rebuildContent();
  }

  // Vault watching 

  _watchVault() {
    const handler = async (file) => {
      if (file?.extension !== "md") return;
      if (!file.path.startsWith(this.plugin.settings.outputFolder)) return;
      if (this._debounce) clearTimeout(this._debounce);
      this._debounce = setTimeout(() => this._refresh(), 300);
    };
    this._vaultHandlers = ["create","modify","delete"].map(ev => this.app.vault.on(ev, handler));
  }

  unwatch() {
    for (const ref of this._vaultHandlers) this.app.vault.offref(ref);
    this._vaultHandlers = [];
  }

  async _refresh() {
    await this.loadNPCs();
    this.applyFilter();
    this._updateCount();
    this._rebuildContent();
  }

  // Column visibility — intersect setting with available columns 

  _activeColumns() {
    const vis = this.plugin.settings.visibleColumns || ALL_COLUMNS.map(c => c.key);
    return ALL_COLUMNS.filter(c => vis.includes(c.key));
  }

  // UI construction 

  buildUI() {
    this.container.empty();
    this.container.addClass("npc-index-root");
    if (this.embedded) this.container.addClass("npc-index-embedded");

    // Toolbar 
    const toolbar = this.container.createDiv({ cls: "npc-toolbar" });

    const searchWrap = toolbar.createDiv({ cls: "npc-search-wrap" });
    searchWrap.createEl("span", { cls: "npc-search-icon", text: "⚔" });
    const searchInput = searchWrap.createEl("input", {
      type: "text", placeholder: "Search NPCs…", cls: "npc-search-input"
    });
    searchInput.value = this.filterQuery;
    searchInput.oninput = () => {
      this.filterQuery = searchInput.value;
      this.applyFilter();
      this._updateCount();
      this._rebuildContent();
    };

    this._countEl = toolbar.createEl("span", { cls: "npc-count" });

    // View toggle (table / cards)
    const viewToggle = toolbar.createEl("button", {
      cls: "npc-view-toggle",
      title: "Toggle layout"
    });
    viewToggle.setText(this._viewMode === "table" ? "⊞" : "☰");
    viewToggle.onclick = () => {
      this._viewMode = this._viewMode === "table" ? "cards" : "table";
      viewToggle.setText(this._viewMode === "table" ? "⊞" : "☰");
      this._rebuildContent();
    };

    // Generate button — shown in both sidebar and embedded
    const genBtn = toolbar.createEl("button", {
      text: "＋", cls: "npc-generate-btn", title: "Generate NPC"
    });
    genBtn.onclick = () => this.plugin.generateNPC();

    // Content area 
    this._contentEl = this.container.createDiv({ cls: "npc-content" });

    this._updateCount();
    this._rebuildContent();

    // ResizeObserver 
    let lastWidth = 0;
    if (this._resizeObs) this._resizeObs.disconnect();
    this._resizeObs = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect?.width ?? 0;
      if (Math.abs(w - lastWidth) < 8) return;
      lastWidth = w;
      if (this._resizeTimer) clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => this._onResize(w), 60);
    });
    this._resizeObs.observe(this.container);
  }

  // Content rendering (table or card view) 

  _rebuildContent() {
    if (!this._contentEl) return;
    const w = this.container.clientWidth || 9999;
    const forceCards = this._viewMode === "cards" || w <= BREAKPOINT_CARDLIST;

    if (forceCards) {
      this.container.classList.add("npc-index--cards");
      this.container.classList.remove("npc-index--table");
      this._buildCardView(this._contentEl);
    } else {
      this.container.classList.add("npc-index--table");
      this.container.classList.remove("npc-index--cards");
      this._buildTableView(this._contentEl);
    }
  }

  _buildTableView(wrap) {
    wrap.empty();
    wrap.addClass("npc-table-wrap");
    wrap.removeClass("npc-card-list-wrap");

    const cols = this._activeColumns();
    if (!cols.length) {
      wrap.createDiv({ cls: "npc-empty-cell", text: "No columns selected — check plugin settings." });
      return;
    }

    // Calculate column widths that sum to 100% so no horizontal scroll is needed.
    // Name gets 2 shares, Age and Plot get 0.6 shares each, everything else gets 1.
    const shares = { name: 2, age: 0.6, plotRelevance: 0.6 };
    const totalShares = cols.reduce((sum, c) => sum + (shares[c.key] || 1), 0);
    const pct = c => `${((shares[c.key] || 1) / totalShares * 100).toFixed(2)}%`;

    const table = wrap.createEl("table", { cls: "npc-table" });
    // colgroup for fixed proportional widths
    const colgroup = table.createEl("colgroup");
    for (const col of cols) {
      const cg = colgroup.createEl("col");
      cg.style.width = pct(col);
    }

    const thead = table.createEl("thead");
    const hrow  = thead.createEl("tr");
    for (const col of cols) {
      const th    = hrow.createEl("th", { cls: "npc-th" });
      const inner = th.createDiv({ cls: "npc-th-inner" });
      inner.createSpan({ text: col.label });
      const arrow = inner.createSpan({ cls: "npc-sort-arrow" });
      if (this.sortColumn === col.key) {
        th.addClass("npc-th-sorted");
        arrow.setText(this.sortDir === "asc" ? " ▲" : " ▼");
      } else {
        arrow.setText(" ⇅");
      }
      th.onclick = () => this.setSortColumn(col.key);
    }

    this._tbody = table.createEl("tbody");
    this._currentColumns = cols;
    this._renderRows(this._tbody, cols);
  }

  _buildCardView(wrap) {
    wrap.empty();
    wrap.addClass("npc-card-list-wrap");
    wrap.removeClass("npc-table-wrap");
    this._tbody = null;
    this._currentColumns = null;

    if (!this.filteredData.length) {
      wrap.createDiv({ cls: "npc-empty-cell", text: this.filterQuery ? "No matches." : "No NPCs yet — roll the dice!" });
      return;
    }
    const list = wrap.createDiv({ cls: "npc-card-list" });
    for (const npc of this.filteredData) {
      const card = list.createDiv({ cls: "npc-card" });

      const header = card.createDiv({ cls: "npc-card-header" });
      header.createDiv({ cls: "npc-card-name", text: npc.name });
      const badge = header.createEl("span", {
        cls: `npc-badge npc-badge--${(npc.plotRelevance||"").toLowerCase().replace(/[^a-z]/g, "")}`,
        text: npc.plotRelevance
      });
      badge.title = "Right-click to edit";
      badge.oncontextmenu = e => {
        e.preventDefault();
        e.stopPropagation();
        this._editCell(npc, "plotRelevance", npc.plotRelevance, "Plot Relevant");
      };

      const meta = card.createDiv({ cls: "npc-card-meta" });
      const vis = this._activeColumns().filter(c => c.key !== "name" && c.key !== "plotRelevance");
      meta.setText(vis.map(c => npc[c.key]).filter(v => v && v !== "—").join(" · "));

      card.addEventListener("click", () => this.app.workspace.getLeaf(false).openFile(npc.file));
      card.addEventListener("mousedown", e => {
        if (e.button === 1) { e.preventDefault(); this.app.workspace.getLeaf("tab").openFile(npc.file); }
      });
      card.oncontextmenu = e => {
        e.preventDefault();
        const menu = new Menu();
        menu.addItem(i => i.setTitle("Open").setIcon("file-text").onClick(() => this.app.workspace.getLeaf(false).openFile(npc.file)));
        menu.addItem(i => i.setTitle("Open in new tab").setIcon("plus-circle").onClick(() => this.app.workspace.getLeaf("tab").openFile(npc.file)));
        menu.addSeparator();
        menu.addItem(i => i.setTitle("Delete NPC").setIcon("trash").onClick(() => this._deleteNPC(npc)));
        menu.showAtMouseEvent(e);
      };
    }
  }

  _renderRows(tbody, columns) {
    tbody.empty();
    if (!this.filteredData.length) {
      const row = tbody.createEl("tr", { cls: "npc-empty-row" });
      const td  = row.createEl("td", { cls: "npc-empty-cell" });
      td.setAttribute("colspan", columns.length.toString());
      td.setText(this.filterQuery ? "No NPCs match that search." : "No NPCs yet — roll the dice!");
      return;
    }

    for (const npc of this.filteredData) {
      const row = tbody.createEl("tr", { cls: "npc-row" });
      for (const col of columns) {
        const td    = row.createEl("td", { cls: "npc-td" });
        const value = npc[col.key];
        if (col.key === "plotRelevance") {
          td.createEl("span", {
            cls: `npc-badge npc-badge--${(value||"").toLowerCase().replace(/[^a-z]/g, "")}`,
            text: value
          });
        } else {
          td.setText(value);
        }
        if (col.editable) {
          td.addClass("npc-td-editable");
          td.title = "Right-click to edit";
          td.oncontextmenu = e => { e.preventDefault(); e.stopPropagation(); this._editCell(npc, col.key, value, col.label); };
        }
      }

      const nameTd = row.querySelector("td");
      if (nameTd) {
        nameTd.oncontextmenu = e => {
          e.preventDefault(); e.stopPropagation();
          const menu = new Menu();
          menu.addItem(i => i.setTitle("Open").setIcon("file-text").onClick(() => this.app.workspace.getLeaf(false).openFile(npc.file)));
          menu.addItem(i => i.setTitle("Open in new tab").setIcon("plus-circle").onClick(() => this.app.workspace.getLeaf("tab").openFile(npc.file)));
          menu.addSeparator();
          menu.addItem(i => i.setTitle("Delete NPC").setIcon("trash").onClick(() => this._deleteNPC(npc)));
          menu.showAtMouseEvent(e);
        };
      }

      row.addEventListener("click", e => {
        if (e.target.closest("td")?.classList.contains("npc-td-editable")) return;
        this.app.workspace.getLeaf(false).openFile(npc.file);
      });
      row.addEventListener("mousedown", e => {
        if (e.button === 1) { e.preventDefault(); this.app.workspace.getLeaf("tab").openFile(npc.file); }
      });
    }
  }

  //Resize 

  _onResize(w) {
    // Only force card layout if we're in table mode and the width drops below threshold.
    // If user has explicitly selected cards, don't interfere.
    if (this._viewMode === "table") {
      this._rebuildContent();
    }
  }

  // Count display 

  _updateCount() {
    if (!this._countEl) return;
    const total = this.data.length;
    const shown = this.filteredData.length;
    this._countEl.setText(this.filterQuery ? `${shown}/${total}` : `${total}`);
  }

  // Cell editing / deletion 

  _editCell(npc, fieldKey, currentValue, columnLabel) {
    const propMap = {
      gender: 'Gender', race: 'Race', age: 'Age',
      class: 'Class', alignment: 'Alignment',
      occupation: 'Occupation', plotRelevance: 'Relevant'
    };
    const fmKey = propMap[fieldKey];
    if (!fmKey) return;
    new EditCellModal(this.app, columnLabel, currentValue, async newValue => {
      if (newValue === null || newValue === currentValue) return;
      try {
        await this.app.fileManager.processFrontMatter(npc.file, fm => { fm[fmKey] = newValue; });
        new Notice(`✎ ${columnLabel} → "${newValue}"`);
        await this._refresh();
      } catch (err) {
        console.error(err);
        new Notice("Failed to update frontmatter.");
      }
    }).open();
  }

  _deleteNPC(npc) {
    new ConfirmModal(
      this.app, "Delete NPC",
      `Permanently delete "${npc.name}"? This cannot be undone.`,
      async () => {
        try {
          await this.app.vault.delete(npc.file);
          new Notice(`🗑 Deleted ${npc.name}`);
        } catch (err) {
          new Notice("Failed to delete NPC file."); console.error(err);
        }
      }
    ).open();
  }
}


// SIDEBAR VIEW

const NPC_TABLE_VIEW_TYPE = "npc-table-view";

class NPCTableView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin   = plugin;
    this.renderer = null;
  }

  getViewType()    { return NPC_TABLE_VIEW_TYPE; }
  getDisplayText() { return "NPC Index"; }
  getIcon()        { return "scroll"; }

  async onOpen() {
    const content = this.containerEl.children[1];
    content.empty();
    content.addClass("npc-sidebar-content");

    this.renderer = new NPCIndexRenderer({
      container: content,
      plugin:    this.plugin,
      app:       this.app,
      embedded:  false
    });
    await this.renderer.mount();
  }

  async onClose() {
    if (this.renderer) {
      this.renderer.destroy();
      this.renderer.unwatch();
      this.renderer = null;
    }
  }
}

// INLINE CODEBLOCK PROCESSOR  (```NPCindex ... ```)
// Supports optional config lines inside the block:
//   filter: guards      → pre-fills the search box
//   sort: class         → initial sort column
//   columns: name,race,class  → override which columns to show (optional)

function parseBlockConfig(source) {
  const cfg = {};
  for (const line of source.split("\n")) {
    const m = line.match(/^\s*(\w+)\s*:\s*(.+)$/);
    if (m) cfg[m[1].trim().toLowerCase()] = m[2].trim();
  }
  return cfg;
}

class NPCIndexProcessor {
  constructor(plugin) {
    this.plugin = plugin;
  }

  async process(source, el, ctx) {
    const cfg = parseBlockConfig(source);

    // Wrapper that fills the code block space
    const wrapper = el.createDiv({ cls: "npc-codeblock-wrapper" });

    const renderer = new NPCIndexRenderer({
      container: wrapper,
      plugin:    this.plugin,
      app:       this.plugin.app,
      embedded:  true
    });

    // Apply config before mount
    if (cfg.filter) renderer.filterQuery = cfg.filter;
    if (cfg.sort && ALL_COLUMNS.find(c => c.key === cfg.sort)) {
      renderer.sortColumn = cfg.sort;
    }

    await renderer.mount();

    // Apply filter from config after mount (data is now loaded)
    if (cfg.filter) {
      renderer.applyFilter();
      renderer._updateCount();
      if (renderer._tbody && renderer._currentColumns) {
        renderer._renderRows(renderer._tbody, renderer._currentColumns);
      }
    }

    // Cleanup when the embed is removed from DOM (Obsidian Component lifecycle)
    const { Component } = require('obsidian');
    const cleanup = new Component();
    cleanup.onunload = () => { renderer.destroy(); renderer.unwatch(); };
    ctx.addChild(cleanup);
  }
}

// OPEN LOCATION HELPER

function getLeafForLocation(workspace, loc) {
  switch (loc) {
    case "right":        return workspace.getRightLeaf(false);
    case "left":         return workspace.getLeftLeaf(false);
    case "split-right":  return workspace.getLeaf("split", "vertical");
    case "split-left": {
      const leaf = workspace.getLeaf("split", "vertical");
      const root = workspace.rootSplit;
      if (root?.children?.length > 0) { leaf.setViewState({ type: "empty", state: {} }); root.insertChild(0, leaf); }
      return leaf;
    }
    case "split-above": return workspace.getLeaf("split", "horizontal");
    case "split-below": return workspace.getLeaf("split", "horizontal");
    default:            return workspace.getLeaf(false);
  }
}

// PLUGIN

class DNDNPCGenerator extends Plugin {
  async onload() {
    await this.loadSettings();

    // Sidebar view
    this.registerView(NPC_TABLE_VIEW_TYPE, leaf => new NPCTableView(leaf, this));

    // Inline codeblock — language tag is "NPCindex" (case-insensitive)
    const processor = new NPCIndexProcessor(this);
    this.registerMarkdownCodeBlockProcessor("NPCindex", (source, el, ctx) => processor.process(source, el, ctx));

    // Ribbon
    this.addRibbonIcon("scroll",   "Generate NPC",  () => this.generateNPC());
    this.addRibbonIcon("table-2",  "NPC Index",     () => this.activateTableView());

    // Commands
    this.addCommand({ id: "generate-npc",    name: "Generate NPC",      callback: () => this.generateNPC() });
    this.addCommand({ id: "show-npc-table",  name: "Open NPC Index",    callback: () => this.activateTableView() });

    this.addSettingTab(new NPCGeneratorSettingTab(this.app, this));
    await this.ensureImagesCopied();
  }

  async activateTableView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(NPC_TABLE_VIEW_TYPE)[0];
    if (!leaf) {
      const loc = this.settings.tableOpenLocation;
      if (loc === "right") {
        leaf = workspace.getRightLeaf(false);
      } else if (loc === "left") {
        leaf = workspace.getLeftLeaf(false);
      } else {
        leaf = getLeafForLocation(workspace, loc) || workspace.getLeaf(false);
      }
      await leaf.setViewState({ type: NPC_TABLE_VIEW_TYPE, active: true });
    }
    workspace.revealLeaf(leaf);
  }

  async loadSettings() {
    const stored = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_DATA, stored);
    if (!this.settings.categories) {
      this.settings.categories = DEFAULT_DATA.categories;
    } else {
      for (const cat in DEFAULT_DATA.categories) {
        if (!this.settings.categories[cat]) this.settings.categories[cat] = DEFAULT_DATA.categories[cat];
      }
    }
    if (!this.settings.tableOpenLocation) this.settings.tableOpenLocation = "right";
    if (!this.settings.visibleColumns || !this.settings.visibleColumns.length) {
      this.settings.visibleColumns = DEFAULT_DATA.visibleColumns;
    }
    if (!this.settings.indexView) this.settings.indexView = "table";
  }

  async saveSettings() { await this.saveData(this.settings); }

  async ensureImagesCopied() {
    const pluginDir = `${this.app.vault.configDir}/plugins/dnd-npc-generator`;
    const targetDir = this.settings.imageFolder;
    if (!(await this.app.vault.adapter.exists(targetDir))) await this.app.vault.createFolder(targetDir);
    const needed = new Set((this.settings.categories["Class Images"]?.items || []).map(e => e[1]));
    for (const img of needed) {
      const tp = normalizePath(`${targetDir}/${img}`);
      if (!(await this.app.vault.adapter.exists(tp))) {
        try {
          const data = await this.app.vault.adapter.readBinary(`${pluginDir}/images/${img}`);
          await this.app.vault.createBinary(tp, data);
        } catch { console.warn(`[NPC Generator] Could not copy: ${img}`); }
      }
    }
  }

  async generateNPC() {
    const cats = this.settings.categories;
    const gender     = weightedRandom(cats["Genders"].items);
    const nameList   = cats[`${gender} First Names`] || cats["Male First Names"];
    const firstName  = pickRandom(nameList.items);
    const lastName   = pickRandom(cats["Last Names"].items);
    const species    = weightedRandom(cats["Species"].items);
    const alignment  = weightedRandom(cats["Alignments"].items);
    const age        = weightedRandom(cats["Ages"].items);
    const feature    = weightedRandom(cats["Features"].items);
    const personality= pickRandom(cats["Personality Traits"].items);
    const motivation = pickRandom(cats["Motivations"].items);
    const hairColour = pickRandom(cats["Hair Colors"].items);
    const hairStyle  = pickRandom(cats["Hair Styles"].items);
    const eyeColour  = weightedRandom(cats["Eye Colors"].items);
    const occupation = weightedRandom(cats["Occupations"].items);
    const npcClass   = weightedRandom(cats["Classes"].items);
    const disposition= weightedRandom(cats["Party Relations"].items);
    const imgMap     = new Map(cats["Class Images"].items);
    const classImage = imgMap.get(npcClass) || "default.png";

    // Safe inventory selection
    const seen = new Set(); const inventory = [];
    let attempts = 0;
    while (inventory.length < Math.min(3, cats["Inventory Items"].items.length) && attempts++ < 100) {
      const item = weightedRandom(cats["Inventory Items"].items);
      if (!seen.has(item)) { seen.add(item); inventory.push(item); }
    }

    const voices   = [["Gravelly",15],["Melodic",10],["Hoarse",8],["Smooth",20],["Raspy",5],["Booming",3]];
    const patterns = [["Formal",25],["Slang-heavy",15],["Terse",10],["Rambling",5],["Archaic",8],["Whispered",4]];
    const histories= ["Former soldier","Survivor of a great war","Exiled noble","Self-taught mage","Escaped thrall","Wandering pilgrim"];
    const secrets  = ["None","Wanted criminal","Secret heir to a throne","Cursed bloodline","Spy for a rival faction","Hunted by a demon"];

    const dialogue = generateDialogue(disposition, personality, occupation, species, "", firstName, lastName, motivation);

    const values = {
      gender, first_name: firstName, last_name: lastName, species, alignment, age,
      feature, personality, motivation, hairColour, hairStyle, eyeColour,
      occupation, class: npcClass, disposition, classImage, inventory,
      randomHistory: pickRandom(histories),
      randomSecret:  pickRandom(secrets),
      voice:         weightedRandom(voices),
      speechPattern: weightedRandom(patterns),
      dialogueGreeting: dialogue.greeting,
      dialogueLine:     dialogue.line
    };

    const rendered = this._renderTemplate(this.settings.defaultTemplate, values);
    const folder   = this.settings.outputFolder;
    let filePath   = normalizePath(`${folder}/${firstName} ${lastName}.md`);

    try {
      if (!(await this.app.vault.adapter.exists(folder))) await this.app.vault.createFolder(folder);
      if (await this.app.vault.adapter.exists(filePath)) filePath = normalizePath(`${folder}/${firstName} ${lastName} ${Date.now()}.md`);
      const file = await this.app.vault.create(filePath, rendered);
      await this._openFile(file);
      new Notice(`⚔ Generated: ${firstName} ${lastName}`);
    } catch (err) {
      console.error(err);
      new Notice("Error creating NPC file. Check the developer console.");
    }
  }

  async _openFile(file) {
    const leaf = getLeafForLocation(this.app.workspace, this.settings.openLocation) || this.app.workspace.getLeaf(false);
    await leaf.openFile(file);
  }

  _renderTemplate(template, values) {
    let result = template.replace(/{{#each (\w+)}}([\s\S]*?){{\/each}}/g, (_, varName, inner) => {
      const arr = values[varName];
      if (!Array.isArray(arr)) return "";
      return arr.map(item => inner.replace(/{{this}}/g, item)).join("");
    });
    for (const [key, val] of Object.entries(values)) {
      if (Array.isArray(val)) continue;
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), val ?? "");
    }
    return result;
  }
}

// SETTINGS TAB

class NPCGeneratorSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("npc-settings");

    containerEl.createEl("h2", { text: "⚔ NPC Generator Settings" });

    // File locations 
    containerEl.createEl("h3", { text: "File Locations", cls: "npc-settings-section-header" });

    new Setting(containerEl)
      .setName("Output folder")
      .setDesc("Where generated NPC markdown files will be saved.")
      .addText(t => t.setPlaceholder("e.g. DND/NPCs")
        .setValue(this.plugin.settings.outputFolder)
        .onChange(async v => { this.plugin.settings.outputFolder = v; await this.plugin.saveSettings(); }));

    new Setting(containerEl)
      .setName("Images folder")
      .setDesc("Folder where class token images are stored.")
      .addText(t => t.setPlaceholder("e.g. DND/Assets/NPC Tokens")
        .setValue(this.plugin.settings.imageFolder)
        .onChange(async v => {
          this.plugin.settings.imageFolder = v;
          await this.plugin.saveSettings();
          await this.plugin.ensureImagesCopied();
        }));

    // Layout 
    containerEl.createEl("h3", { text: "Layout", cls: "npc-settings-section-header" });

    const locOpts = {
      "right":       "Right sidebar panel",
      "left":        "Left sidebar panel",
      "main":        "Main tab",
      "split-right": "Split right",
      "split-left":  "Split left",
      "split-above": "Split above",
      "split-below": "Split below"
    };

    new Setting(containerEl).setName("Open generated NPC in")
      .addDropdown(d => {
        Object.entries(locOpts).forEach(([v, l]) => d.addOption(v, l));
        return d.setValue(this.plugin.settings.openLocation)
          .onChange(async v => { this.plugin.settings.openLocation = v; await this.plugin.saveSettings(); });
      });

    new Setting(containerEl).setName("Open NPC Index panel in")
      .setDesc("Recommendation: Right sidebar panel — sits alongside Properties, Dice Roller, etc.")
      .addDropdown(d => {
        Object.entries(locOpts).forEach(([v, l]) => d.addOption(v, l));
        return d.setValue(this.plugin.settings.tableOpenLocation)
          .onChange(async v => { this.plugin.settings.tableOpenLocation = v; await this.plugin.saveSettings(); });
      });

    // Index view 
    containerEl.createEl("h3", { text: "Index View", cls: "npc-settings-section-header" });

    new Setting(containerEl)
      .setName("Default layout")
      .setDesc("Table shows all selected columns in a grid. Cards shows one NPC per row with a summary.")
      .addDropdown(d => d
        .addOption("table", "Table")
        .addOption("cards", "Cards")
        .setValue(this.plugin.settings.indexView || "table")
        .onChange(async v => { this.plugin.settings.indexView = v; await this.plugin.saveSettings(); }));

    new Setting(containerEl)
      .setName("Visible columns")
      .setDesc("Choose which columns appear in the table view. Name is always shown.");

    const colGrid = containerEl.createDiv({ cls: "npc-col-grid" });
    const vis = this.plugin.settings.visibleColumns || ALL_COLUMNS.map(c => c.key);

    for (const col of ALL_COLUMNS) {
      const row = colGrid.createDiv({ cls: "npc-col-row" });
      const cb  = row.createEl("input", { type: "checkbox" });
      cb.checked   = vis.includes(col.key);
      cb.disabled  = col.key === "name"; // Name is always visible
      const lbl = row.createEl("label", { text: col.label });
      lbl.prepend(cb);
      cb.onchange = async () => {
        const current = new Set(this.plugin.settings.visibleColumns || ALL_COLUMNS.map(c => c.key));
        if (cb.checked) current.add(col.key); else current.delete(col.key);
        current.add("name"); // always keep name
        this.plugin.settings.visibleColumns = ALL_COLUMNS.map(c => c.key).filter(k => current.has(k));
        await this.plugin.saveSettings();
      };
    }

    // Inline codeblock usage tip 
    containerEl.createEl("h3", { text: "Inline NPC Index", cls: "npc-settings-section-header" });
    const tipBox = containerEl.createDiv({ cls: "npc-tip-box" });
    tipBox.createEl("p", { text: "Embed a live NPC index inside any note with:" });
    const pre = tipBox.createEl("pre", { cls: "npc-tip-code" });
    pre.createEl("code", { text: "```NPCindex\n```" });
    tipBox.createEl("p", { text: "Optional config lines inside the block:", cls: "npc-tip-sub" });
    const pre2 = tipBox.createEl("pre", { cls: "npc-tip-code" });
    pre2.createEl("code", { text: "```NPCindex\nfilter: guards\nsort: class\n```" });

    // Template 
    containerEl.createEl("h3", { text: "Template", cls: "npc-settings-section-header" });
    const tokenList = ["{{first_name}}","{{last_name}}","{{gender}}","{{species}}","{{age}}","{{class}}","{{classImage}}","{{alignment}}","{{occupation}}","{{personality}}","{{motivation}}","{{feature}}","{{eyeColour}}","{{hairColour}}","{{hairStyle}}","{{disposition}}","{{voice}}","{{speechPattern}}","{{dialogueGreeting}}","{{dialogueLine}}","{{randomHistory}}","{{randomSecret}}","{{#each inventory}}…{{/each}}"].join("  ");
    const tokenDesc = containerEl.createEl("p", { cls: "npc-token-list" });
    tokenDesc.innerHTML = `<strong>Available tokens:</strong><br><code>${tokenList}</code>`;

    new Setting(containerEl).setName("Custom template")
      .addTextArea(t => {
        t.setValue(this.plugin.settings.defaultTemplate)
          .onChange(async v => { this.plugin.settings.defaultTemplate = v; await this.plugin.saveSettings(); });
        t.inputEl.rows = 14;
        t.inputEl.addClass("npc-template-textarea");
      });

    // Categories 
    containerEl.createEl("h3", { text: "Categories & Lists", cls: "npc-settings-section-header" });

    const addCatDiv = containerEl.createDiv({ cls: "npc-add-category" });
    const nameInput = addCatDiv.createEl("input", { type: "text", placeholder: "New category name", cls: "npc-cat-name-input" });
    const weightedCb = addCatDiv.createEl("input", { type: "checkbox" });
    const wLabel = addCatDiv.createEl("label", { text: "Weighted" });
    wLabel.prepend(weightedCb);
    const addBtn = addCatDiv.createEl("button", { text: "＋ Add Category", cls: "mod-cta npc-add-btn" });
    addBtn.onclick = async () => {
      const name = nameInput.value.trim();
      if (!name) { new Notice("Category name cannot be empty."); return; }
      if (this.plugin.settings.categories[name]) { new Notice("Category already exists."); return; }
      this.plugin.settings.categories[name] = { type: weightedCb.checked ? "weighted" : "list", items: [] };
      await this.plugin.saveSettings();
      nameInput.value = ""; weightedCb.checked = false;
      this.display();
    };

    containerEl.createEl("hr");

    for (const [catName, catData] of Object.entries(this.plugin.settings.categories)) {
      if (catData.type === "image_map") continue;

      const details = containerEl.createEl("details", { cls: "npc-category-details" });
      const summary = details.createEl("summary", { cls: "npc-category-summary" });
      summary.createSpan({ text: catName });
      const meta = summary.createSpan({ cls: "npc-category-meta", text: `${catData.items.length} items · ${catData.type}` });

      const catDiv = details.createDiv({ cls: "npc-category-editor" });

      new Setting(catDiv).setName("Type")
        .addDropdown(d => d.addOption("list","List (equal weight)").addOption("weighted","Weighted")
          .setValue(catData.type)
          .onChange(async newType => {
            if (newType === catData.type) return;
            catData.items = catData.items.map(item =>
              newType === "weighted" ? (typeof item === "string" ? [item,1] : item) : (Array.isArray(item) ? item[0] : item)
            );
            catData.type = newType;
            await this.plugin.saveSettings();
            this.display();
          }));

      const itemsContainer = catDiv.createDiv({ cls: "npc-items-list" });

      const renderItems = () => {
        itemsContainer.empty();
        for (let idx = 0; idx < catData.items.length; idx++) {
          const row = itemsContainer.createDiv({ cls: "npc-item-row" });
          if (catData.type === "weighted") {
            const [iName, iWeight] = catData.items[idx];
            const ne = row.createEl("input", { type:"text", value:iName, cls:"npc-item-name" });
            const we = row.createEl("input", { type:"number", value:iWeight.toString(), cls:"npc-item-weight" });
            we.setAttribute("step","any"); we.min = "0";
            ne.onchange = async () => { catData.items[idx][0] = ne.value.trim()||iName; await this.plugin.saveSettings(); meta.textContent=`${catData.items.length} items · ${catData.type}`; };
            we.onchange = async () => { const w=parseFloat(we.value); catData.items[idx][1]=isNaN(w)?iWeight:w; await this.plugin.saveSettings(); };
          } else {
            const ne = row.createEl("input", { type:"text", value:catData.items[idx], cls:"npc-item-name npc-item-name--full" });
            ne.onchange = async () => { catData.items[idx]=ne.value.trim()||catData.items[idx]; await this.plugin.saveSettings(); meta.textContent=`${catData.items.length} items · ${catData.type}`; };
          }
          const rb = row.createEl("button", { text:"✕", cls:"npc-item-remove" });
          rb.onclick = async () => { catData.items.splice(idx,1); await this.plugin.saveSettings(); meta.textContent=`${catData.items.length} items · ${catData.type}`; renderItems(); };
        }
      };
      renderItems();

      const addRow = catDiv.createDiv({ cls: "npc-add-item-row" });
      if (catData.type === "weighted") {
        const ni = addRow.createEl("input", { type:"text", placeholder:"Item name", cls:"npc-item-name" });
        const wi = addRow.createEl("input", { type:"number", placeholder:"Weight", value:"1", cls:"npc-item-weight" });
        wi.min="0";
        const ab = addRow.createEl("button", { text:"＋ Add", cls:"npc-add-item-btn" });
        ab.onclick = async () => {
          const item=ni.value.trim(); if(!item) return;
          catData.items.push([item, parseFloat(wi.value)||1]);
          await this.plugin.saveSettings(); ni.value=""; wi.value="1";
          meta.textContent=`${catData.items.length} items · ${catData.type}`; renderItems();
        };
        ni.addEventListener("keydown", e => { if(e.key==="Enter") ab.click(); });
      } else {
        const ni = addRow.createEl("input", { type:"text", placeholder:"New item", cls:"npc-item-name npc-item-name--full" });
        const ab = addRow.createEl("button", { text:"＋ Add", cls:"npc-add-item-btn" });
        ab.onclick = async () => {
          const item=ni.value.trim(); if(!item) return;
          catData.items.push(item);
          await this.plugin.saveSettings(); ni.value="";
          meta.textContent=`${catData.items.length} items · ${catData.type}`; renderItems();
        };
        ni.addEventListener("keydown", e => { if(e.key==="Enter") ab.click(); });
      }

      const delBtn = catDiv.createEl("button", { text:"🗑 Delete category", cls:"npc-delete-category mod-warning" });
      delBtn.onclick = async () => {
        new ConfirmModal(this.app, "Delete Category",
          `Delete the "${catName}" category? This cannot be undone.`,
          async () => { delete this.plugin.settings.categories[catName]; await this.plugin.saveSettings(); this.display(); }
        ).open();
      };
    }
  }
}

module.exports = DNDNPCGenerator;