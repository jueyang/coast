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



//get photos from flickr

window.jsonFlickrApi = function(rsp) {

	//add progress bar here - start
    
    
    //$() complete later, add progress bar 
    var photos = rsp.photos.photo;
    for (var i = 0; i < 112; i++) {
        var p = photos[i];
        var url = [ 'http://farm', p.farm, '.static.flickr.com/', p.server, '/', p.id, '_', p.secret, '_q.jpg' ].join('');
        var img = document.createElement('img');
        img.src = url;   // to replace --> var html = "<" + "img src='" + url + "'" + ">"; // weird for 'eval', sorry   
        
        //geographical display with Follower
        
        var location = new MM.Location(p.latitude, p.longitude);
        var dimensions = new MM.Point(75, 75);
        var f = new MM.Follower(m, location, img, dimensions);
               
        //non-geographical display
        
        var li = $('<li><img src="'+ url +'" height="30px"/></li>')
          .appendTo('#sm-pictures').hover(
          	(function(f, url) {
          	return function(){
          		$('img',f.div).attr('src',url);
          	};
          	})(f, url),
          	(function(f) {
          	return function(){
          		$('img',f.div).attr('src','./images/marker.png');
          	};
          	})(f)
          );
                
        // var li =  $('#sm-pictures').append('<li><img src="'+ url +'" height="30px"/></li>');
     	
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

// layer expand 

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

// layer selection

$('ul.layerswitch li a').click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass('active')) {
        $('ul.layerswitch li a').removeClass('active');
        $('ul.layerswitch li a').removeClass('hover');
        $(this).addClass('active');
        if (this.id == 'oregon') {
        	easeIt(43.565,-127.049,8);
        	$('.open').css('display','none');
        	$('.flickr').css('display','block');
        	$('.newport-story').css('display','none');
   			$('.bandon-story').css('display','none');
   			$('.beach-story').css('display','none');
   			$('.picture-container').add();

        }
        if (this.id == 'newport') {
        	easeIt(44.6133,-124.0655,10);
        	$('.open').css('display','none');
        	$('.flickr').css('display','none');
        	$('.newport-story').css('display','block');
   			$('.bandon-story').css('display','none');
   			$('.beach-story').css('display','none');
   			$('.picture-container').remove();
   			$('.linked-pictures').remove();
        }
        if (this.id == 'bandon') {
   			easeIt(43.1431,-124.3432,10);
   			$('.open').css('display','none');
   			$('.flickr').css('display','none');
        	$('.newport-story').css('display','none');
   			$('.bandon-story').css('display','block');   		
   			$('.beach-story').css('display','none');
   			$('.picture-container').remove();
   			$('.linked-pictures').remove();

        }
        if (this.id == 'beach') {
   			easeIt(42.203847,-124.374956,10);
   			$('.open').css('display','none');
   			$('.flickr').css('display','none');
        	$('.newport-story').css('display','none');
   			$('.bandon-story').css('display','none');
   			$('.beach-story').css('display','block');
   			$('.picture-container').css('display','none');
   			$('.picture-container').remove();
   			$('.linked-pictures').remove();
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
   	$('.flickr').css('display','none');
  	$('.newport-story').css('display','none');
   	$('.bandon-story').css('display','none');
   	$('.beach-story').css('display','none');
   	$('.picture-container').remove();
   	$('.linked-pictures').remove();
   	easeIt(43.565,-127.049,10);
});

// turn pictures on
	
$('#flickr-click').click(function (e){
	e.preventDefault();
	flickr();
	//add progress bar here - finish
	$(this).addClass('change');
	/*
	$(this).hover(
		function() {
			$(this).addClass('again');
		},
		function() {
			$(this).removeClass('again');
		}
	);
	*/
});



	
  

