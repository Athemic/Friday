function initMap() {

  var styles = [
{
"stylers": [
{
"hue": "#ff1a00"
},
{
"invert_lightness": true
},
{
"saturation": -100
},
{
"lightness": 33
},
{
"gamma": 0.5
}
]
},
{
"featureType": "water",
"elementType": "geometry",
"stylers": [
{
"color": "#2D333C"
}
]
}
]

  var uluru = {lat: 51.058951, lng: 3.716998};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: uluru,
    styles: styles,
    streetViewControl: false,
    mapTypeControl: false,
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });

  marker.addListener("click", () => {
    var url = 'https://www.google.be/maps/dir/My+Location/Friday,+Zilverhof+35,+9000+Gent/@51.0592604,3.7172669,15.75z/';
    window.open(url, '_blank').focus();
  });

}
