$(function(){
var towns = {
"type": "FeatureCollection",
"features": [
  {
    "type": "Feature",
    "properties": {
      "id":1,
      "zoom":7,
      "name": "Newport",
      "story": "We camped on a beach in Newport for Ellen's twenty-first birthday. It was gray and misty - the usual coast weather. I dropped my perfectly-roasted marshmallow onto the beach and it tasted grainy.When we walked back to our sleeping bags at 3am, all we could see were the silhouettes of the beach grasses. They looked as if they were from another planet."
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        -123.9539,
        44.6027
      ]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "id":2,
      "zoom":7,
      "name": "Bandon",
      "story": "My friend's uncle manages a small golf course in Bandon. The last time I visited he featured his daughter's school project in the shop. The wind can be strong and I remember wearing a black fleece in June and still feeling chilled. Rocks rise from the ocean like waking whales."
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        -124.3432,
        43.1431
      ]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "id":3,
      "zoom":7,
      "name": "Beach",
      "story": "Black sea stones. I believe I was collecting them. A dog ran by, followed by his owner. He handed me a rock that resembled candied orange, smiling as he walked away. I smiled back, only to see his small figure smaller.  Agate, I later learned, is rich in this region."
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        -124.374956,
        42.203847
      ]
    }
  }
]
}

L.mapbox.accessToken = 'pk.eyJ1IjoianVlIiwiYSI6InFsakR2UEkifQ.GSsNWZF7HVlLqwdhWuM2gA';

var zoomPanOps = {animated:true, duration:0.5};
var dotB = L.icon({
    iconUrl: 'images/dot-blue.png',
    iconSize: [100,100]
});

var dotY = L.icon({
    iconUrl: 'images/dot-yellow.png',
    iconSize: [100,100]
});

var map = L.mapbox.map('map', 'jue.map-9f0twc3h',{
    minZoom:6,
    maxZoom:9,
    zoomControl: false
}).setView([43.5, -128], 7, zoomPanOps);

var layerGroup = L.layerGroup(), //store a copy of layers to be used for DOM/map interaction
    activeStory = false;

var townLayers = L.geoJson(towns,{
    pointToLayer: function(feature,latlng){
        return L.marker(latlng, {icon: dotB});
    },
    onEachFeature: function(feature,layer){
        var title = '<h1>' + feature.properties.name + '</h1>';
            paragraph = '<p>' + feature.properties.story + '</p>',
            all = '<div class="story">' + title + paragraph + '</div>';

        // popup of both town name and story - for click
        feature.properties.all = L.popup({
            closeButton: false,
            keepInView: true,
            offset: [-300,100]
        })
        .setContent(all)
        .setLatLng(layer.getLatLng());

        layer.addTo(layerGroup);

        layer.on('click',function(){
            story(layer,feature.properties.all);
            activeStory = feature.properties.id;
        });
    }
}).addTo(map);

map.on('popupopen',function(){
    $('.open').removeClass('fadeIn');
    $('.open').addClass('fadeOut');
    $('.fader').addClass('blink');
});


$('.fader').bind('click',crossFade);
$('.looper').bind('click',toNextStory);

function crossFade(){
    $('.open').toggleClass('fadeIn fadeOut');
    $('.story').toggleClass('fadeIn',false)
        .toggleClass('fadeOut',true);
    $('.fader').toggleClass('blink');
}

function story(layer,popup){
    layerGroup.eachLayer(function(l){
        l.setIcon(dotB);
    });

    setTimeout(function(){
        layer.setIcon(dotY);
        map.openPopup(popup);
    },200);
}

function toNextStory(){

  var next;
  if (!activeStory || activeStory >= layerGroup.getLayers().length){
    next = 1;
  } else if (activeStory < layerGroup.getLayers().length){
    next = activeStory + 1;
  }

  layerGroup.eachLayer(function(layer) {
    if (layer.feature.properties.id === next) {

      nextStory = layer.feature.properties.all;

      map.panTo(layer.getLatLng(),zoomPanOps);

      story(layer,nextStory);

      paragraphOpen = true;
      activeStory = next;
      }
    });
}
});
	
  

