function rotate_and_draw_vinyl()
{
    // calculate cos and sin for rotating the record
    var angle = millis()*0.0005;
    var cos_a = cos(angle);
    var sin_a = sin(angle);

    // albumart (inside the vinyl) image placement & translation
    // instead of positioning the images manually, use transform
    // it works nicer with applyMatrix than using a typical x and y
    translate(x_offset + vinyl_offset + (height*scale_const), height/2);
    applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0);
    imageMode(CENTER);
    image(albumart, 0, 0, height*scale_const*0.6, height*scale_const*0.6);

    // reset the matrix to prevent it from chaining
    resetMatrix();
    // do the same again for the vinyl image
    translate(x_offset + vinyl_offset + (height*scale_const), height/2);
    applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0);
    imageMode(CENTER);
    image(vinyl, 0, 0, height*scale_const*0.95, height*scale_const*0.95);
    // again, reset the matrix to prevent chaining
    resetMatrix();
}

function unliked_draw()
{
    // clear the canvas
    clear();

    rotate_and_draw_vinyl();

    // draw the sleeve
    fill(240); // off-white
    noStroke();
    rect(x_offset, (height - (height*scale_const))/2, height*scale_const, height*scale_const);
    fill(vc1); // genre's light color
    // background for the visualiser
    rect(vis.zx, vis.zy, vis.w, vis.h);
    noSmooth(); // prevents image degrading over time for the visualiser
    imageMode(CORNER);
    // draw the last frame from the visualiser at a vertical offset
    image(vis.last_frame, vis.zx, vis.zy+vis.speed+1);
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

function liked_transition_draw()
{
    clear(); // clear the canvas

    rotate_and_draw_vinyl();

    // draw the sleeve
    fill(240); // off-white
    noStroke();
    rect(x_offset, (height - (height*scale_const))/2, height*scale_const, height*scale_const);
    fill(vc1); // genre's light color
    // background for the visualiser
    rect(vis.zx, vis.zy, vis.w, vis.h);
    noSmooth(); // prevents image degrading over time for the visualiser
    imageMode(CORNER);
    // draw the last frame from the visualiser at a vertical offset
    image(vis.last_frame, vis.zx, vis.zy+vis.speed+1);

    // if the slide-to-the-left animation is still going
    if (moving)
    {
        // reduce the x_offset
        x_offset -= 10;
        // if the offset has been reduced to the desired amount
        if (x_offset <= (width - (height*scale_const)*1.5)/4)
        {
            // stop moving
            moving = false;
        }
        // refresh the visualiser's offset
        vis.zx = x_offset + vis.x_off;
        // draw the last frame of the visualiser
        noSmooth();
        imageMode(CORNER);
        image(vis.last_frame, vis.zx, vis.zy+vis.speed+1);
        var fave_and_next_buttons_container = select('#action-buttons-div');
        fave_and_next_buttons_container.position(cx + cnv.width - fave_and_next_buttons_container.size().width - x_offset);
        
    }
    // if the vinyl isn't completely inside the sleeve yet
    if (!(x_offset + vinyl_offset + (height*scale_const) - height*scale_const/2 <= (width - (height*scale_const)*1.5)/4))
    {
        // reduce the vinyl's offset
        vinyl_offset -= 5;
    }
    else if (liked & !(x_offset + vinyl_offset + (height*scale_const) - height*scale_const/2 >= (width - (height*scale_const)*1.5)/4))
    {
        // change the draw_function to the one that reveals the albumart and reviews etc.
        draw_function = liked_reveal_draw;
    }
}

function liked_reveal_draw()
{
    if (albumart_reveal_opacity == 1)
    {
        place_song_info();
    }
    tint(255, albumart_reveal_opacity);
    albumart_reveal_opacity += 1;
    smooth();
    image(albumart, vis.zx, vis.zy, vis.w, vis.h);
}