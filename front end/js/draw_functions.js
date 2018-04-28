'use strict';
function rotate_and_draw_vinyl()
{
    // calculate cos and sin for rotating the record
    var angle = sketch_instance.millis()*0.0005;
    var cos_a = sketch_instance.cos(angle);
    var sin_a = sketch_instance.sin(angle);

    // albumart (inside the vinyl) image placement & translation
    // instead of positioning the images manually, use transform
    // it works nicer with applyMatrix than using a typical x and y
    sketch_instance.translate(x_offset + vinyl_offset + (sketch_instance.height*scale_const), sketch_instance.height/2);
    sketch_instance.applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0);
    sketch_instance.imageMode(sketch_instance.CENTER);
    sketch_instance.image(albumart, 0, 0, sketch_instance.height*scale_const*0.6, sketch_instance.height*scale_const*0.6);

    // reset the matrix to prevent it from chaining
    sketch_instance.resetMatrix();
    // do the same again for the vinyl image
    sketch_instance.translate(x_offset + vinyl_offset + (sketch_instance.height*scale_const), sketch_instance.height/2);
    sketch_instance.applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0);
    sketch_instance.imageMode(sketch_instance.CENTER);
    sketch_instance.image(vinyl, 0, 0, sketch_instance.height*scale_const*0.95, sketch_instance.height*scale_const*0.95);
    // again, reset the matrix to prevent chaining
    sketch_instance.resetMatrix();
}

function unliked_draw()
{
    // console.log('Inside the unliked_draw method');
    // clear the canvas
    sketch_instance.clear();

    rotate_and_draw_vinyl();

    // draw the sleeve
    sketch_instance.fill(240); // off-white
    sketch_instance.noStroke();
    sketch_instance.rect(x_offset, (sketch_instance.height - (sketch_instance.height*scale_const))/2, sketch_instance.height*scale_const, sketch_instance.height*scale_const);
    sketch_instance.fill(vc1); // genre's light color
    // background for the visualiser
    sketch_instance.rect(vis.zx, vis.zy, vis.w, vis.h);
    sketch_instance.noSmooth(); // prevents image degrading over time for the visualiser
    sketch_instance.imageMode(sketch_instance.CORNER);
    // draw the last frame from the visualiser at a vertical offset
    sketch_instance.image(vis.last_frame, vis.zx, vis.zy+vis.speed+1);
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
    // console.log('inside liked_transition_draw method');
    sketch_instance.clear(); // clear the canvas

    rotate_and_draw_vinyl();

    // draw the sleeve
    sketch_instance.fill(240); // off-white
    sketch_instance.noStroke();
    sketch_instance.rect(x_offset, (sketch_instance.height - (sketch_instance.height*scale_const))/2, sketch_instance.height*scale_const, sketch_instance.height*scale_const);
    sketch_instance.fill(vc1); // genre's light color
    // background for the visualiser
    sketch_instance.rect(vis.zx, vis.zy, vis.w, vis.h);
    sketch_instance.noSmooth(); // prevents image degrading over time for the visualiser
    sketch_instance.imageMode(sketch_instance.CORNER);
    // draw the last frame from the visualiser at a vertical offset
    sketch_instance.image(vis.last_frame, vis.zx, vis.zy+vis.speed+1);

    // if the slide-to-the-left animation is still going
    if (moving)
    {
        // reduce the x_offset
        x_offset -= 10;
        // if the offset has been reduced to the desired amount
        if (x_offset <= (sketch_instance.width - (sketch_instance.height*scale_const)*1.5)/4)
        {
            // stop moving
            moving = false;
        }
        // refresh the visualiser's offset
        vis.zx = x_offset + vis.x_off;
        // draw the last frame of the visualiser
        sketch_instance.noSmooth();
        sketch_instance.imageMode(sketch_instance.CORNER);
        sketch_instance.image(vis.last_frame, vis.zx, vis.zy+vis.speed+1);
        var fave_and_next_buttons_container = sketch_instance.select('#action-buttons-div');
        fave_and_next_buttons_container.position(cx + sketch_instance.width - fave_and_next_buttons_container.size().width - x_offset);
        
    }
    // if the vinyl isn't completely inside the sleeve yet
    if (!(x_offset + vinyl_offset + (sketch_instance.height*scale_const) - sketch_instance.height*scale_const/2 <= (sketch_instance.width - (sketch_instance.height*scale_const)*1.5)/4))
    {
        // reduce the vinyl's offset
        vinyl_offset -= 10;
    }
    else if (liked & !(x_offset + vinyl_offset + (sketch_instance.height*scale_const) - sketch_instance.height*scale_const/2 >= (sketch_instance.width - (sketch_instance.height*scale_const)*1.5)/4))
    {
        // change the draw_function to the one that reveals the albumart and reviews etc.
        albumart_reveal_opacity = 1;
        draw_function = liked_reveal_draw;
    }
}

