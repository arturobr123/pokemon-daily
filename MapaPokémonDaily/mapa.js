var map;
//Agregar un mapa
function initMap() {
  navigator.geolocation.getCurrentPosition(showPosition,showError);
  //Muestra mensaje de error en caso de haberlo al cargar el mapa
  function showError(error){
    switch(error.code){
      case error.PERMISSION_DENIED:
        er.innerHTML="Denegada la petición de Geolocalización en el navegador."
        break;
      case error.POSITION_UNAVAILABLE:
        er.innerHTML="La información de la localización no esta disponible."
        break;
      case error.TIMEOUT:
        er.innerHTML="El tiempo de petición ha expirado."
        break;
      case error.UNKNOWN_ERROR:
        er.innerHTML="Ha ocurrido un error desconocido."
        break;
    }
  }

  //Carga un mapa mostrando automátcamente la posición
  function showPosition(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    latlon = new google.maps.LatLng(lat, lon);
    mapholder = document.getElementById('lienzoMapa');
    var myOptions={
      center:latlon, //El centro del mapa es la posición actual
      //center:new google.maps.LatLng(19.055099, -98.283861),
      zoom:16,
      scaleControl: false,
      scrollwheel: false,
    };

    //Agrega icono con la posición actual
    var map = new google.maps.Map(document.getElementById("lienzoMapa"),myOptions);
    var EntrenadorPosIni = new google.maps.Marker({
        position:latlon,
        map:map,
        title:"¡Listo para comenzar!",
        icon: 'images/Entrenador00.jpg'
    });

    //Radio en el que puedes encontrar los pokémon más cercanos
    var circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: latlon,
      //center:new google.maps.LatLng(19.055099, -98.283861),
      radius:200
    });

    //Añadir iconos de pokémon predeterminados
    /*var marcadorejemplo = new google.maps.Marker({
        position: new google.maps.LatLng(19.055099, -98.283861),
        map:map,
        title:"Listo para comenzar",
        icon:'images/Entrenador00.jpg'
    });*/
    var pk01Marker = new google.maps.Marker({
      position: new google.maps.LatLng(19.053099, -98.283561),
      map: map,
      draggable:true,
      title: '¡Un muy buen compañero, no dudes en atraparlo!',
      icon: 'images/pikachu.png'
    });
    var pk02Marker = new google.maps.Marker({
      position: new google.maps.LatLng(19.055099, -98.282861),
      map: map,
      draggable:true,
      title: '¡Qué suerte, un umbreon!',
      icon: 'images/umbreon.png'
    });
    var pk03Marker = new google.maps.Marker({
      position: new google.maps.LatLng(19.055099, -98.286861),
      map: map,
      draggable:true,
      title: '¿Cuál de sus evoluciones te gustaría tener?',
      icon: 'images/eve.png'
    }); //Termina de añadir pokémon predeterminados

    //Añadir la información de los pokémon para visualizarla en ventanas emergentes en el mapa
    var contentStringpk1 =
        '<div id="content" align=center>'+'</div>'+
        '<h1 id="firstHeading" class="firstHeading" align=center>Pikachu</h1>'+
        '<div id="imagen" align=center>'+
          '<img src = "images/PikachuInfo.png" widht = 174 height = 133>' +
        '</div>'+
        '<div id="bodyContent" align=center>'+
          '<br>Cada vez que un <b>Pikachu</b> se encuentra<br>' +
          'con algo nuevo, le lanza una descarga eléctrica.<br>' +
          'Cuando se ve alguna baya chamuscada, es muy<br>' +
          'probable que sea obra suya, ya que a veces<br>' +
          'no controlan la intensidad de la descarga.</p>'+
          '<p>¿Quieres saber más de este Pokémon?, <a href="http://www.pokemon.com/es/pokedex/pikachu">Da click aquí</a> '+
        '</div>';
    var infowindow1 = new google.maps.InfoWindow({
      content: contentStringpk1
    });
    pk01Marker.addListener('click', function() {
      infowindow1.open(map, pk01Marker);
    });
    var contentStringpk2 =
        '<div id="content" align=center>'+'</div>'+
        '<h1 id="firstHeading" class="firstHeading" align=center>Umbreon</h1>'+
        '<div id="imagen" align=center>'+
          '<img src = "images/UmbreonInfo.png" widht = 174 height = 133>' +
        '</div>'+
        '<div id="bodyContent" align=center>'+
          '<br>Un <b>Umbreon</b> evolucionó tras haber<br>' +
          'estado expuesto a ondas lunares.<br>' +
          'Suele esconderse en la oscuridad en silencio y <br>' +
          'esperar a que su presa se mueva. Cuando se lanza al<br>' +
          'ataque, le brillan los anillos del cuerpo.</p>'+
          '<p>¿Quieres saber más de este Pokémon?, <a href="http://www.pokemon.com/es/pokedex/umbreon">Da click aquí</a> '+
        '</div>';
    var infowindow2 = new google.maps.InfoWindow({
      content: contentStringpk2
    });
    pk02Marker.addListener('click', function() {
      infowindow2.open(map, pk02Marker);
    });
    var contentStringpk3 =
        '<div id="content" align=center>'+'</div>'+
        '<h1 id="firstHeading" class="firstHeading" align=center>Eevee</h1>'+
        '<div id="imagen" align=center>'+
          '<img src = "images/EveInfo.jpeg" widht = 174 height = 133>' +
        '</div>'+
        '<div id="bodyContent" align=center>'+
          '<br>La configuración genética de <b>Eevee</b> le<br>' +
          'permite mutar y adaptarse enseguida a cualquier medio<br>' +
          'en el que viva. La evolución de este Pokémon suele<br>' +
          'ser posible gracias a las radiaciones emitidas por<br>' +
          'varias piedras.</p>'+
          '<p>¿Quieres saber más de este Pokémon?, <a href="http://www.pokemon.com/es/pokedex/eevee">Da click aquí</a> '+
        '</div>';
    var infowindow3 = new google.maps.InfoWindow({
      content: contentStringpk3
    });
    pk03Marker.addListener('click', function() {
      infowindow3.open(map, pk03Marker);
    });

    //Añadir un nuevo pokémon al mapa
    map.addListener('dblclick', function(e) {
      placeMarkerAndPanTo(e.latLng, map);
    });
    function placeMarkerAndPanTo(latlon, map) {
      var nuevopokemon = new google.maps.Marker({
        icon: 'images/nuevopk.png',
        position: latlon,
        draggable:true,
        map: map
      });
      map.panTo(latlon);
    }
  } //Termina showPosition
} //Termina initMap
google.maps.event.addDomListener(window, 'load', initMap);
