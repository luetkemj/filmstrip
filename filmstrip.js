// filmstrip.js 0.1
// Trying this all again but better with Proto Inheritance
function FilmStrip ( container, viewport ){
    this.container = container;
    this.cells = this.container.find('img');
    this.viewportWidth = $(viewport).width();

    this.fitCellWidthToViewport();
    this.fitCellHeightToMinimum();
    this.containerWidth = this.setContainerWidth();
};


// Set width of filmjs Container
FilmStrip.prototype.setContainerWidth = function(){

    var width = 0;

    $( this.cells ).each(function(){
        width = width + $(this).width();
    });

    this.container.width( width + 20 );

};


// Get Width of largest Cell
FilmStrip.prototype.getWidestCellWidth = function(){

    var widestCellWidth = 0;

    this.cells.each(function(){

        // Get on screen image
        var screenImage = $(this);
        // Create new offscreen image to test
        var theImage = new Image();
        theImage.src = screenImage.attr("src");
        // Get accurate measurements from that.
        var width = theImage.width;

        if ( width > widestCellWidth ) {
            widestCellWidth = width;
        }
    });

    return widestCellWidth;

};


// Get Height of shortest Cell
FilmStrip.prototype.getShortestCellHeight = function(){
    
    var shortestCellHeight = this.container.height();

    this.cells.each(function(){
        cellHeight = $(this).height();

        if (cellHeight < shortestCellHeight ){
            shortestCellHeight = cellHeight;
        }
    });

    return shortestCellHeight;

};


// Resize all CellWidths to fit within the viewport
FilmStrip.prototype.fitCellWidthToViewport = function(){

    var maxWidth = Math.min( this.getWidestCellWidth(), this.viewportWidth );
    var maxHeight = $(window).height();

    this.cells.each(function(){

        var $this = $(this);
        
        width = $this.width();  
        height = $this.height();

        ratio = Math.min( maxWidth / width, maxHeight / height );

        width = ratio * width;
        height = ratio * height;

        $this.width(width).height(height);
    });

};


// Resize all CellHeights to the height of the shortest cell
FilmStrip.prototype.fitCellHeightToMinimum = function(){

    var maxWidth = Math.min( this.getWidestCellWidth(), this.viewportWidth );
    var maxHeight = this.getShortestCellHeight();

    this.cells.each(function(){

        var $this = $(this);
        
        width = $this.width();  
        height = $this.height();

        ratio = Math.min( maxWidth / width, maxHeight / height );

        width = ratio * width;
        height = ratio * height;

        $this.width(width).height(height);
    });
    
};
