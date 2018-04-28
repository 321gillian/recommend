function rotate_and_draw_vinyl(sketch)
{
    // calculate cos and sin for rotating the record
    var angle = sketch.millis()*0.0005;
    var cos_a = sketch.cos(angle);
    var sin_a = sketch.sin(angle);

    // albumart (inside the vinyl) image placement & translation
    // instead of positioning the images manually, use transform
    // it works nicer with applyMatrix than using a typical x and y
    sketch.translate(x_offset + vinyl_offset + (sketch.height*scale_const), sketch.height/2);
    sketch.applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0);
    sketch.imageMode(sketch.CENTER);
    sketch.image(albumart, 0, 0, sketch.height*scale_const*0.6, sketch.height*scale_const*0.6);

    // reset the matrix to prevent it from chaining
    sketch.resetMatrix();
    // do the same again for the vinyl image
    sketch.translate(x_offset + vinyl_offset + (sketch.height*scale_const), sketch.height/2);
    sketch.applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0);
    sketch.imageMode(sketch.CENTER);
    sketch.image(vinyl, 0, 0, sketch.height*scale_const*0.95, sketch.height*scale_const*0.95);
    // again, reset the matrix to prevent chaining
    sketch.resetMatrix();
}

function unliked_draw(sketch)
{
    // clear the canvas
    sketch.clear();

    rotate_and_draw_vinyl(sketch);

    // draw the sleeve
    sketch.fill(240); // off-white
    sketch.noStroke();
    sketch.rect(x_offset, (sketch.height - (sketch.height*scale_const))/2, sketch.height*scale_const, sketch.height*scale_const);
    sketch.fill(vc1); // genre's light color
    // background for the visualiser
    sketch.rect(vis.zx, vis.zy, vis.w, vis.h);
    sketch.noSmooth(); // prevents image degrading over time for the visualiser
    sketch.imageMode(sketch.CORNER);
    // draw the last frame from the visualiser at a vertical offset
    sketch.image(vis.last_frame, vis.zx, vis.zy+vis.speed+1);
    // if the like/fave button hasn't yet been clicked
    if (!liked & !moving)
    {
        // draw the next line for the visualiser
        vis.show()
    }
    // if the track has been liked, change the draw_function to start transitioning
    if (liked)
    {
        moving = true;
        draw_function = liked_transition_draw;        
    }
}

function liked_transition_draw(sketch)
{
    sketch.clear(); // clear the canvas

    rotate_and_draw_vinyl(sketch);

    // draw the sleeve
    sketch.fill(240); // off-white
    sketch.noStroke();
    sketch.rect(x_offset, (sketch.height - (sketch.height*scale_const))/2, sketch.height*scale_const, sketch.height*scale_const);
    sketch.fill(vc1); // genre's light color
    // background for the visualiser
    sketch.rect(vis.zx, vis.zy, vis.w, vis.h);
    sketch.noSmooth(); // prevents image degrading over time for the visualiser
    sketch.imageMode(sketch.CORNER);
    // draw the last frame from the visualiser at a vertical offset
    sketch.image(vis.last_frame, vis.zx, vis.zy+vis.speed+1);

    // if the slide-to-the-left animation is still going
    if (moving)
    {
        // reduce the x_offset
        x_offset -= 10;
        // if the offset has been reduced to the desired amount
        if (x_offset <= (sketch.width - (sketch.height*scale_const)*1.5)/4)
        {
            // stop moving
            moving = false;
        }
        // refresh the visualiser's offset
        vis.zx = x_offset + vis.x_off;
        // draw the last frame of the visualiser
        sketch.noSmooth();
        sketch.imageMode(sketch.CORNER);
        sketch.image(vis.last_frame, vis.zx, vis.zy+vis.speed+1);
        var fave_and_next_buttons_container = sketch.select('#action-buttons-div');
        fave_and_next_buttons_container.position(cx + cnv.width - fave_and_next_buttons_container.size().width - x_offset);
        
    }
    // if the vinyl isn't completely inside the sleeve yet
    if (!(x_offset + vinyl_offset + (sketch.height*scale_const) - sketch.height*scale_const/2 <= (sketch.width - (sketch.height*scale_const)*1.5)/4))
    {
        // reduce the vinyl's offset
        vinyl_offset -= 5;
    }
    else if (liked & !(x_offset + vinyl_offset + (sketch.height*scale_const) - sketch.height*scale_const/2 >= (sketch.width - (sketch.height*scale_const)*1.5)/4))
    {
        // change the draw_function to the one that reveals the albumart and reviews etc.
        draw_function = liked_reveal_draw;
    }
}

function liked_reveal_draw(sketch)
{
    if (albumart_reveal_opacity == 1)
    {
        place_song_info(sketch);
    }
    sketch.tint(255, albumart_reveal_opacity);
    albumart_reveal_opacity += 1;
    sketch.smooth();
    sketch.image(albumart, vis.zx, vis.zy, vis.w, vis.h);
}