function liked_reveal_draw()
{
    // console.log('inside liked_reveal_draw method');
    if (albumart_reveal_opacity == 1)
    {
        place_song_info();
    }
    sketch_instance.tint(255, albumart_reveal_opacity);
    albumart_reveal_opacity += 1;
    sketch_instance.smooth();
    sketch_instance.image(albumart, vis.zx, vis.zy, vis.w, vis.h);
}

function next_track_reset_draw()
{
    // console.log('inside next_track_reset_draw method');
    sketch_instance.noTint();
    sketch_instance.clear(); // clear the canvas

    rotate_and_draw_vinyl();

    // draw the sleeve
    sketch_instance.fill(240); // off-white
    sketch_instance.noStroke();
    sketch_instance.rect(x_offset, (sketch_instance.height - (sketch_instance.height*scale_const))/2, sketch_instance.height*scale_const, sketch_instance.height*scale_const);
    sketch_instance.fill(vc1); // genre's light color
    // background for the visualiser
    sketch_instance.rect(vis.zx, vis.zy, vis.w, vis.h);
    sketch_instance.noSmooth(); // prevents image degrading over time for the visualiser
    sketch_instance.imageMode(sketch_instance.CORNER);
    // draw the last frame from the visualiser at a vertical offset
    sketch_instance.image(vis.last_frame, vis.zx, vis.zy+vis.speed+1);

    // if the slide-to-the-left animation is still going
    if (moving)
    {
        // reduce the x_offset
        x_offset += 10;
        // if the offset has been increased to the desired amount
        if (x_offset >= (sketch_instance.width - (sketch_instance.height*scale_const)*1.5)/2) // TODO change this
        {
            // stop moving
            moving = false;
        }
        // refresh the visualiser's offset
        vis.zx = x_offset + vis.x_off;
        // draw the last frame of the visualiser
        sketch_instance.noSmooth();
        sketch_instance.imageMode(sketch_instance.CORNER);
        sketch_instance.image(vis.last_frame, vis.zx, vis.zy+vis.speed+1);
        var fave_and_next_buttons_container = sketch_instance.select('#action-buttons-div');
        fave_and_next_buttons_container.position(cx + sketch_instance.width - fave_and_next_buttons_container.size().width - x_offset + 20);
        
    }
    // if the vinyl isn't half out of the sleeve yet
    if (!(vinyl_offset >= 0))
    {
        // reduce the vinyl's offset
        vinyl_offset += 10;
    }
    else if (vinyl_offset >= 0)
    {
        // change the draw_function to the one that reveals the albumart and reviews etc.
        draw_function = unliked_draw;
        // sound.stop();
        // sound = sketch_instance.loadSound(
        //                 song_info.audio, //resource to load
        //                 function(s) // callback function for success
        //                 {
        //                     s.setVolume(1.0);
        //                     s.play();
        //                 }, 
        //                 function(e){alert(e)} // callback function for error
        //             );
        // vis = new Visualiser();
        // vis.last_frame = sketch_instance.get(vis.zx,vis.zy+1,vis.w,vis.h-vis.speed);
    }
}