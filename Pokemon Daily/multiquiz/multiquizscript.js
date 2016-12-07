//region Global
var labelPoints,
	labelTime,
	subtitle,
	title; 

var buttons;
var buttonsText;

var bonus, 
	num,
	tp;

let TYPE_VARIATION = 3;
let POKEMON_VARIATION = 3;
	
var variations;
var questions;
var answers;

var count,
	points,
	time;
	
let EXTRA_DMG = 0;
let LESS_DMG = 1;
let NO_DMG = 2;
	
	
let POKEDEX = 0;
let TYPE = 1;
let EVOLUTION = 2;

var debug;

var json;

var index;

var correctAnswers;
//endregion
	
//region Helpers
	function alertDebug(string) {
		if (debug) {
			alert(string);
		}
	}
	
	function bind(id) { // shortcut for document.getElementById
	  	return document.getElementById(id);
	}

	function make(type) {
		return document.createElement(type);
	}
	
	function rng(max) {
		return Math.floor(Math.random() * max);
	}
//endregion 
	
//region Infrastructure
	function init() {
		labelPoints = bind("points");
		labelTime = bind("time");
		title = bind("title");
		subtitle = bind("question");
	
		buttons = [bind("button1"), bind("button2"), bind("button3"), bind("button4")];
		buttonsText = ["", "", "", ""];
		
		variations = [];
		
		bonus = sessionStorage.getItem("bonus");

		num = sessionStorage.getItem("num");
		
		tp = sessionStorage.getItem("tp");
		
		var sub =  sessionStorage.getItem("sub");
		
		title.innerHTML = sub;
		
		index = 0;
	
		answers = [];
		questions = [];
		
		switch (tp) {
			case "tipos":
				var types = "{\"typos\":[{\"typo\":\"Agua\",\"bonus\":[{\"typo\":\"Agua\",\"bonus\":0.5},{\"typo\":\"Dragón\",\"bonus\":0.5},{\"typo\":\"Fuego\",\"bonus\":2},{\"typo\":\"Planta\",\"bonus\":0.5},{\"typo\":\"Roca\",\"bonus\":2},{\"typo\":\"Tierra\",\"bonus\":2}]},{\"typo\":\"Bicho\",\"bonus\":[{\"typo\":\"Fuego\",\"bonus\":0.5},{\"typo\":\"Lucha\",\"bonus\":0.5},{\"typo\":\"Planta\",\"bonus\":2},{\"typo\":\"Psíquico\",\"bonus\":2},{\"typo\":\"Veneno\",\"bonus\":2},{\"typo\":\"Volador\",\"bonus\":0.5}]},{\"typo\":\"Dragón\",\"bonus\":[{\"typo\":\"Dragón\",\"bonus\":2}]},{\"typo\":\"Eléctrico\",\"bonus\":[{\"typo\":\"Agua\",\"bonus\":2},{\"typo\":\"Dragón\",\"bonus\":0.5},{\"typo\":\"Eléctrico\",\"bonus\":0.5},{\"typo\":\"Planta\",\"bonus\":0.5},{\"typo\":\"Tierra\",\"bonus\":0},{\"typo\":\"Volador\",\"bonus\":2}]},{\"typo\":\"Fantasma\",\"bonus\":[{\"typo\":\"Fantasma\",\"bonus\":2},{\"typo\":\"Normal\",\"bonus\":0},{\"typo\":\"Psíquico\",\"bonus\":0}]},{\"typo\":\"Fuego\",\"bonus\":[{\"typo\":\"Agua\",\"bonus\":0.5},{\"typo\":\"Bicho\",\"bonus\":2},{\"typo\":\"Dragón\",\"bonus\":0.5},{\"typo\":\"Fuego\",\"bonus\":0.5},{\"typo\":\"Hielo\",\"bonus\":2},{\"typo\":\"Planta\",\"bonus\":2},{\"typo\":\"Roca\",\"bonus\":0.5}]},{\"typo\":\"Hielo\",\"bonus\":[{\"typo\":\"Agua\",\"bonus\":0.5},{\"typo\":\"Dragón\",\"bonus\":2},{\"typo\":\"Hielo\",\"bonus\":0.5},{\"typo\":\"Planta\",\"bonus\":2},{\"typo\":\"Tierra\",\"bonus\":2},{\"typo\":\"Volador\",\"bonus\":2}]},{\"typo\":\"Lucha\",\"bonus\":[{\"typo\":\"Bicho\",\"bonus\":0.5},{\"typo\":\"Fantasma\",\"bonus\":0},{\"typo\":\"Hielo\",\"bonus\":2},{\"typo\":\"Normal\",\"bonus\":2},{\"typo\":\"Psíquico\",\"bonus\":0.5},{\"typo\":\"Roca\",\"bonus\":2},{\"typo\":\"Veneno\",\"bonus\":0.5},{\"typo\":\"Volador\",\"bonus\":0.5}]},{\"typo\":\"Normal\",\"bonus\":[{\"typo\":\"Fantasma\",\"bonus\":0},{\"typo\":\"Roca\",\"bonus\":0.5}]},{\"typo\":\"Planta\",\"bonus\":[{\"typo\":\"Agua\",\"bonus\":2},{\"typo\":\"Bicho\",\"bonus\":0.5},{\"typo\":\"Dragón\",\"bonus\":0.5},{\"typo\":\"Fuego\",\"bonus\":0.5},{\"typo\":\"Planta\",\"bonus\":0.5},{\"typo\":\"Roca\",\"bonus\":2},{\"typo\":\"Tierra\",\"bonus\":2},{\"typo\":\"Veneno\",\"bonus\":0.5},{\"typo\":\"Volador\",\"bonus\":0.5}]},{\"typo\":\"Psíquico\",\"bonus\":[{\"typo\":\"Lucha\",\"bonus\":2},{\"typo\":\"Psíquico\",\"bonus\":0.5},{\"typo\":\"Veneno\",\"bonus\":2}]},{\"typo\":\"Roca\",\"bonus\":[{\"typo\":\"Bicho\",\"bonus\":2},{\"typo\":\"Fuego\",\"bonus\":2},{\"typo\":\"Hielo\",\"bonus\":2},{\"typo\":\"Lucha\",\"bonus\":0.5},{\"typo\":\"Tierra\",\"bonus\":0.5},{\"typo\":\"Volador\",\"bonus\":2}]},{\"typo\":\"Tierra\",\"bonus\":[{\"typo\":\"Bicho\",\"bonus\":0.5},{\"typo\":\"Eléctrico\",\"bonus\":2},{\"typo\":\"Fuego\",\"bonus\":2},{\"typo\":\"Planta\",\"bonus\":0.5},{\"typo\":\"Roca\",\"bonus\":2},{\"typo\":\"Veneno\",\"bonus\":2},{\"typo\":\"Volador\",\"bonus\":0}]},{\"typo\":\"Veneno\",\"bonus\":[{\"typo\":\"Bicho\",\"bonus\":2},{\"typo\":\"Fantasma\",\"bonus\":0.5},{\"typo\":\"Planta\",\"bonus\":2},{\"typo\":\"Roca\",\"bonus\":0.5},{\"typo\":\"Tierra\",\"bonus\":0.5},{\"typo\":\"Veneno\",\"bonus\":0.5}]},{\"typo\":\"Volador\",\"bonus\":[{\"typo\":\"Bicho\",\"bonus\":2},{\"typo\":\"Eléctrico\",\"bonus\":0.5},{\"typo\":\"Lucha\",\"bonus\":2},{\"typo\":\"Planta\",\"bonus\":2},{\"typo\":\"Roca\",\"bonus\":0.5}]}]}";
				json = JSON.parse(types).typos;
				createTypeQuestions();
				break;
			default:
				var po = "{\"pokemon\":[{\"evolución\":\"Ivysaur\",\"tipo_1\":\"Planta\",\"pokedex\":1,\"tipo_2\":\"Veneno\",\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Bulbasaur\"},{\"evolución\":\"Venusaur\",\"tipo_1\":\"Planta\",\"pokedex\":2,\"tipo_2\":\"Veneno\",\"metodo\":\"Llegando a nivel 32\",\"nombre\":\"Ivysaur\"},{\"tipo_1\":\"Planta\",\"pokedex\":3,\"tipo_2\":\"Veneno\",\"nombre\":\"Venusaur\"},{\"evolución\":\"Charmeleon\",\"tipo_1\":\"Fuego\",\"pokedex\":4,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Charmander\"},{\"evolución\":\"Charizard\",\"tipo_1\":\"Fuego\",\"pokedex\":5,\"metodo\":\"Llegando a nivel 36\",\"nombre\":\"Charmeleon\"},{\"tipo_1\":\"Fuego\",\"pokedex\":6,\"tipo_2\":\"Volador\",\"nombre\":\"Charizard\"},{\"evolución\":\"Wartortle\",\"tipo_1\":\"Agua\",\"pokedex\":7,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Squirtle\"},{\"evolución\":\"Blastoise\",\"tipo_1\":\"Agua\",\"pokedex\":8,\"metodo\":\"Llegando a nivel 36\",\"nombre\":\"Wartortle\"},{\"tipo_1\":\"Agua\",\"pokedex\":9,\"nombre\":\"Blastoise\"},{\"evolución\":\"Metapod\",\"tipo_1\":\"Bicho\",\"pokedex\":10,\"metodo\":\"Llegando a nivel 7\",\"nombre\":\"Caterpie\"},{\"evolución\":\"Butterfree\",\"tipo_1\":\"Bicho\",\"pokedex\":11,\"metodo\":\"Llegando a nivel 10\",\"nombre\":\"Metapod\"},{\"tipo_1\":\"Bicho\",\"pokedex\":12,\"tipo_2\":\"Volador\",\"nombre\":\"Butterfree\"},{\"evolución\":\"Kakuna\",\"tipo_1\":\"Bicho\",\"pokedex\":13,\"tipo_2\":\"Veneno\",\"metodo\":\"Llegando a nivel 7\",\"nombre\":\"Weedle\"},{\"evolución\":\"Beedrill\",\"tipo_1\":\"Bicho\",\"pokedex\":14,\"tipo_2\":\"Veneno\",\"metodo\":\"Llegando a nivel 10\",\"nombre\":\"Kakuna\"},{\"tipo_1\":\"Bicho\",\"pokedex\":15,\"tipo_2\":\"Veneno\",\"nombre\":\"Beedrill\"},{\"evolución\":\"Pidgeotto\",\"tipo_1\":\"Normal\",\"pokedex\":16,\"tipo_2\":\"Volador\",\"metodo\":\"Llegando a nivel 18\",\"nombre\":\"Pidgey\"},{\"evolución\":\"Pidgeon\",\"tipo_1\":\"Normal\",\"pokedex\":17,\"tipo_2\":\"Volador\",\"metodo\":\"Llegando a nivel 36\",\"nombre\":\"Pidgeotto\"},{\"tipo_1\":\"Normal\",\"pokedex\":18,\"tipo_2\":\"Volador\",\"nombre\":\"Pidgeot\"},{\"evolución\":\"Raticate\",\"tipo_1\":\"Normal\",\"pokedex\":19,\"metodo\":\"Llegando a nivel 20\",\"nombre\":\"Rattata\"},{\"tipo_1\":\"Normal\",\"pokedex\":20,\"nombre\":\"Raticate\"},{\"evolución\":\"Fearow\",\"tipo_1\":\"Normal\",\"pokedex\":21,\"tipo_2\":\"Volador\",\"metodo\":\"Llegando a nivel 20\",\"nombre\":\"Spearow\"},{\"tipo_1\":\"Normal\",\"pokedex\":22,\"tipo_2\":\"Volador\",\"nombre\":\"Fearow\"},{\"evolución\":\"Arbok\",\"tipo_1\":\"Veneno\",\"pokedex\":23,\"metodo\":\"Llegando a nivel 22\",\"nombre\":\"Ekans\"},{\"tipo_1\":\"Veneno\",\"pokedex\":24,\"nombre\":\"Arbok\"},{\"evolución\":\"Raichu\",\"tipo_1\":\"Eléctrico\",\"pokedex\":25,\"metodo\":\"Con Piedra de Trueno\",\"nombre\":\"Pikachu\"},{\"tipo_1\":\"Eléctrico\",\"pokedex\":26,\"nombre\":\"Raichu\"},{\"evolución\":\"Sandslash\",\"tipo_1\":\"Tierra\",\"pokedex\":27,\"metodo\":\"Llegando a nivel 22\",\"nombre\":\"Sandshrew\"},{\"tipo_1\":\"Tierra\",\"pokedex\":28,\"nombre\":\"Sandslash\"},{\"evolución\":\"Nidorina\",\"tipo_1\":\"Veneno\",\"pokedex\":29,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Nidoran♀\"},{\"evolución\":\"Nidoqueen\",\"tipo_1\":\"Veneno\",\"pokedex\":30,\"metodo\":\"Con Piedra Lunar\",\"nombre\":\"Nidorina\"},{\"tipo_1\":\"Veneno\",\"pokedex\":31,\"tipo_2\":\"Tierra\",\"nombre\":\"Nidoqueen\"},{\"evolución\":\"Nidorino\",\"tipo_1\":\"Veneno\",\"pokedex\":32,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Nidoran♂\"},{\"evolución\":\"Nidoking\",\"tipo_1\":\"Veneno\",\"pokedex\":33,\"metodo\":\"Con Piedra Lunar\",\"nombre\":\"Nidorino\"},{\"tipo_1\":\"Veneno\",\"pokedex\":34,\"tipo_2\":\"Tierra\",\"nombre\":\"Nidoking\"},{\"evolución\":\"Clefable\",\"tipo_1\":\"Normal\",\"pokedex\":35,\"metodo\":\"Con Piedra Lunar\",\"nombre\":\"Clefairy\"},{\"tipo_1\":\"Normal\",\"pokedex\":36,\"nombre\":\"Clefable\"},";
				var ke = "{\"evolución\":\"Ninetales\",\"tipo_1\":\"Fuego\",\"pokedex\":37,\"metodo\":\"Con Piedra de Fuego\",\"nombre\":\"Vulpix\"},{\"tipo_1\":\"Fuego\",\"pokedex\":38,\"nombre\":\"Ninetales\"},{\"evolución\":\"Wigglytuff\",\"tipo_1\":\"Normal\",\"pokedex\":39,\"metodo\":\"Con Piedra Lunar\",\"nombre\":\"Jigglypuff\"},{\"tipo_1\":\"Normal\",\"pokedex\":40,\"nombre\":\"Wigglytuff\"},{\"evolución\":\"Golbat\",\"tipo_1\":\"Veneno\",\"pokedex\":41,\"tipo_2\":\"Volador\",\"metodo\":\"Llegando a nivel 22\",\"nombre\":\"Zubat\"},{\"tipo_1\":\"Veneno\",\"pokedex\":42,\"tipo_2\":\"Volador\",\"nombre\":\"Golbat\"},{\"evolución\":\"Gloom\",\"tipo_1\":\"Planta\",\"pokedex\":43,\"tipo_2\":\"Veneno\",\"metodo\":\"Llegando a nivel 21\",\"nombre\":\"Oddish\"},{\"evolución\":\"Vileplume\",\"tipo_1\":\"Planta\",\"pokedex\":44,\"tipo_2\":\"Veneno\",\"metodo\":\"Con Piedra de Hoja\",\"nombre\":\"Gloom\"},{\"tipo_1\":\"Planta\",\"pokedex\":45,\"tipo_2\":\"Veneno\",\"nombre\":\"Vileplume\"},{\"evolución\":\"Parasect\",\"tipo_1\":\"Bicho\",\"pokedex\":46,\"tipo_2\":\"Planta\",\"metodo\":\"Llegando a nivel 21\",\"nombre\":\"Paras\"},{\"tipo_1\":\"Bicho\",\"pokedex\":47,\"tipo_2\":\"Planta\",\"nombre\":\"Parasect\"},{\"evolución\":\"Venomoth\",\"tipo_1\":\"Bicho\",\"pokedex\":48,\"tipo_2\":\"Veneno\",\"metodo\":\"Llegando a nivel 34\",\"nombre\":\"Venonat\"},{\"tipo_1\":\"Bicho\",\"pokedex\":49,\"tipo_2\":\"Veneno\",\"nombre\":\"Venomoth\"},{\"evolución\":\"Dugtrio\",\"tipo_1\":\"Tierra\",\"pokedex\":50,\"metodo\":\"Llegando a nivel 26\",\"nombre\":\"Diglett\"},{\"tipo_1\":\"Tierra\",\"pokedex\":51,\"nombre\":\"Dugtrio\"},{\"evolución\":\"Persian\",\"tipo_1\":\"Normal\",\"pokedex\":52,\"metodo\":\"Llegando a nivel 28\",\"nombre\":\"Meowth\"},{\"tipo_1\":\"Normal\",\"pokedex\":53,\"nombre\":\"Persian\"},{\"evolución\":\"Golduck\",\"tipo_1\":\"Agua\",\"pokedex\":54,\"metodo\":\"Llegando a nivel 33\",\"nombre\":\"Psyduck\"},{\"tipo_1\":\"Agua\",\"pokedex\":55,\"nombre\":\"Golduck\"},{\"evolución\":\"Primeape\",\"tipo_1\":\"Lucha\",\"pokedex\":56,\"metodo\":\"Llegando a nivel 28\",\"nombre\":\"Mankey\"},{\"tipo_1\":\"Lucha\",\"pokedex\":57,\"nombre\":\"Primeape\"},{\"evolución\":\"Arcanine\",\"tipo_1\":\"Fuego\",\"pokedex\":58,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Growlithe\"},{\"tipo_1\":\"Fuego\",\"pokedex\":59,\"nombre\":\"Arcanine\"},{\"evolución\":\"Poliwhirl\",\"tipo_1\":\"Agua\",\"pokedex\":60,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Poliwag\"},{\"evolución\":\"Poliwrath\",\"tipo_1\":\"Agua\",\"pokedex\":61,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Poliwhirl\"},{\"tipo_1\":\"Agua\",\"pokedex\":62,\"tipo_2\":\"Lucha\",\"nombre\":\"Poliwrath\"},{\"evolución\":\"Kadabra\",\"tipo_1\":\"Psíquico\",\"pokedex\":63,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Abra\"},{\"evolución\":\"Alakazam\",\"tipo_1\":\"Psíquico\",\"pokedex\":64,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Kadabra\"},{\"tipo_1\":\"Psíquico\",\"pokedex\":65,\"nombre\":\"Alakazam\"},{\"evolución\":\"Machoke\",\"tipo_1\":\"Lucha\",\"pokedex\":66,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Machop\"},{\"evolución\":\"Machamp\",\"tipo_1\":\"Lucha\",\"pokedex\":67,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Machoke\"},{\"tipo_1\":\"Lucha\",\"pokedex\":68,\"nombre\":\"Machamp\"},{\"evolución\":\"Weepinbell\",\"tipo_1\":\"Planta\",\"pokedex\":69,\"tipo_2\":\"Veneno\",\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Bellsprout\"},{\"evolución\":\"Victreebell\",\"tipo_1\":\"Planta\",\"pokedex\":70,\"tipo_2\":\"Veneno\",\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Weepinbell\"},{\"tipo_1\":\"Planta\",\"pokedex\":71,\"tipo_2\":\"Veneno\",\"nombre\":\"Victreebel\"},{\"evolución\":\"Tentacruel\",\"tipo_1\":\"Agua\",\"pokedex\":72,\"tipo_2\":\"Veneno\",\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Tentacool\"},{\"tipo_1\":\"Agua\",\"pokedex\":73,\"tipo_2\":\"Veneno\",\"nombre\":\"Tentacruel\"},";
				var mo = "{\"evolución\":\"Graveler\",\"tipo_1\":\"Roca\",\"pokedex\":74,\"tipo_2\":\"Tierra\",\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Geodude\"},{\"evolución\":\"Golem\",\"tipo_1\":\"Roca\",\"pokedex\":75,\"tipo_2\":\"Tierra\",\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Graveler\"},{\"tipo_1\":\"Roca\",\"pokedex\":76,\"tipo_2\":\"Tierra\",\"nombre\":\"Golem\"},{\"evolución\":\"Rapidash\",\"tipo_1\":\"Fuego\",\"pokedex\":77,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Ponyta\"},{\"tipo_1\":\"Fuego\",\"pokedex\":78,\"nombre\":\"Rapidash\"},{\"evolución\":\"Slowbro\",\"tipo_1\":\"Agua\",\"pokedex\":79,\"tipo_2\":\"Psíquico\",\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Slowpoke\"},{\"tipo_1\":\"Agua\",\"pokedex\":80,\"tipo_2\":\"Psíquico\",\"nombre\":\"Slowbro\"},{\"evolución\":\"Magneton\",\"tipo_1\":\"Eléctrico\",\"pokedex\":81,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Magnemite\"},{\"evolución\":\"Magnezone\",\"tipo_1\":\"Eléctrico\",\"pokedex\":82,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Magneton\"},{\"tipo_1\":\"Normal\",\"pokedex\":83,\"tipo_2\":\"Volador\",\"nombre\":\"Farfetch'd\"},{\"evolución\":\"Dodrio\",\"tipo_1\":\"Normal\",\"pokedex\":84,\"tipo_2\":\"Volador\",\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Doduo\"},{\"tipo_1\":\"Normal\",\"pokedex\":85,\"tipo_2\":\"Volador\",\"nombre\":\"Dodrio\"},{\"evolución\":\"Dewong\",\"tipo_1\":\"Agua\",\"pokedex\":86,\"metodo\":\"Llegando a nivel 16\",\"nombre\":\"Seel\"},{\"tipo_1\":\"Agua\",\"pokedex\":87,\"tipo_2\":\"Hielo\",\"nombre\":\"Dewgong\"},{\"evolución\":\"Muk\",\"tipo_1\":\"Veneno\",\"pokedex\":88,\"metodo\":\"Llegando a nivel 38\",\"nombre\":\"Grimer\"},{\"tipo_1\":\"Veneno\",\"pokedex\":89,\"nombre\":\"Muk\"},{\"evolución\":\"Cloyster\",\"tipo_1\":\"Agua\",\"pokedex\":90,\"metodo\":\"Con Piedra de Agua\",\"nombre\":\"Shellder\"},{\"tipo_1\":\"Agua\",\"pokedex\":91,\"tipo_2\":\"Hielo\",\"nombre\":\"Cloyster\"},{\"evolución\":\"Haunter\",\"tipo_1\":\"Fantasma\",\"pokedex\":92,\"tipo_2\":\"Veneno\",\"metodo\":\"Llegando a nivel 25\",\"nombre\":\"Gastly\"},{\"evolución\":\"Gengar\",\"tipo_1\":\"Fantasma\",\"pokedex\":93,\"tipo_2\":\"Veneno\",\"metodo\":\"Con un Cable Link\",\"nombre\":\"Haunter\"},{\"tipo_1\":\"Fantasma\",\"pokedex\":94,\"tipo_2\":\"Veneno\",\"nombre\":\"Gengar\"},{\"tipo_1\":\"Roca\",\"pokedex\":95,\"tipo_2\":\"Tierra\",\"nombre\":\"Onix\"},{\"evolución\":\"Hypno\",\"tipo_1\":\"Psíquico\",\"pokedex\":96,\"metodo\":\"Llegando a nivel 26\",\"nombre\":\"Drowzee\"},{\"tipo_1\":\"Psíquico\",\"pokedex\":97,\"nombre\":\"Hypno\"},{\"evolución\":\"Kingler\",\"tipo_1\":\"Agua\",\"pokedex\":98,\"metodo\":\"Llegando a nivel 28\",\"nombre\":\"Krabby\"},{\"tipo_1\":\"Agua\",\"pokedex\":99,\"nombre\":\"Kingler\"},{\"evolución\":\"Electrode\",\"tipo_1\":\"Eléctrico\",\"pokedex\":100,\"metodo\":\"Llegando a nivel 30\",\"nombre\":\"Voltorb\"},{\"tipo_1\":\"Eléctrico\",\"pokedex\":101,\"nombre\":\"Electrode\"},{\"evolución\":\"Eggxecutor\",\"tipo_1\":\"Planta\",\"pokedex\":102,\"tipo_2\":\"Psíquico\",\"metodo\":\"Con Piedra de Hoja\",\"nombre\":\"Exeggcute\"},{\"tipo_1\":\"Planta\",\"pokedex\":103,\"tipo_2\":\"Psíquico\",\"nombre\":\"Exeggutor\"},{\"evolución\":\"Marowak\",\"tipo_1\":\"Tierra\",\"pokedex\":104,\"metodo\":\"Llegando a nivel 28\",\"nombre\":\"Cubone\"},{\"tipo_1\":\"Tierra\",\"pokedex\":105,\"nombre\":\"Marowak\"},{\"tipo_1\":\"Lucha\",\"pokedex\":106,\"nombre\":\"Hitmonlee\"},{\"tipo_1\":\"Lucha\",\"pokedex\":107,\"nombre\":\"Hitmonchan\"},{\"evolución\":\"Lickilicky\",\"tipo_1\":\"Normal\",\"pokedex\":108,\"metodo\":\"Subiendo de nivel con Desenrollar aprendido\",\"nombre\":\"Lickitung\"},{\"evolución\":\"Weezing\",\"tipo_1\":\"Veneno\",\"pokedex\":109,\"metodo\":\"Llegando a nivel 35\",\"nombre\":\"Koffing\"},{\"tipo_1\":\"Veneno\",\"pokedex\":110,\"nombre\":\"Weezing\"},{\"evolución\":\"Rhydon\",\"tipo_1\":\"Tierra\",\"pokedex\":111,\"tipo_2\":\"Roca\",\"metodo\":\"Llegando a nivel 42\",\"nombre\":\"Rhyhorn\"},";
				var n = "{\"evolución\":\"Rhyperior\",\"tipo_1\":\"Tierra\",\"pokedex\":112,\"tipo_2\":\"Roca\",\"metodo\":\"Intercambiando con Protector equipado\",\"nombre\":\"Rhydon\"},{\"tipo_1\":\"Normal\",\"pokedex\":113,\"nombre\":\"Chansey\"},{\"evolución\":\"Tangrowth\",\"tipo_1\":\"Planta\",\"pokedex\":114,\"metodo\":\"Subiendo de nivel con Poder Pasado aprendido\",\"nombre\":\"Tangela\"},{\"tipo_1\":\"Normal\",\"pokedex\":115,\"nombre\":\"Kangaskhan\"},{\"evolución\":\"Seadra\",\"tipo_1\":\"Agua\",\"pokedex\":116,\"metodo\":\"Llegando a nivel 32\",\"nombre\":\"Horsea\"},{\"tipo_1\":\"Agua\",\"pokedex\":117,\"nombre\":\"Seadra\"},{\"evolución\":\"Seaking\",\"tipo_1\":\"Agua\",\"pokedex\":118,\"metodo\":\"Llegando a nivel 33\",\"nombre\":\"Goldeen\"},{\"tipo_1\":\"Agua\",\"pokedex\":119,\"nombre\":\"Seaking\"},{\"evolución\":\"Starmie\",\"tipo_1\":\"Agua\",\"pokedex\":120,\"metodo\":\"Con Piedra de Agua\",\"nombre\":\"Staryu\"},{\"tipo_1\":\"Agua\",\"pokedex\":121,\"tipo_2\":\"Psíquico\",\"nombre\":\"Starmie\"},{\"tipo_1\":\"Psíquico\",\"pokedex\":122,\"nombre\":\"Mr. Mime\"},{\"tipo_1\":\"Bicho\",\"pokedex\":123,\"tipo_2\":\"Volador\",\"nombre\":\"Scyther\"},{\"tipo_1\":\"Hielo\",\"pokedex\":124,\"tipo_2\":\"Psíquico\",\"nombre\":\"Jynx\"},{\"evolución\":\"Electivire\",\"tipo_1\":\"Eléctrico\",\"pokedex\":125,\"metodo\":\"Intercambiando con Electric Booster equipado\",\"nombre\":\"Electabuzz\"},{\"evolución\":\"Magmortar\",\"tipo_1\":\"Fuego\",\"pokedex\":126,\"metodo\":\"Intercambiando con Magma Booster equipado\",\"nombre\":\"Magmar\"},{\"tipo_1\":\"Bicho\",\"pokedex\":127,\"nombre\":\"Pinsir\"},{\"tipo_1\":\"Normal\",\"pokedex\":128,\"nombre\":\"Tauros\"},{\"evolución\":\"Gyarados\",\"tipo_1\":\"Agua\",\"pokedex\":129,\"metodo\":\"Llegando a nivel 20\",\"nombre\":\"Magikarp\"},{\"tipo_1\":\"Agua\",\"pokedex\":130,\"tipo_2\":\"Volador\",\"nombre\":\"Gyarados\"},{\"tipo_1\":\"Agua\",\"pokedex\":131,\"tipo_2\":\"Hielo\",\"nombre\":\"Lapras\"},{\"tipo_1\":\"Normal\",\"pokedex\":132,\"nombre\":\"Ditto\"},{\"evolución\":\"Flareon\",\"tipo_1\":\"Normal\",\"pokedex\":133,\"metodo\":\"Con Piedra de Agua\",\"nombre\":\"Eevee\"},{\"evolución\":\"Jolteon\",\"tipo_1\":\"Agua\",\"pokedex\":134,\"metodo\":\"Con Piedra de Trueno\",\"nombre\":\"Vaporeon\"},{\"evolución\":\"Vaporeon\",\"tipo_1\":\"Eléctrico\",\"pokedex\":135,\"metodo\":\"Con Piedra de Fuego\",\"nombre\":\"Jolteon\"},{\"tipo_1\":\"Fuego\",\"pokedex\":136,\"nombre\":\"Flareon\"},{\"tipo_1\":\"Normal\",\"pokedex\":137,\"nombre\":\"Porygon\"},{\"tipo_1\":\"Roca\",\"pokedex\":138,\"tipo_2\":\"Agua\",\"nombre\":\"Omanyte\"},{\"tipo_1\":\"Roca\",\"pokedex\":139,\"tipo_2\":\"Agua\",\"nombre\":\"Omastar\"},{\"evolución\":\"Omastar\",\"tipo_1\":\"Roca\",\"pokedex\":140,\"tipo_2\":\"Agua\",\"metodo\":\"Llegando a nivel 40\",\"nombre\":\"Kabuto\"},{\"tipo_1\":\"Roca\",\"pokedex\":141,\"tipo_2\":\"Agua\",\"nombre\":\"Kabutops\"},{\"evolución\":\"Kabutops\",\"tipo_1\":\"Roca\",\"pokedex\":142,\"tipo_2\":\"Volador\",\"metodo\":\"Llegando a nivel 40\",\"nombre\":\"Aerodactyl\"},{\"tipo_1\":\"Normal\",\"pokedex\":143,\"nombre\":\"Snorlax\"},{\"tipo_1\":\"Hielo\",\"pokedex\":144,\"tipo_2\":\"Volador\",\"nombre\":\"Articuno\"},{\"tipo_1\":\"Eléctrico\",\"pokedex\":145,\"tipo_2\":\"Volador\",\"nombre\":\"Zapdos\"},{\"tipo_1\":\"Fuego\",\"pokedex\":146,\"tipo_2\":\"Volador\",\"nombre\":\"Moltres\"},{\"evolución\":\"Dragonair\",\"tipo_1\":\"Dragón\",\"pokedex\":147,\"metodo\":\"Llegando a nivel 30\",\"nombre\":\"Dratini\"},{\"evolución\":\"Dragonite\",\"tipo_1\":\"Dragón\",\"pokedex\":148,\"metodo\":\"Llegando a nivel 55\",\"nombre\":\"Dragonair\"},{\"tipo_1\":\"Dragón\",\"pokedex\":149,\"tipo_2\":\"Volador\",\"nombre\":\"Dragonite\"},{\"tipo_1\":\"Psíquico\",\"pokedex\":150,\"nombre\":\"Mewtwo\"},{\"tipo_1\":\"Psíquico\",\"pokedex\":151,\"nombre\":\"Mew\"}]}";
				var pokemon = po + ke + mo + n;
				json = JSON.parse(pokemon).pokemon;
				createPokemonQuestions();
		}
	
		count = 0;
		points = 0;
	
		debug = false;
		
		time = 0;
		
		correctAnswers = 0;	
		
		interval = setInterval( function() {
			 timer() 
		}, 10);
		
		switch (tp) {
			case "tipos":
				setUpTypeQuestion();
				break;
			default:
				setUpPokemonQuestion();
		}
		
		for (i in buttons) {
			buttons[i].addEventListener("click", buttonClicked);
		}
	}
	
	function stopTimer() {
	    clearInterval(interval);
	}
	
	function timer() {
	    time++;
	
		var msg = "Tiempo:\t";
		var res = time;
		
		var second = 100;
		var minute = second * 60;
		
		if (time > minute) {
			if (time < minute * 10) {
				msg += "0";
			}
			msg += Math.floor( res / minute) + ":";
			res = res % (minute);
		
		} else {
			msg += "00:";
		}
		if (time > second) {
			if (res < second * 10) {
				msg += "0";
			}
			msg += Math.floor(res / second) + ":";
			res = res % second;
		} else {
			msg += "00:";
		}
		msg += res;
	
	    labelTime.innerHTML = msg;
	}
