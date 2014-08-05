var app = app || {};

app.towns = {
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

// app.jsonFlickrApi = function(rsp) {
//   var photos = rsp.photos.photo;
//   for (var i = 0; i < photos.length; i++) {
//       var p = photos[i];
//       var url = [ 'http://farm', p.farm, '.static.flickr.com/', p.server, '/', p.id, '_', p.secret, '_s.jpg' ].join('');
//       var img = document.createElement('img');
//       img.src = url;    
//       // var html = "<" + "img src='" + url + "'" + ">"; // weird for 'eval', sorry
//   }
// }

// app.flickr = function(){
//   var extent = map.getBounds();
//   var bbox = [extent.west, extent.south, extent.east, extent.north].join(',');
//   var script = document.createElement('script');
//   script.src = 'https://api.flickr.com/services/rest/?'+
//                'method=flickr.photos.search&'+
//                'api_key=a96cbef093a8c0280d3aed4e0c004d4c&'+
//                'tags=coast&'+
//                'bbox=' + bbox +
//                '&extras=geo&'+
//                'has_geo=1&'+
//                'format=json';
//   document.getElementsByTagName('head')[0].appendChild(script);
// };