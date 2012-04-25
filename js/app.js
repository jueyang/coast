var mm = MM;
var m;
var url = 'http://api.tiles.mapbox.com/v3/jue.map-9f0twc3h,jue.coasttowns';

wax.tilejson(url + '.jsonp',function(tilejson) {
    	m = new mm.Map('map', 
    	new wax.mm.connector(tilejson),null, [
        new easey.DragHandler(),
        new easey.TouchHandler(),
        new easey.MouseWheelHandler(),
        new easey.DoubleClickHandler()
	    ]);
    m.setZoomRange(7, 16);
    m.setCenterZoom(new mm.Location(43.565,-127.049),8);
    wax.mm.zoomer(m,tilejson).appendTo(m.parent);
    wax.mm.interaction()
    	.map(m)
    	.tilejson(tilejson)
    	.on(wax.movetip().parent(m.parent).events());
    var extent = m.getExtent();
    var bbox = [extent.west, extent.south, extent.east, extent.north].join(',');
});



//get photos from flickr, draw them on the screen (ie.Locationpoint) in follower.js

window.jsonFlickrApi = function(rsp) {
    var photos = rsp.photos.photo;
    for (var i = 0; i < photos.length; i++) {
        var p = photos[i];
        var url = [ 'http://farm', p.farm, '.static.flickr.com/', p.server, '/', p.id, '_', p.secret, '_s.jpg' ].join('');
        var img = document.createElement('img');
        img.src = url;    
        // var html = "<" + "img src='" + url + "'" + ">"; // weird for 'eval', sorry
        var location = new MM.Location(p.latitude, p.longitude);
        var dimensions = new MM.Point(75, 75);
        var f = new MM.Follower(m, location, img, dimensions);
    }
}

function flickr(){
	var extent = m.getExtent();
    var bbox = [extent.west, extent.south, extent.east, extent.north].join(',');
	var script = document.createElement('script');
	script.src = 'http://api.flickr.com/services/rest/?'+
	               'method=flickr.photos.search&'+
	               'api_key=a96cbef093a8c0280d3aed4e0c004d4c&'+
	               'tags=coast&'+
	               'bbox=' + bbox +
	               '&extras=geo&'+
	               'has_geo=1&'+
	               'format=json';
	document.getElementsByTagName('head')[0].appendChild(script);
}
	
// easeIt

function easeIt(x, y, z, callback) {
    var options = {
        location: new mm.Location(x, y),
        zoom: z || 13,
        ease: 'ease',
        time: 2000
        };
    if (typeof callback === 'function') {
            options.callback = callback;
    }
        easey.slow(m, options);
}

// layer expand and selection


	//i have question!
$('ul.layerswitch li a').hover(
	function(){
		if(!$(this).hasClass('active')){
			$('.active').addClass('hover');
		}
	},
	function(){
		if(!$(this).hasClass('hover')){
			$('.active').removeClass('hover');
		}
	}
);

$('ul.layerswitch li a').click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass('active')) {
        $('ul.layerswitch li a').removeClass('active');
        $(this).addClass('active');
        if (this.id == 'oregon') {
        	easeIt(43.565,-123.795,8);
        	$('.open').css('display','none');
        	$('.flickr').css('display','block');
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
        	$('.flickr').css('display','none');
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
   			$('.flickr').css('display','none');
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
   			$('.flickr').css('display','none');
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
	
$('#proceed').click(function (e) {
    e.preventDefault();
    $('.towns').css('display','block');
    $('ul.layerswitch li a').removeClass('active');
	$('#newport').addClass('active');
    $('.open').fadeOut('4000');
    $('#c1').css('display','block');
    $('.newport-story').css('display','block');
    $('#topbar').fadeIn('4000');
    $('#topbar').css('display','block');
    easeIt(44.6133,-124.0655,10);
});

// return to opening page
    
$('.title a').click(function (e) {
	e.preventDefault();
	$('#topbar').fadeOut('8000');
	$('.open').fadeIn('8000');
	$('.towns').css('display','none');
   	$('#flickr').css('display','none');
    $('#c1').css('display','none');
  	$('.newport-story').css('display','none');
    $('#c2').css('display','none');
   	$('.bandon-story').css('display','none');
   	$('#c3').css('display','none');
   	$('.beach-story').css('display','none');
   	easeIt(43.565,-127.049,10);
});

// turn pictures on
	
$('#flickr-click').click(function (e){
	e.preventDefault();
	flickr();
	$(this).addClass('change');
	//$('.pictures img').addClass('appear');
	/*$(this).hover(
		function() {
			$(this).addClass('again');
		},
		function() {
			$(this).removeClass('again');
		}
	);
	$(this).click(function (e){
		if ($('.pictures img').hasClass('appear')){
			$('.pictures img').removeClass('appear');
			$(this).addClass('again');
		}
		else {
			$('.pictures img').addClass('appear');
			$(this).removeClass('again');
		}
	});*/
});



	
  

