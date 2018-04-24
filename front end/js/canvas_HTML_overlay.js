function initial_place_buttons()
{
    fave_and_next_buttons_container = createElement(
        'span'
    );
    fave_and_next_buttons_container.style('line-height', '1');

    fave_button = createElement('i');
    fave_button.addClass('fas');
    fave_button.addClass('fa-heart');
    fave_button.id('main-fave-button');
    fave_button.attribute('aria-hidden', 'true');
    fave_button.style('margin-right', '15px');
    $("#main-fave-button").on('click', function()
        {
            fave_animation();
        }
    )
    fave_button.parent(fave_and_next_buttons_container);

    next_track_button = createElement('i');
    next_track_button.addClass('fas');
    next_track_button.addClass('fa-step-forward');
    next_track_button.attribute('aria-hidden', 'true');
    next_track_button.id('next-track-button');
    next_track_button.parent(fave_and_next_buttons_container);

    fave_and_next_buttons_container.parent('player-section');
    fave_and_next_buttons_container.id('action-buttons-div');
    fave_and_next_buttons_container.size(cnv.height*scale_const*0.07*1.68+50, fave_button.size().height);
    var dx = cx + cnv.width - fave_and_next_buttons_container.size().width - x_offset;
    var dy = cy + cnv.height - fave_and_next_buttons_container.size().height - cnv.height*(1-scale_const)/2;
    fave_and_next_buttons_container.position(dx, dy);
}

function place_song_info()
{
    var song_info_div = createElement('div');
    song_info_div.id('song-info-div');
    song_info_div.parent('player-section');
    song_info_div.position(
        cx + x_offset + height*scale_const + 15,
        cy + (height*(1-scale_const)/2)
    );
    song_info_div.size(
        width - (cx + x_offset + height*scale_const + 15) - x_offset,
        height*scale_const);
    var fave_and_next_buttons_container = select('#action-buttons-div');
    fave_and_next_buttons_container.style('z-index', '100000');
}














var draw_HTML_overlay = initial_place_buttons;