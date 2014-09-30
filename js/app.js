$(function(){

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

  $.getJSON('towns.json',function(towns){
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
  })
});
	
  

