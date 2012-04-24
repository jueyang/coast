// namespacing!
if (!com) {
    var com = { };
    if (!com.modestmaps) {
        com.modestmaps = { };
    }
}

(function(mm){
mm.Follower = function(m, location, content, dimensions) {
    this.coord = m.locationCoordinate(location);
    this.offset = new mm.Point(0, 0);
    this.dimensions = dimensions || new mm.Point(100, 50);
    this.padding = new mm.Point(20,20);
    //this.offset = new mm.Point(0, -this.dimensions.y);

    this.offset = new mm.Point(0, 0);
    var follower = this;
    var callback = function(m, a) { return follower.draw(m); };
    m.addCallback('drawn', callback);
    
    this.div = document.createElement('div');
    $(this.div).addClass('pictures');
    this.div.style.position = 'absolute';
    this.div.style.width = this.dimensions.x + 'px';
    this.div.style.height = this.dimensions.y + 'px';
    //this.div.style.backgroundColor = 'white';
    //this.div.style.border = 'solid black 1px';
    
    this.div.innerHTML = content;
    
    mm.addEvent(this.div, 'mousedown', function(e) {
        if(!e) e = window.event;
        return mm.cancelEvent(e);
    });
    m.parent.appendChild(this.div);
    
    this.draw(m);
}

mm.Follower.prototype = {

    div: null,
    coord: null,
    
    offset: null,
    dimensions: null,
    padding: null,

    draw: function(map) {
        try {
            var point = map.coordinatePoint(this.coord);
        } catch(e) {
            // too soon?
            return;
        }
        
        if(point.x + this.dimensions.x + this.offset.x < 0) {
            // too far left
            this.div.style.display = 'none';
        
        } else if(point.y + this.dimensions.y + this.offset.y < 0) {
            // too far up
            this.div.style.display = 'none';
        
        } else if(point.x + this.offset.x > map.dimensions.x) {
            // too far right
            this.div.style.display = 'none';
        
        } else if(point.y + this.offset.y > map.dimensions.y) {
            // too far down
            this.div.style.display = 'none';

        } else {
            // this.div.style.display = 'none';
            mm.moveElement(this.div, {
                x: Math.round(point.x	 + this.offset.x),
                y: Math.round(point.y + this.offset.y),
                scale: 1,
                width: this.dimensions.x,
                height: this.dimensions.y
            });
        }
    }

};

})(com.modestmaps);
