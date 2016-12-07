var level = bind("level");
var type = bind("type");
var number = bind("number");
var question = JSON.parse("{\"questions\":{\"niveles\":[{\"bonus\":1,\"formato\":\"respuesta multiple\",\"dificultad\":\"Entrenador\"},{\"bonus\":1.5,\"formato\":\"letras\",\"dificultad\":\"Lider de Gimnasio\"},{\"bonus\":2,\"formato\":\"completa la palabra\",\"dificultad\":\"Alto Mando\"},{\"bonus\":3.0,\"formato\":\"caja de texto\",\"dificultad\":\"Campeón\"}],\"tipos\":[{\"trivia\":\"pokemon\"},{\"trivia\":\"tipos\"}]}}")


//region Helpers
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
	function load() {
		var lvl = question.questions.niveles;
		for (var i in lvl) {
			var option = make("option");
			option.value = lvl[i].dificultad;
			option.text = lvl[i].dificultad;
			level.appendChild(option)
		}
		
		var t = question.questions.tipos;
		for (var i in t) {
			var option = make("option");
			option.value = t[i].trivia;
			option.text = t[i].trivia;
			type.appendChild(option)
		}
	}
	
	function start() {
		var index, href;
		
		sessionStorage.setItem("tp", type.options[type.selectedIndex].value);
		sessionStorage.setItem("num", number.options[number.selectedIndex].value);
		sessionStorage.setItem("sub", level.options[level.selectedIndex].value);
		
		switch(level.options[level.selectedIndex].value) {
			case question.questions.niveles[0].dificultad:
				href = "../multiquiz/multi_quiz.html";
				index = 0;
				break;
			case question.questions.niveles[1].dificultad:
				href = "../lettersquiz/letters_quiz.html";
				index = 1;
				break;
			case question.questions.niveles[2].dificultad:
				href = "../fillquiz/fill_quiz.html";
				index = 2;
				break;
			case question.questions.niveles[3].dificultad:
				href = "../typequiz/type_quiz.html";
				index = 3;
				break;
			default:
				alert("Escoge una dificultad");
		}
		sessionStorage.setItem("bonus", question.questions.niveles[index].bonus);
		window.location.href = href;
	}
	
load();