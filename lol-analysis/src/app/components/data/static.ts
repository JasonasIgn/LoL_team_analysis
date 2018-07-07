import { ChampionModel } from "../../models/champion.model";

export class StaticData
{
    AllChampions: ChampionModel[] = new Array<ChampionModel>(555);
    constructor()
    {
        for (var i = 0; i < 141; i++)
        {
            this.AllChampions[i] = new ChampionModel();

        }
        
        this.AllChampions[0].title = "the Dark Child";
        this.AllChampions[0].id = 1;
        this.AllChampions[0].key = "Annie";
        this.AllChampions[0].name = "Annie";

        this.AllChampions[1].title = "the Berserker";
        this.AllChampions[1].id = 2;
        this.AllChampions[1].key = "Olaf";
        this.AllChampions[1].name = "Olaf";

        this.AllChampions[2].title = "the Colossus";
        this.AllChampions[2].id = 3;
        this.AllChampions[2].key = "Galio";
        this.AllChampions[2].name = "Galio";

        this.AllChampions[3].title = "the Card Master";
        this.AllChampions[3].id = 4;
        this.AllChampions[3].key = "TwistedFate";
        this.AllChampions[3].name = "Twisted Fate";

        this.AllChampions[4].title = "the Seneschal of Demacia";
        this.AllChampions[4].id = 5;
        this.AllChampions[4].key = "XinZhao";
        this.AllChampions[4].name = "Xin Zhao";

        this.AllChampions[5].title = "the Dreadnought";
        this.AllChampions[5].id = 6;
        this.AllChampions[5].key = "Urgot";
        this.AllChampions[5].name = "Urgot";

        this.AllChampions[6].title = "the Deceiver";
        this.AllChampions[6].id = 7;
        this.AllChampions[6].key = "Leblanc";
        this.AllChampions[6].name = "LeBlanc";

        this.AllChampions[7].title = "the Crimson Reaper";
        this.AllChampions[7].id = 8;
        this.AllChampions[7].key = "Vladimir";
        this.AllChampions[7].name = "Vladimir";

        this.AllChampions[8].title = "the Harbinger of Doom";
        this.AllChampions[8].id = 9;
        this.AllChampions[8].key = "Fiddlesticks";
        this.AllChampions[8].name = "Fiddlesticks";

        this.AllChampions[9].title = "The Judicator";
        this.AllChampions[9].id = 10;
        this.AllChampions[9].key = "Kayle";
        this.AllChampions[9].name = "Kayle";

        this.AllChampions[10].title = "the Wuju Bladesman";
        this.AllChampions[10].id = 11;
        this.AllChampions[10].key = "MasterYi";
        this.AllChampions[10].name = "Master Yi";

        this.AllChampions[11].title = "the Minotaur";
        this.AllChampions[11].id = 12;
        this.AllChampions[11].key = "Alistar";
        this.AllChampions[11].name = "Alistar";

        this.AllChampions[12].title = "the Rune Mage";
        this.AllChampions[12].id = 13;
        this.AllChampions[12].key = "Ryze";
        this.AllChampions[12].name = "Ryze";
       
        this.AllChampions[13].title = "The Undead Juggernaut";
        this.AllChampions[13].id = 14;
        this.AllChampions[13].key = "Sion";
        this.AllChampions[13].name = "Sion";

        this.AllChampions[14].title = "the Battle Mistress";
        this.AllChampions[14].id = 15;
        this.AllChampions[14].key = "Sivir";
        this.AllChampions[14].name = "Sivir";
        
       
        this.AllChampions[15].title = "the Starchild";
        this.AllChampions[15].id = 16;
        this.AllChampions[15].key = "Soraka";
        this.AllChampions[15].name = "Soraka";
        
       
        this.AllChampions[16].title = "the Swift Scout";
        this.AllChampions[16].id = 17;
        this.AllChampions[16].key = "Teemo";
        this.AllChampions[16].name = "Teemo";
        
       
        this.AllChampions[17].title = "the Yordle Gunner";
        this.AllChampions[17].id = 18;
        this.AllChampions[17].key = "Tristana";
        this.AllChampions[17].name = "Tristana";
        
       
        this.AllChampions[18].title = "the Uncaged Wrath of Zaun";
        this.AllChampions[18].id = 19;
        this.AllChampions[18].key = "Warwick";
        this.AllChampions[18].name = "Warwick";
        
       
        this.AllChampions[19].title = "the Yeti Rider";
        this.AllChampions[19].id = 20;
        this.AllChampions[19].key = "Nunu";
        this.AllChampions[19].name = "Nunu";
        
       
        this.AllChampions[20].title = "the Bounty Hunter";
        this.AllChampions[20].id = 21;
        this.AllChampions[20].key = "MissFortune";
        this.AllChampions[20].name = "Miss Fortune";
        
       
        this.AllChampions[21].title = "the Frost Archer";
        this.AllChampions[21].id = 22;
        this.AllChampions[21].key = "Ashe";
        this.AllChampions[21].name = "Ashe";
        
       
        this.AllChampions[22].title = "the Barbarian King";
        this.AllChampions[22].id = 23;
        this.AllChampions[22].key = "Tryndamere";
        this.AllChampions[22].name = "Tryndamere";
        
       
        this.AllChampions[23].title = "Grandmaster at Arms";
        this.AllChampions[23].id = 24;
        this.AllChampions[23].key = "Jax";
        this.AllChampions[23].name = "Jax";
        
       
        this.AllChampions[24].title = "Fallen Angel"; 
        this.AllChampions[24].id = 25;
        this.AllChampions[24].key = "Morgana";
        this.AllChampions[24].name = "Morgana";
        
       
        this.AllChampions[25].title = "the Chronokeeper";
        this.AllChampions[25].id = 26;
        this.AllChampions[25].key = "Zilean";
        this.AllChampions[25].name = "Zilean";
        
       
        this.AllChampions[26].title = "the Mad Chemist";
        this.AllChampions[26].id = 27;
        this.AllChampions[26].key = "Singed";
        this.AllChampions[26].name = "Singed";
        
       
        this.AllChampions[27].title = "Agony's Embrace";
        this.AllChampions[27].id = 28;
        this.AllChampions[27].key = "Evelynn";
        this.AllChampions[27].name = "Evelynn";
        
       
        this.AllChampions[28].title = "the Plague Rat";
        this.AllChampions[28].id = 29;
        this.AllChampions[28].key = "Twitch";
        this.AllChampions[28].name = "Twitch";
        
       
        this.AllChampions[29].title = "the Deathsinger";
        this.AllChampions[29].id = 30;
        this.AllChampions[29].key = "Karthus";
        this.AllChampions[29].name = "Karthus";
        
       
        this.AllChampions[30].title = "the Terror of the Void";
        this.AllChampions[30].id = 31;
        this.AllChampions[30].key = "Chogath";
        this.AllChampions[30].name = "Cho'Gath";
        
       
        this.AllChampions[31].title = "the Sad Mummy";
        this.AllChampions[31].id = 32;
        this.AllChampions[31].key = "Amumu";
        this.AllChampions[31].name = "Amumu";
        
       
        this.AllChampions[32].title = "the Armordillo";
        this.AllChampions[32].id = 33;
        this.AllChampions[32].key = "Rammus";
        this.AllChampions[32].name = "Rammus";
        
       
        this.AllChampions[33].title = "the Cryophoenix";
        this.AllChampions[33].id = 34;
        this.AllChampions[33].key = "Anivia";
        this.AllChampions[33].name = "Anivia";
        
       
        this.AllChampions[34].title = "the Demon Jester";
        this.AllChampions[34].id = 35;
        this.AllChampions[34].key = "Shaco";
        this.AllChampions[34].name = "Shaco";
        
       
        this.AllChampions[35].title = "the Madman of Zaun";
        this.AllChampions[35].id = 36;
        this.AllChampions[35].key = "Cassiopeia";
        this.AllChampions[35].name = "Dr. Mundo";
        
       
        this.AllChampions[36].title = "Maven of the Strings";
        this.AllChampions[36].id = 37;
        this.AllChampions[36].key = "Sona";
        this.AllChampions[36].name = "Sona";
        
       
        this.AllChampions[37].title = "the Void Walker";
        this.AllChampions[37].id = 38;
        this.AllChampions[37].key = "Kassadin";
        this.AllChampions[37].name = "Kassadin";
        
       
        this.AllChampions[38].title = "the Blade Dancer";
        this.AllChampions[38].id = 39;
        this.AllChampions[38].key = "Irelia";
        this.AllChampions[38].name = "Irelia";
        
       
        this.AllChampions[39].title = "the Storm's Fury";
        this.AllChampions[39].id = 40;
        this.AllChampions[39].key = "Janna";
        this.AllChampions[39].name = "Janna";
        
       
        this.AllChampions[40].title = "the Saltwater Scourge";
        this.AllChampions[40].id = 41;
        this.AllChampions[40].key = "Gangplank";
        this.AllChampions[40].name = "Gangplank";
        
       
        this.AllChampions[41].title = "the Daring Bombardier";
        this.AllChampions[41].id = 42;
        this.AllChampions[41].key = "Corki";
        this.AllChampions[41].name = "Corki";
        
       
        this.AllChampions[42].title = "the Enlightened One";
        this.AllChampions[42].id = 43;
        this.AllChampions[42].key = "Karma";
        this.AllChampions[42].name = "Karma";
        
       
        this.AllChampions[43].title = "the Shield of Valoran";
        this.AllChampions[43].id = 44;
        this.AllChampions[43].key = "Taric";
        this.AllChampions[43].name = "Taric";
        
       
        this.AllChampions[44].title = "the Tiny Master of Evil";
        this.AllChampions[44].id = 45;
        this.AllChampions[44].key = "Veigar";
        this.AllChampions[44].name = "Veigar";
        
       
        this.AllChampions[45].title = "the Troll King";
        this.AllChampions[45].id = 48;
        this.AllChampions[45].key = "Trundle";
        this.AllChampions[45].name = "Trundle";
        
       
        this.AllChampions[46].title = "the Noxian Grand General";
        this.AllChampions[46].id = 50;
        this.AllChampions[46].key = "Swain";
        this.AllChampions[46].name = "Swain";
        
       
        this.AllChampions[47].title = "the Sheriff of Piltover";
        this.AllChampions[47].id = 51;
        this.AllChampions[47].key = "Caitlyn";
        this.AllChampions[47].name = "Caitlyn";
        
       
        this.AllChampions[48].title = "the Great Steam Golem";
        this.AllChampions[48].id = 53;
        this.AllChampions[48].key = "Blitzcrank";
        this.AllChampions[48].name = "Blitzcrank";
        
       
        this.AllChampions[49].title = "Shard of the Monolith";
        this.AllChampions[49].id = 54;
        this.AllChampions[49].key = "Malphite";
        this.AllChampions[49].name = "Malphite";
        
       
        this.AllChampions[50].title = "the Sinister Blade";
        this.AllChampions[50].id = 55;
        this.AllChampions[50].key = "Katarina";
        this.AllChampions[50].name = "Katarina";
        
       
        this.AllChampions[51].title = "the Eternal Nightmare";
        this.AllChampions[51].id = 56;
        this.AllChampions[51].key = "Nocturne";
        this.AllChampions[51].name = "Nocturne";
        
       
        this.AllChampions[52].title = "the Twisted Treant";
        this.AllChampions[52].id = 57;
        this.AllChampions[52].key = "Maokai";
        this.AllChampions[52].name = "Maokai";
        
       
        this.AllChampions[53].title = "the Butcher of the Sands";
        this.AllChampions[53].id = 58;
        this.AllChampions[53].key = "Renekton";
        this.AllChampions[53].name = "Renekton";
        
       
        this.AllChampions[54].title = "the Exemplar of Demacia";
        this.AllChampions[54].id = 59;
        this.AllChampions[54].key = "JarvanIV";
        this.AllChampions[54].name = "Jarvan IV";
        
       
        this.AllChampions[55].title = "the Spider Queen";
        this.AllChampions[55].id = 60;
        this.AllChampions[55].key = "Elise";
        this.AllChampions[55].name = "Elise";
        
       
        this.AllChampions[56].title = "the Lady of Clockwork";
        this.AllChampions[56].id = 61;
        this.AllChampions[56].key = "Orianna";
        this.AllChampions[56].name = "Orianna";
        
       
        this.AllChampions[57].title = "the Monkey King";
        this.AllChampions[57].id = 62;
        this.AllChampions[57].key = "Wukong";
        this.AllChampions[57].name = "Wukong";
        
       
        this.AllChampions[58].title = "the Burning Vengeance";
        this.AllChampions[58].id = 63;
        this.AllChampions[58].key = "Brand";
        this.AllChampions[58].name = "Brand";
        
       
        this.AllChampions[59].title = "the Blind Monk";
        this.AllChampions[59].id = 64;
        this.AllChampions[59].key = "LeeSin";
        this.AllChampions[59].name = "Lee Sin"
        
       
        this.AllChampions[60].title = "the Night Hunter";
        this.AllChampions[60].id = 67;
        this.AllChampions[60].key = "Vayne";
        this.AllChampions[60].name = "Vayne"
        
       
        this.AllChampions[61].title = "the Mechanized Menace";
        this.AllChampions[61].id = 68;
        this.AllChampions[61].key = "Rumble";
        this.AllChampions[61].name = "Rumble"
        
       
        this.AllChampions[62].title = "the Serpent's Embrace";
        this.AllChampions[62].id = 69;
        this.AllChampions[62].key = "Cassiopeia";
        this.AllChampions[62].name = "Cassiopeia"
        
       
        this.AllChampions[63].title = "the Crystal Vanguard";
        this.AllChampions[63].id = 72;
        this.AllChampions[63].key = "Skarner";
        this.AllChampions[63].name = "Skarner"
        
       
        this.AllChampions[64].title = "the Revered Inventor";
        this.AllChampions[64].id = 74;
        this.AllChampions[64].key = "Heimerdinger";
        this.AllChampions[64].name = "Heimerdinger"
        
       
        this.AllChampions[65].title = "the Curator of the Sands";
        this.AllChampions[65].id = 75;
        this.AllChampions[65].key = "Nasus";
        this.AllChampions[65].name = "Nasus"
        
       
        this.AllChampions[66].title = "the Bestial Huntress";
        this.AllChampions[66].id = 76;
        this.AllChampions[66].key = "Nidalee";
        this.AllChampions[66].name = "Nidalee"
        
       
        this.AllChampions[67].title = "the Spirit Walker";
        this.AllChampions[67].id = 77;
        this.AllChampions[67].key = "Udyr";
        this.AllChampions[67].name = "Udyr"
        
       
        this.AllChampions[68].title = "Keeper of the Hammer";
        this.AllChampions[68].id = 78;
        this.AllChampions[68].key = "Poppy";
        this.AllChampions[68].name = "Poppy"
        
       
        this.AllChampions[69].title = "the Rabble Rouser";
        this.AllChampions[69].id = 79;
        this.AllChampions[69].key = "Gragas";
        this.AllChampions[69].name = "Gragas"
        
       
        this.AllChampions[70].title = "the Artisan of War";
        this.AllChampions[70].id = 80;
        this.AllChampions[70].key = "Pantheon";
        this.AllChampions[70].name = "Pantheon"
        
       
        this.AllChampions[71].title = "the Prodigal Explorer";
        this.AllChampions[71].id = 81;
        this.AllChampions[71].key = "Ezreal";
        this.AllChampions[71].name = "Ezreal"
        
       
        this.AllChampions[72].title = "the Iron Revenant";
        this.AllChampions[72].id = 82;
        this.AllChampions[72].key = "Mordekaiser";
        this.AllChampions[72].name = "Mordekaiser"
        
       
        this.AllChampions[73].title = "Shepherd of Souls";
        this.AllChampions[73].id = 83;
        this.AllChampions[73].key = "Yorick";
        this.AllChampions[73].name = "Yorick"
        
       
        this.AllChampions[74].title = "the Fist of Shadow";
        this.AllChampions[74].id = 84;
        this.AllChampions[74].key = "Akali";
        this.AllChampions[74].name = "Akali"
        
       
        this.AllChampions[75].title = "the Heart of the Tempest";
        this.AllChampions[75].id = 85;
        this.AllChampions[75].key = "Kennen";
        this.AllChampions[75].name = "Kennen"
        
       
        this.AllChampions[76].title = "The Might of Demacia";
        this.AllChampions[76].id = 86;
        this.AllChampions[76].key = "Garen";
        this.AllChampions[76].name = "Garen"
        
       
        this.AllChampions[77].title = "the Radiant Dawn";
        this.AllChampions[77].id = 89;
        this.AllChampions[77].key = "Leona";
        this.AllChampions[77].name = "Leona"
        
       
        this.AllChampions[78].title = "the Prophet of the Void";
        this.AllChampions[78].id = 90;
        this.AllChampions[78].key = "Malzahar";
        this.AllChampions[78].name = "Malzahar"
        
       
        this.AllChampions[79].title = "the Blade's Shadow";
        this.AllChampions[79].id = 91;
        this.AllChampions[79].key = "Talon";
        this.AllChampions[79].name = "Talon"
        
       
        this.AllChampions[80].title = "the Exile";
        this.AllChampions[80].id = 92;
        this.AllChampions[80].key = "Riven";
        this.AllChampions[80].name = "Riven"
        
       
        this.AllChampions[81].title = "the Mouth of the Abyss";
        this.AllChampions[81].id = 96;
        this.AllChampions[81].key = "KogMaw";
        this.AllChampions[81].name = "Kog'Maw"
        
       
        this.AllChampions[82].title = "the Eye of Twilight";
        this.AllChampions[82].id = 98;
        this.AllChampions[82].key = "Shen";
        this.AllChampions[82].name = "Shen"
        
       
        this.AllChampions[83].title = "the Lady of Luminosity";
        this.AllChampions[83].id = 99;
        this.AllChampions[83].key = "Lux";
        this.AllChampions[83].name = "Lux"
        
       
        this.AllChampions[84].title = "the Magus Ascendant";
        this.AllChampions[84].id = 101;
        this.AllChampions[84].key = "Xerath";
        this.AllChampions[84].name = "Xerath"
        
       
        this.AllChampions[85].title = "the Half-Dragon";
        this.AllChampions[85].id = 102;
        this.AllChampions[85].key = "Shyvana";
        this.AllChampions[85].name = "Shyvana"
        
       
        this.AllChampions[86].title = "the Nine-Tailed Fox";
        this.AllChampions[86].id = 103;
        this.AllChampions[86].key = "Ahri";
        this.AllChampions[86].name = "Ahri"
        
       
        this.AllChampions[87].title = "the Outlaw";
        this.AllChampions[87].id = 104;
        this.AllChampions[87].key = "Graves";
        this.AllChampions[87].name = "Graves"
        
       
        this.AllChampions[88].title = "the Tidal Trickster";
        this.AllChampions[88].id = 105;
        this.AllChampions[88].key = "Fizz";
        this.AllChampions[88].name = "Fizz"
        
       
        this.AllChampions[89].title = "the Thunder's Roar";
        this.AllChampions[89].id = 106;
        this.AllChampions[89].key = "Volibear";
        this.AllChampions[89].name = "Volibear"
        
       
        this.AllChampions[90].title = "the Pridestalker";
        this.AllChampions[90].id = 107;
        this.AllChampions[90].key = "Rengar";
        this.AllChampions[90].name = "Rengar"
        
       
        this.AllChampions[91].title = "the Arrow of Retribution"
        this.AllChampions[91].id = 110; 
        this.AllChampions[91].key = "Varus";
        this.AllChampions[91].name = "Varus"
        
       
        this.AllChampions[92].title = "the Titan of the Depths"
        this.AllChampions[92].id = 111; 
        this.AllChampions[92].key = "Nautilus";
        this.AllChampions[92].name = "Nautilus"
        
       
        this.AllChampions[93].title = "the Machine Herald";
        this.AllChampions[93].id = 112;
        this.AllChampions[93].key = "Viktor";
        this.AllChampions[93].name = "Viktor"
        
       
        this.AllChampions[94].title = "Fury of the North";
        this.AllChampions[94].id = 113;
        this.AllChampions[94].key = "Sejuani";
        this.AllChampions[94].name = "Sejuani"
        

        this.AllChampions[95].title = "the Grand Duelist";
        this.AllChampions[95].id = 114;
        this.AllChampions[95].key = "Fiora";
        this.AllChampions[95].name = "Fiora"
        
       
        this.AllChampions[96].title = "the Hexplosives Expert";
        this.AllChampions[96].id = 115;
        this.AllChampions[96].key = "Ziggs";
        this.AllChampions[96].name = "Ziggs"
        
       
        this.AllChampions[97].title = "the Fae Sorceress";
        this.AllChampions[97].id = 117;
        this.AllChampions[97].key = "Lulu";
        this.AllChampions[97].name = "Lulu"
        
       
        this.AllChampions[98].title = "the Glorious Executioner";
        this.AllChampions[98].id = 119;
        this.AllChampions[98].key = "Draven";
        this.AllChampions[98].name = "Draven"
        
       
        this.AllChampions[99].title = "the Shadow of War";
        this.AllChampions[99].id = 120;
        this.AllChampions[99].key = "Hecarim";
        this.AllChampions[99].name = "Hecarim"
        
       
        this.AllChampions[100].title = "the Voidreaver";
        this.AllChampions[100].id = 121;
        this.AllChampions[100].key = "Khazix";
        this.AllChampions[100].name = "Kha'Zix"
        
       
        this.AllChampions[101].title = "the Hand of Noxus";
        this.AllChampions[101].id = 122;
        this.AllChampions[101].key = "Darius";
        this.AllChampions[101].name = "Darius"
        
       
        this.AllChampions[102].title = "the Defender of Tomorrow";
        this.AllChampions[102].id = 126;
        this.AllChampions[102].key = "Jayce";
        this.AllChampions[102].name = "Jayce"
        
       
        this.AllChampions[103].title = "the Ice Witch";
        this.AllChampions[103].id = 127;
        this.AllChampions[103].key = "Lissandra";
        this.AllChampions[103].name = "Lissandra"
        
       
        this.AllChampions[104].title = "Scorn of the Moon";
        this.AllChampions[104].id = 131;
        this.AllChampions[104].key = "Diana";
        this.AllChampions[104].name = "Diana"
        
       
        this.AllChampions[105].title = "Demacia's Wings";
        this.AllChampions[105].id = 133;
        this.AllChampions[105].key = "Quinn";
        this.AllChampions[105].name = "Quinn"
        
       
        this.AllChampions[106].title = "the Dark Sovereign";
        this.AllChampions[106].id = 134;
        this.AllChampions[106].key = "Syndra";
        this.AllChampions[106].name = "Syndra"
        
       
        this.AllChampions[107].title = "The Star Forger";
        this.AllChampions[107].id = 136;
        this.AllChampions[107].key = "AurelionSol";
        this.AllChampions[107].name = "Aurelion Sol"
        
       
        this.AllChampions[108].title = "the Shadow Reaper";
        this.AllChampions[108].id = 141;
        this.AllChampions[108].key = "Kayn";
        this.AllChampions[108].name = "Kayn"
        
       
        this.AllChampions[109].title = "the Aspect of Twilight";
        this.AllChampions[109].id = 142;
        this.AllChampions[109].key = "Zoe";
        this.AllChampions[109].name = "Zoe"
        
       
        this.AllChampions[110].title = "Rise of the Thorns";
        this.AllChampions[110].id = 143;
        this.AllChampions[110].key = "Zyra";
        this.AllChampions[110].name = "Zyra"
        
       
        this.AllChampions[111].title = "Daughter of the Void";
        this.AllChampions[111].id = 145;
        this.AllChampions[111].key = "Kaisa";
        this.AllChampions[111].name = "Kai'Sa"
        
       
        this.AllChampions[112].title = "the Missing Link";
        this.AllChampions[112].id = 150;
        this.AllChampions[112].key = "Gnar";
        this.AllChampions[112].name = "Gnar"
        
       
        this.AllChampions[113].title = "the Secret Weapon";
        this.AllChampions[113].id = 154;
        this.AllChampions[113].key = "Zac";
        this.AllChampions[113].name = "Zac"
        
       
        this.AllChampions[114].title = "the Unforgiven";
        this.AllChampions[114].id = 157;
        this.AllChampions[114].key = "Yasuo";
        this.AllChampions[114].name = "Yasuo"
        
       
        this.AllChampions[115].title = "the Eye of the Void";
        this.AllChampions[115].id = 161;
        this.AllChampions[115].key = "Velkoz";
        this.AllChampions[115].name = "Vel'Koz"
        
       
        this.AllChampions[116].title = "the Stoneweaver";
        this.AllChampions[116].id = 163;
        this.AllChampions[116].key = "Taliyah";
        this.AllChampions[116].name = "Taliyah"
        
       
        this.AllChampions[117].title = "the Steel Shadow";
        this.AllChampions[117].id = 164;
        this.AllChampions[117].key = "Camille";
        this.AllChampions[117].name = "Camille"
        
       
        this.AllChampions[118].title = "the Heart of the Freljord";
        this.AllChampions[118].id = 201;
        this.AllChampions[118].key = "Braum";
        this.AllChampions[118].name = "Braum"
        
       
        this.AllChampions[119].title = "the Virtuoso";
        this.AllChampions[119].id = 202;
        this.AllChampions[119].key = "Jhin";
        this.AllChampions[119].name = "Jhin"
        
       
        this.AllChampions[120].title = "The Eternal Hunters";
        this.AllChampions[120].id = 203;
        this.AllChampions[120].key = "Kindred";
        this.AllChampions[120].name = "Kindred"
        
       
        this.AllChampions[121].title = "the Loose Cannon";
        this.AllChampions[121].id = 222;
        this.AllChampions[121].key = "Jinx";
        this.AllChampions[121].name = "Jinx"
        
       
        this.AllChampions[122].title = "the River King";
        this.AllChampions[122].id = 223;
        this.AllChampions[122].key = "TahmKench";
        this.AllChampions[122].name = "Tahm Kench"
        
       
        this.AllChampions[123].title = "the Purifier";
        this.AllChampions[123].id = 236;
        this.AllChampions[123].key = "Lucian";
        this.AllChampions[123].name = "Lucian"
        
       
        this.AllChampions[124].title = "the Master of Shadows";
        this.AllChampions[124].id = 238;
        this.AllChampions[124].key = "Zed";
        this.AllChampions[124].name = "Zed"
        
       
        this.AllChampions[125].title = "the Cantankerous Cavalier"
        this.AllChampions[125].id = 240; 
        this.AllChampions[125].key = "Kled";
        this.AllChampions[125].name = "Kled"
        
       
        this.AllChampions[126].title = "the Boy Who Shattered Time";
        this.AllChampions[126].id = 245;
        this.AllChampions[126].key = "Ekko";
        this.AllChampions[126].name = "Ekko"
        
       
        this.AllChampions[127].title = "the Piltover Enforcer";
        this.AllChampions[127].id = 254;
        this.AllChampions[127].key = "Vi";
        this.AllChampions[127].name = "Vi"
        
       
        this.AllChampions[128].title = "the Darkin Blade";
        this.AllChampions[128].id = 266;
        this.AllChampions[128].key = "Aatrox";
        this.AllChampions[128].name = "Aatrox"
        
       
        this.AllChampions[129].title = "the Tidecaller";
        this.AllChampions[129].id = 267;
        this.AllChampions[129].key = "Nami";
        this.AllChampions[129].name = "Nami"
        
       
        this.AllChampions[130].title = "the Emperor of the Sands";
        this.AllChampions[130].id = 268;
        this.AllChampions[130].key = "Azir";
        this.AllChampions[130].name = "Azir"
        
       
        this.AllChampions[131].title = "the Chain Warden";
        this.AllChampions[131].id = 412;
        this.AllChampions[131].key = "Thresh";
        this.AllChampions[131].name = "Thresh"
        
       
        this.AllChampions[132].title = "the Kraken Priestess";
        this.AllChampions[132].id = 420;
        this.AllChampions[132].key = "Illaoi";
        this.AllChampions[132].name = "Illaoi"
        
       
        this.AllChampions[133].title = "the Void Burrower";
        this.AllChampions[133].id = 421;
        this.AllChampions[133].key = "RekSai";
        this.AllChampions[133].name = "Rek'Sai"
        
       
        this.AllChampions[134].title = "the Green Father";
        this.AllChampions[134].id = 427;
        this.AllChampions[134].key = "Ivern";
        this.AllChampions[134].name = "Ivern"
        
       
        this.AllChampions[135].title = "the Spear of Vengeance";
        this.AllChampions[135].id = 429;
        this.AllChampions[135].key = "Kalista";
        this.AllChampions[135].name = "Kalista"
        
       
        this.AllChampions[136].title = "the Wandering Caretaker";
        this.AllChampions[136].id = 432;
        this.AllChampions[136].key = "Bard";
        this.AllChampions[136].name = "Bard"
        
       
        this.AllChampions[137].title = "The Charmer";
        this.AllChampions[137].id = 497;
        this.AllChampions[137].key = "Rakan";
        this.AllChampions[137].name = "Rakan"
        
       
        this.AllChampions[138].title = "the Rebel";
        this.AllChampions[138].id = 498;
        this.AllChampions[138].key = "Xayah";
        this.AllChampions[138].name = "Xayah"
        
       
        this.AllChampions[139].title = "The Fire below the Mountain";
        this.AllChampions[139].id = 516;
        this.AllChampions[139].key = "Ornn";
        this.AllChampions[139].name = "Ornn"
        
       
        this.AllChampions[140].title = "the Bloodharbor Ripper";
        this.AllChampions[140].id = 555;
        this.AllChampions[140].key = "Pyke";
        this.AllChampions[140].name = "Pyke"
    }

    GetChampions() {
        return this.AllChampions;
    }
        
}