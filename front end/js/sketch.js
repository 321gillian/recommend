
var scale_const = 0.9; // used to scale the vinyl sleeve and vinyl in relation to the canvas height
var x_offset = 0; // used to tell the sleeve how far from the left it should be
var vinyl_offset = 0; // used for the transition between not faved and faved. Becomes a negative number
var albumart_reveal_opacity = 1; // used to fade in the album art. This is increased in its respective draw_function

var vinyl; // will contain the image for the vinyl disc
var albumart; // will contain the image for the album art
var vc1; // genre-based light colour
var vc2; // genre-based dark colour
var visualiser; // will contain the instance of the Visualiser object

var liked = false; // boolean for whether or not the current track has been liked
var moving = false; // boolean for whether or not the slide-to-the-left animation is playing

var draw_function; // variable to contain the draw_function currently being used in draw()
var cnv; // will contain the canvas element

// top left coordinates of canvas
var cx, cy;

class Visualiser 
{
    constructor(c1, c2, song_file, cnv)
    {
        this.last_frame = false;
        this.c1 = c1;
        this.c2 = c2;
        this.cnv = cnv;
        this.song_file = song_file;
        this.speed = 1;
        this.x_off = int((height*scale_const)*0.05);
        this.y_off = int((height*scale_const)*0.05);
        this.h = (height*scale_const)-this.x_off*2;
        this.w = this.h;
        this.zx = int(x_offset + this.x_off);
        this.zy = int((height - (height*scale_const))/2 + this.y_off);
        this.fft = new p5.FFT(0.9, 1024);
        this.song_file.setVolume(0.8);
        this.song_file.amp(0.2);
        this.fft.setInput(this.song_file);
    }

    show()
    {
        if (this.song_file.isLoaded() & this.song_file.isPlaying())
        {
            imageMode(CORNER);
            var divisions = 4;
            var h = this.h/divisions;
            var spectrum = this.fft.analyze();
            var newBuffer = [];

            var scaledSpectrum = splitOctaves(spectrum, 12);
            var len = scaledSpectrum.length - 4;

            // background(255,206,188, 1);
            // copy before clearing the background
            noStroke();
            fill(this.c1);
            // rect(this.zx, this.zy, this.w, this.h);

            noSmooth();
            // console.log(this.zx, this.zy);
            image(this.last_frame, this.zx, this.zy+this.speed+1);
            smooth();
            // copy(this.cnv,this.zx,this.zy,this.w,this.h,this.zx,this.zy+this.speed,this.w,this.h);
            
            // console.log(this.c1);
            
            stroke(this.c2);
            noFill();
            // draw shape
            beginShape();

            // one at the far corner
            curveVertex(this.zx, this.zy+this.y_off*2);

            for (var i = 0; i < len; i++) {
                var p = smoothPoint(scaledSpectrum, i, 2);
                var x = map(i, 0, len-1, this.zx+1, this.zx+this.w-1);
                var y = map(p, 0, 255, this.zy+this.y_off*2.5, this.zy);
                curveVertex(x, y);
            }

            // one last point at the end
            curveVertex(this.zx+this.w, this.zy+this.y_off*2);


            endShape();
            // console.log(this.zx,this.zy+1);
            this.last_frame = get(this.zx,this.zy+1,this.w,this.h-this.speed);
        }
    }
}

function preload(){
    sound = loadSound(
        '/audio/thundercat.mp3', //resource to load
        function(s){
            s.setVolume(1);
            s.play()
        }, // callback function for success
        function(e){alert(e)} // callback function for error
    );
    vinyl = loadImage('/img/vinyldisc.png');
    albumart = loadImage('/img/drunk.jpg');
}

function setup()
{
    //HTML overlay

    //canvas
    cnv = createCanvas($('#player-section').width(), $('#player-section').height());
    cnv.parent('player-section');
    x_offset = (width - (height*scale_const)*1.5)/2;
    vc1 = color(255, 206, 188); //bg
    vc2 = color(237, 66, 100, 150); //lines
    cx = cnv.position().x;
    cy = cnv.position().y;
    vis = new Visualiser(vc1, vc2, sound, cnv);
    vis.last_frame = get(vis.zx,vis.zy+1,vis.w,vis.h-vis.speed);
    draw_HTML_overlay();
}

draw_function = unliked_draw;

// called every frame
function draw()
{
    // this function changes on certain events
    draw_function();
}

function windowResized() {
  resizeCanvas($('#player-section').width(), $('#player-section').height());
}
