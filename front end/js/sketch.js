var scale_const = 0.8;
var x_offset;
function setup()
{
    var cnv = createCanvas($('#player-section').width(), $('#player-section').height());
    cnv.parent('player-section');
    console.log(width, height);
    x_offset = (width - (height*scale_const)*1.5)/2;
}

function draw()
{
    // background(51, 100);
    clear();
    // noSmooth();
    noStroke();
    fill(0);
    ellipseMode(CORNER);
    ellipse((x_offset + (height*scale_const)/2), (height - (height*scale_const))/2, height*scale_const);
    noStroke();
    fill(240);
    rect(x_offset, (height - (height*scale_const))/2, height*scale_const, height*scale_const);
    // console.log(height-200, height-200);
    // noLoop();
}