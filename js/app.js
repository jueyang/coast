var m;
var url = 'http://api.tiles.mapbox.com/v3/jue.map-9f0twc3h,jue.coasttowns';

wax.tilejson(url, function(tilejson) {
    m = new MM.Map('map', new wax.mm.connector(tilejson));

    wax.mm.interaction()
      .map(m)
      .tilejson(tilejson)
      .on(wax.tooltip().animate(true).parent(m.parent).events());

    m.setCenterZoom({ lat:43.565, lon:-127.049 }, 8);
    wax.mm.zoomer(m, tilejson).appendTo(m.parent);
});

var extent = m.getExtent();
var bbox = [extent.west, extent.south, extent.east, extent.north].join(',');

var script = document.createElement('script');
	script.src = 'http://api.flickr.com/services/rest/?'+
	       'method=flickr.photos.search&'+
    	   'api_key=a96cbef093a8c0280d3aed4e0c004d4c&'+
           'tags=coast&'+
           'extras=geo&'+
       	   'bbox=' + bbox +
           'has_geo=1&'+
           'format=json';
document.getElementsByTagName('head')[0].appendChild(script);


// easeIt
var easeIt = function(x, y, z, callback) {
    var options = {
        location: new MM.Location(x, y),
        zoom: z || 13,
        ease: 'ease',
        time: 2000
        };
    if (typeof callback === 'function') {
            options.callback = callback;
    }
        easey.slow(m, options);
}

   // Layer Selection
   
$('ul.layerswitch li a').click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass('active')) {
        $('ul.layerswitch li a').removeClass('active');
        $(this).addClass('active');
        if (this.id == 'oregon') {
        	easeIt(43.565,-123.795,8);
        	$('.open').css('display','none');
        	$('.intro').css('display','block');
        	$('#c1').css('display','none');
        	$('.newport-story').css('display','none');
        	$('#c2').css('display','none');
   			$('.bandon-story').css('display','none');
   			$('#c3').css('display','none');
   			$('.beach-story').css('display','none');

        }
        if (this.id == 'newport') {
        	easeIt(44.6133,-124.0655,10);
        	$('.open').css('display','none');
        	$('.intro').css('display','none');
        	$('#c1').css('display','block');
        	$('.newport-story').css('display','block');
        	$('#c2').css('display','none');
   			$('.bandon-story').css('display','none');
   			$('#c3').css('display','none');
   			$('.beach-story').css('display','none');
        }
        if (this.id == 'bandon') {
   			easeIt(43.1431,-124.3432,10);
   			$('.open').css('display','none');
   			$('.intro').css('display','none');
   			$('#c1').css('display','none');
        	$('.newport-story').css('display','none');
   			$('#c2').css('display','block');
   			$('.bandon-story').css('display','block');   		
   			$('#c3').css('display','none');
   			$('.beach-story').css('display','none');

        }
        if (this.id == 'beach') {
   			easeIt(42.203847,-124.374956,10);
   			$('.open').css('display','none');
   			$('.intro').css('display','none');
   			$('#c1').css('display','none');
        	$('.newport-story').css('display','none');
        	$('#c2').css('display','none');
   			$('.bandon-story').css('display','none');
   			$('#c3').css('display','block');
   			$('.beach-story').css('display','block');
   
        }
        
    }
});



	// click for topbar and continuing stories
	
$('#cont1').click(function (e) {
    e.preventDefault();
    $('ul.layerswitch li a').removeClass('active');
	$('#newport').addClass('active');
    $('.open').fadeOut('4000');
    $('.newport-story').css('display','block');
    $('#topbar').fadeIn('4000');
    $('#topbar').css('display','block');
    easeIt(44.6133,-124.0655,10);
});
    
$('#cont2').click(function (e) {
	e.preventDefault();
	$('ul.layerswitch li a').removeClass('active');
	$('#bandon').addClass('active');
	$('#c1').css('display','none');
    $('.newport-story').css('display','none');
	$('#c2').css('display','block');
    $('.bandon-story').css('display','block');
    $('.intro').css('display','none');
    easeIt(43.1431,-124.3432,10);
});

$('#cont3').click(function (e) {
	e.preventDefault();
	$('ul.layerswitch li a').removeClass('active');
	$('#beach').addClass('active');
	$('#c2').css('display','none');
    $('.bandon-story').css('display','none');
	$('#c3').css('display','block');
    $('.beach-story').css('display','block');
    easeIt(42.203847,-124.374956,10);
});

$('#cont4').click(function (e) {
	e.preventDefault();
	$('ul.layerswitch li a').removeClass('active');
	$('#oregon').addClass('active');
	$('#c3').css('display','none');
    $('.beach-story').css('display','none');
    $('.intro').fadeIn('4000');
    $('#intro-click').fadeIn('4000');
    easeIt(43.565,-123.795,8);
});


    // return to opening page
    
$('.title a').click(function (e) {
	e.preventDefault();
	$('#topbar').fadeOut('8000');
	$('.open').fadeIn('8000');
   	$('.intro').css('display','none');
    $('#c1').css('display','none');
  	$('.newport-story').css('display','none');
    $('#c2').css('display','none');
   	$('.bandon-story').css('display','none');
   	$('#c3').css('display','none');
   	$('.beach-story').css('display','none');
   	easeIt(43.565,-127.049,10);
});

// turn pictures on (how to get it into a loop?)
$('#intro-click').click(function (e){
	e.preventDefault();
	
	//flickr 
	var jsonFlickrApi = function(rsp) {
		var photos = rsp.photos.photo;
		for (var i = 0; i < photos.length; i++) {
	    	var p = photos[i];
	    	var url = [ 'http://farm', p.farm, '.static.flickr.com/', p.server, '/', p.id, '_', p.secret, '_s.jpg' ].join('');    
	       	var html = "<" + "img src='" + url + "'" + ">"; // weird for 'eval', sorry
	       	var location = new MM.Location(p.latitude, p.longitude);
	       	var dimensions = new MM.Point(75, 75); //this gives dimension to div
	       	var f = new MM.Follower(m, location, html, dimensions);
	   	}
	}

	// Move the button to the zoom controls
	$(this).addClass('change');
	$('.pictures img').addClass('appear');
	/*	
	$(this).hover(
		function() {
			$(this).addClass('again');
		},
		function() {
			$(this).removeClass('again');
		}
	);*/
	
	$(this).click(function (e){
		if ($('.pictures img').hasClass('appear')){
			$('.pictures img').removeClass('appear');
			$(this).addClass('again');
		}
		else {
			$('.pictures img').addClass('appear');
			$(this).removeClass('again');
		}
	});
});



	
  

