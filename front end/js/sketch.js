
var p5instance;
var sketch_instance;
var song_info;

var scale_const = 0.9; // used to scale the vinyl sleeve and vinyl in relation to the canvas height
var x_offset = 0; // used to tell the sleeve how far from the left it should be
var vinyl_offset = 0; // used for the transition between not faved and faved. Becomes a negative number
var albumart_reveal_opacity = 1; // used to fade in the album art. This is increased in its respective draw_function

var sound; // will contain the sound file
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
    constructor(song_file, cnv, sketch)
    {
        this.sketch = sketch;
        this.last_frame = false;
        this.cnv = cnv;
        this.song_file = song_file;
        this.speed = 1;
        this.x_off = sketch.int((sketch.height*scale_const)*0.05);
        this.y_off = sketch.int((sketch.height*scale_const)*0.05);
        this.h = (sketch.height*scale_const)-this.x_off*2;
        this.w = this.h;
        this.zx = sketch.int(x_offset + this.x_off);
        this.zy = sketch.int((sketch.height - (sketch.height*scale_const))/2 + this.y_off);
        this.fft = new p5.FFT(0.9, 1024);
        this.song_file.setVolume(1);
        this.fft.setInput(this.song_file);
    }

    show()
    {
        if (this.song_file.isLoaded() & this.song_file.isPlaying())
        {
            this.sketch.imageMode(this.sketch.CORNER);
            var divisions = 4;
            var h = this.h/divisions;
            var spectrum = this.fft.analyze();
            var newBuffer = [];

            var scaledSpectrum = splitOctaves(spectrum, 12, this.sketch);
            var len = scaledSpectrum.length - 4;

            // background(255,206,188, 1);
            // copy before clearing the background
            this.sketch.noStroke();
            this.sketch.fill(vc1);
            // rect(this.zx, this.zy, this.w, this.h);

            this.sketch.noSmooth();
            // console.log(this.zx, this.zy);
            this.sketch.image(this.last_frame, this.zx, this.zy+this.speed+1);
            this.sketch.smooth();
            // copy(this.cnv,this.zx,this.zy,this.w,this.h,this.zx,this.zy+this.speed,this.w,this.h);
            
            // console.log(this.vc1);
            
            this.sketch.stroke(vc2);
            this.sketch.noFill();
            // draw shape
            this.sketch.beginShape();

            // one at the far corner
            this.sketch.curveVertex(this.zx, this.zy+this.y_off*2);

            for (var i = 0; i < len; i++) {
                var p = smoothPoint(scaledSpectrum, i, 2);
                var x = this.sketch.map(i, 0, len-1, this.zx+1, this.zx+this.w-1);
                var y = this.sketch.map(p, 0, 255, this.zy+this.y_off*2.5, this.zy);
                this.sketch.curveVertex(x, y);
            }

            // one last point at the end
            this.sketch.curveVertex(this.zx+this.w, this.zy+this.y_off*2);


            this.sketch.endShape();
            // console.log(this.zx,this.zy+1);
            this.last_frame = this.sketch.get(this.zx,this.zy+1,this.w,this.h-this.speed);
        }
    }
}

// function preload(){
//     var sound = loadSound(
//         '/audio/thundercat.mp3', //resource to load
//         function(s){
//             s.setVolume(1);
//             s.play()
//         }, // callback function for success
//         function(e){alert(e)} // callback function for error
//     );
//     var vinyl = loadImage('/img/vinyldisc.png');
//     var albumart = loadImage('/img/drunk.jpg');
// }



draw_function = unliked_draw;

function sketch_vis_colors(sketch)
{
    if (song_info.genre == "Pop")
    {
        vc1 = sketch.color(237, 66, 100, 175); //bg
        vc2 = sketch.color(255, 206, 188, 150); //lines
    }
    else if (song_info.genre == "Funk")
    {
        vc1 = sketch.color(40,60,134, 230); //bg
        vc2 = sketch.color(69,162,71, 150); //lines
    }
}

var s = function(sketch)
{
    sketch_instance = sketch
    sketch.preload = function()
    {
        sound = sketch.loadSound(
            song_info.audio, //resource to load
            function(s) // callback function for success
            {
                s.setVolume(1.0);
                s.play();
            }, 
            function(e){alert(e)} // callback function for error
        );
        vinyl = sketch.loadImage('/img/vinyldisc.png');
        albumart = sketch.loadImage(song_info.cover);
    }

    sketch.setup = function()
    {
        //HTML overlay

        //canvas
        cnv = sketch.createCanvas($('#player-section').width(), $('#player-section').height());
        cnv.parent('player-section');
        x_offset = (sketch.width - (sketch.height*scale_const)*1.5)/2;
        sketch_vis_colors(sketch);
        cx = cnv.position().x;
        cy = cnv.position().y;
        vis = new Visualiser(sound, cnv, sketch);
        vis.last_frame = sketch.get(vis.zx,vis.zy+1,vis.w,vis.h-vis.speed);
        draw_HTML_overlay(sketch);
    }

    // called every frame
    sketch.draw = function()
    {
        // this function changes on certain events
        draw_function(sketch);
    }

    sketch.windowResized = function()
    {
        resizeCanvas($('#player-section').width(), $('#player-section').height());
    }
}

