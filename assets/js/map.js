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
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });

}
