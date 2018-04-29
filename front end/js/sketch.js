'use strict';
var p5instance;
var sketch_instance;
var song_info;

var scale_const = 0.9; // used to scale the vinyl sleeve and vinyl in relation to the canvas height
var x_offset = 0; // used to tell the sleeve how far from the left it should be
var vinyl_offset = 0; // used for the transition between not faved and faved. Becomes a negative number
var albumart_reveal_opacity = 1; // used to fade in the album art. This is increased in its respective draw_function

var vinyl; // will contain the image for the vinyl disc
var albumart; // will contain the image for the album art
var vc1; // genre-based light colour
var vc2; // genre-based dark colour
var vis; // will contain the instance of the Visualiser object

var liked = false; // boolean for whether or not the current track has been liked
var moving = false; // boolean for whether or not the slide-to-the-left animation is playing

var draw_function; // variable to contain the draw_function currently being used in draw()

// top left coordinates of canvas
var cx, cy;

class Visualiser 
{
    constructor()
    {
        this.last_frame = false;
        this.song_file = sketch_instance.loadSound(
                            song_info.audio, //resource to load
                            function(s) // callback function for success
                            {
                                s.setVolume(1.0);
                                s.play();
                            }, 
                            function(e){alert(e)} // callback function for error
                        );;
        this.speed = 1;
        this.x_off = sketch_instance.int((sketch_instance.height*scale_const)*0.05);
        this.y_off = sketch_instance.int((sketch_instance.height*scale_const)*0.05);
        this.h = (sketch_instance.height*scale_const)-this.x_off*2;
        this.w = this.h;
        this.zx = sketch_instance.int(x_offset + this.x_off);
        this.zy = sketch_instance.int((sketch_instance.height - (sketch_instance.height*scale_const))/2 + this.y_off);
        this.fft = new p5.FFT(0.9, 1024);
        this.song_file.setVolume(1);
        this.fft.setInput(this.song_file);
    }

    show()
    {
        if (this.song_file.isLoaded() & this.song_file.isPlaying())
        {
            sketch_instance.imageMode(sketch_instance.CORNER);
            var divisions = 4;
            var h = this.h/divisions;
            var spectrum = this.fft.analyze();
            var newBuffer = [];

            var scaledSpectrum = splitOctaves(spectrum, 12, sketch_instance);
            var len = scaledSpectrum.length - 5;

            // background(255,206,188, 1);
            // copy before clearing the background
            sketch_instance.noStroke();
            sketch_instance.fill(vc1);
            // rect(sketch_instance.int(this.zx), this.zy, this.w, this.h);

            sketch_instance.noSmooth();
            // console.log(sketch_instance.int(this.zx), this.zy);
            sketch_instance.image(this.last_frame, sketch_instance.int(this.zx), this.zy+this.speed+1);
            sketch_instance.smooth();
            // copy(this.cnv,sketch_instance.int(this.zx),this.zy,this.w,this.h,sketch_instance.int(this.zx),this.zy+this.speed,this.w,this.h);
            
            // console.log(this.vc1);
            
            sketch_instance.stroke(vc2);
            sketch_instance.noFill();
            // draw shape
            sketch_instance.beginShape();

            // one at the far corner
            sketch_instance.curveVertex(sketch_instance.int(this.zx), this.zy+this.y_off*2);

            for (var i = 0; i < len; i++) {
                var p = smoothPoint(scaledSpectrum, i, 2);
                var x = sketch_instance.map(i, 0, len-1, sketch_instance.int(this.zx)+1, sketch_instance.int(this.zx)+this.w-1);
                var y = sketch_instance.map(p, 0, 255, this.zy+this.y_off*2.5, this.zy+this.y_off/4);
                sketch_instance.curveVertex(x, y);
            }

            // one last point at the end
            sketch_instance.curveVertex(sketch_instance.int(this.zx)+this.w, this.zy+this.y_off*2);


            sketch_instance.endShape();
            // console.log(sketch_instance.int(this.zx),this.zy+1);
            this.last_frame = sketch_instance.get(sketch_instance.int(this.zx),this.zy+1,sketch_instance.int(this.w),sketch_instance.int(this.h)-this.speed);
        }
    }
}

draw_function = unliked_draw;

function sketch_vis_colors()
{
    if (song_info.genre == "Pop")
    {
        vc1 = sketch_instance.color(237, 66, 100, 175); //bg
        vc2 = sketch_instance.color(255, 206, 188, 150); //lines
    }
    else if (song_info.genre == "Funk")
    {
        vc1 = sketch_instance.color(40,60,134, 230); //bg
        vc2 = sketch_instance.color(69,162,71, 150); //lines
    }
    else if (song_info.genre == "Rock")
    {
        vc1 = sketch_instance.color(69, 182, 73, 230); //bg
        vc2 = sketch_instance.color(220, 227, 91, 150); //lines
    }
    else if (song_info.genre == "Folk")
    {
        vc1 = sketch_instance.color(248, 255, 174, 230); //bg
        vc2 = sketch_instance.color(67, 198, 172, 150); //lines
    }
    else if (song_info.genre == "Alternative")
    {
        vc1 = sketch_instance.color(255, 253, 228, 230); //bg
        vc2 = sketch_instance.color(0, 90, 167, 150); //lines
    }   
    else if (song_info.genre == "Electronica")
    {
        vc1 = sketch_instance.color(67, 137, 162, 230); //bg
        vc2 = sketch_instance.color(92, 37, 141, 150); //lines
    }   
}

var s = function(sketch)
{
    sketch_instance = sketch
    sketch_instance.preload = function()
    {
        // sound = sketch.loadSound(
        //     song_info.audio, //resource to load
        //     function(s) // callback function for success
        //     {
        //         s.setVolume(1.0);
        //         s.play();
        //     }, 
        //     function(e){alert(e)} // callback function for error
        // );
        vinyl = sketch_instance.loadImage('/img/vinyldisc.png');
        albumart = sketch_instance.loadImage(song_info.cover);
    }

    sketch_instance.setup = function()
    {
        //HTML overlay

        //canvas
        var cnv = sketch_instance.createCanvas($('#player-section').width(), $('#player-section').height());
        sketch_instance.frameRate(30);
        cnv.parent('player-section');
        x_offset = (sketch_instance.width - (sketch_instance.height*scale_const)*1.5)/2;
        sketch_vis_colors();
        cx = cnv.position().x;
        cy = cnv.position().y;
        vis = new Visualiser();
        vis.last_frame = sketch.get(vis.zx,vis.zy+1,vis.w,vis.h-vis.speed);
        draw_HTML_overlay();
    }

    // called every frame
    sketch.draw = function()
    {
        // this function changes on certain events
        // console.log(sketch.frameRate());
        draw_function();
    }

    sketch.windowResized = function()
    {
        sketch.resizeCanvas($('#player-section').width(), $('#player-section').height());
    }
}