//endregion

//region UI
	function createTypeQuestions() {
		var found;
		var n;
		var l;
		var next;
		
		size = Object.keys(json).length;
		
		for (var i = 0; i < num; i++) {
			var variation = rng(TYPE_VARIATION);
			var repeat = false;
			found = false;
			l = 0;
			next;
			while (!found) {
				n = rng(size);
				while (next == null) {
					if (l >= Object.keys(json[n].bonus).length) {
						l = 0;
						n = rng(size);
					}
					if (variation == EXTRA_DMG && json[n].bonus[l].bonus == 2) {
						next = json[n].bonus[l].typo;
					} else if (variation == LESS_DMG && json[n].bonus[l].bonus == 0.5) {
						next = json[n].bonus[l].typo;
					} else if (variation == NO_DMG && json[n].bonus[l].bonus == 0) {
						next = json[n].bonus[l].typo;
					}
					l++;
				}
				
				found = true;
				
				for (var j = 0; j < index; j++) {
					if (questions[j] == json[n].typo && answers[j] == next) {
						found = false;
						next = null;
					}
				}
				
				repeat = !repeat; 
				if (repeat) {
					variation = rng(TYPE_VARIATION);
				}
				
			}
			answers.push(next);
			questions.push(json[n].typo);
			variations.push(variation);
			next = null;
			index++;
		}
		index = 0;
		
	}
	
	function createPokemonQuestions() {
		var found;
		var n;
		var l;
		var next;
		
		size = Object.keys(json).length;
		
		for (var i = 0; i < num; i++) {
			var variation = rng(POKEMON_VARIATION);
			found = false;
			next;
			while (!found) {
				n = rng(size);
				if (variation == POKEDEX) {
					next = json[n].pokedex;
				} else if (variation == TYPE) {
					next = json[n].tipo_1;
				} else if (variation == EVOLUTION) {
					while (next == null) {
						if ("evolución" in json[n]) {
							next = json[n].evolución;
						} else {
							n = rng(size);
						}
					}
				}
				
				found = true;
				
				for (var j = 0; j < index; j++) {
					if (questions[j] == json[n].nombre && answers[j] == next) {
						found = false;
						next = null;
					}
				}
				
			}
			answers.push(next);
			questions.push(json[n].nombre);
			variations.push(variation);
			next = null;
			index++;
		}
		index = 0;
		
	}
	
	function setUpTypeQuestion() {
		var question;
		switch(variations[index]) {
			case EXTRA_DMG:
				question = "Contra que hace mas daño el tipo ";
				break;
			case LESS_DMG:
				question = "Contra que hace menos daño el tipo ";
				break;
			default:
				question = "Contra que hace no hace daño el tipo ";
		}
		
		subtitle.innerHTML = question + questions[index] + "?";
	
		var correct = rng(Object.keys(buttons).length);
		var id;
		var type = answers[index];
		
		for (var i = 0; i < Object.keys(buttons).length; i++) {
			var n = rng(size);
			if (i == correct) {
				buttonsText[i] = type;
			} else {
				var isRepeated = true;
				while (isRepeated) {
					isRepeated = false;
					for (var j = 0; j < i; j++) {
						if (buttonsText[j] == json[n].typo) {
							isRepeated = true;
						}
					}
					if (isRepeated || json[n].typo == type) {
						n = rng(size);
					}
				}
				buttonsText[i] = json[n].typo;
			}	
		}
	
		for (var i in buttons) {
			buttons[i].innerHTML = buttonsText[i];
		}
	}
	
	function setUpPokemonQuestion() {
		var question;
		
		switch(variations[index]) {
			case POKEDEX:
				question = "Cual es el numer de entrada Podedex de ";
				break;
			case TYPE:
				question = "Cual es el el primer tipo de ";
				break;
			default:
				question = "Cual es la evolución de ";
		}
		
		subtitle.innerHTML = question + questions[index] + "?";
	
		var correct = rng(Object.keys(buttons).length);
		var id;
		var type = answers[index];
		var variation = variations[index];
		
		for (var i = 0; i < Object.keys(buttons).length; i++) {
			var n = rng(size);
			if (i == correct) {
				buttonsText[i] = type;
			} else {
				var isRepeated = true;
				while (isRepeated) {
					isRepeated = false;
					for (var j = 0; j < i; j++) {
						switch (variation) {
							case POKEDEX:
								if (buttonsText[j] == json[n].pokedex) {
									isRepeated = true;
								}
								break;
							case TYPE:
								if (buttonsText[j] == json[n].tipo_1) {
									isRepeated = true;
								}
								break;
							default:
								if ("evolución" in json[n]) {
									if (buttonsText[j]  == json[n].tipo_1) {
										isRepeated = true;
									}
								} else {
									isRepeated = true;
								}
						}
					}
					switch (variation) {
						case POKEDEX:
							if (type == json[n].pokedex) {
								isRepeated = true;
							}
							break;
						case TYPE:
							if (type == json[n].tipo_1) {
								isRepeated = true;
							}
							break;
						default:
							if ("evolución" in json[n]) {
								if (type == json[n].evolución) {
									isRepeated = true;
								}
							} else {
								isRepeated = true;
							}
					}
					
					if (isRepeated) {
						n = rng(size);
					}
				}
				switch (variation) {
					case POKEDEX:
						buttonsText[i] = json[n].pokedex;
						break;
					case TYPE:
						buttonsText[i] = json[n].tipo_1;
						break;
					default:
						buttonsText[i] = json[n].evolución;
				}
			}	
		}
	
		for (var i in buttons) {
			buttons[i].innerHTML = buttonsText[i];
		}
			
			
	}
	
	function buttonClicked() {
		var id = -1;
		i = -1;
		while (++i < 4 && id < 0) {
			alertDebug("id: " + i)
			if (buttons[i] == this) {
				id = i;
			}
		} 
		var msg;
		if (buttonsText[id] == answers[index]) {
			var add = 1 * bonus
			points += add;
			labelPoints.innerHTML = "Puntos: " + points;
			msg = "La respuesta es correcta! Puntos +" + add;
			correctAnswers++;
		} else {
			msg = "La respuesta es incorrecta!";
		}
		alert(msg);
		
		index++;
		if (index < num) {
			switch (tp) {
				case "tipos":
					setUpTypeQuestions();
					break;
				default:
					setUpPokemonQuestion();
			}
		} else {
			msg = "";
			var res = time;
		
			var second = 100;
			var minute = second * 60;
		
			if (time > minute) {
				if (time < minute * 10) {
					msg += "0";
				}
				msg += Math.floor( res / minute) + ":";
				res = res % (minute);
		
			} else {
				msg += "00:";
			}
			if (time > second) {
				if (res < second * 10) {
					msg += "0";
				}
				msg += Math.floor(res / second) + ":";
				res = res % second;
			} else {
				msg += "00:";
			}
			msg += res;
			
			
			alert("Felicidades, contestaste "  + correctAnswers +
			 " respuetas correctas! \nTu tiempo final es de " + msg +
			"\nTu puntacion final es de " + points + " puntos");
			
			sessionStorage.setItem("point", points);
			sessionStorage.setItem("time", time);
			window.location.href = "../index/index.html";
		}
	}
//endergion

init();