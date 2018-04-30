'use strict';
function initial_place_buttons()
{
    var fave_and_next_buttons_container = sketch_instance.createElement(
        'span'
    );
    fave_and_next_buttons_container.style('line-height', '1');

    var fave_button = sketch_instance.createElement('i');
    fave_button.addClass('fas');
    fave_button.addClass('fa-heart');
    fave_button.id('main-fave-button');
    fave_button.attribute('aria-hidden', 'true');
    fave_button.style('margin-right', '15px');
    $("#main-fave-button").on('click', function()
        {
            favourite(song_info.id);
        }
    )
    fave_button.parent(fave_and_next_buttons_container);

    var next_track_button = sketch_instance.createElement('i');
    next_track_button.addClass('fas');
    next_track_button.addClass('fa-step-forward');
    next_track_button.attribute('aria-hidden', 'true');
    next_track_button.id('next-song-button');
    next_track_button.parent(fave_and_next_buttons_container);
    $('#next-song-button').click(
        function () {next(false);}
    );

    fave_and_next_buttons_container.parent('player-section');
    fave_and_next_buttons_container.id('action-buttons-div');
    fave_and_next_buttons_container.size(sketch_instance.height*scale_const*0.07*1.68+70, fave_button.size().height);
    var dx = cx + sketch_instance.width - fave_and_next_buttons_container.size().width - x_offset + 20;
    var dy = cy + sketch_instance.height - fave_and_next_buttons_container.size().height - sketch_instance.height*(1-scale_const)/2;
    fave_and_next_buttons_container.position(dx, dy);
}

function place_song_info()
{
    var song_info_div = sketch_instance.createElement('div');
    song_info_div.id('song-info-div');
    song_info_div.parent('player-section');
    song_info_div.position(
        cx + x_offset + sketch_instance.height*scale_const + 15,
        cy + (sketch_instance.height*(1-scale_const)/2)
    );
    song_info_div.size(
        sketch_instance.width - (cx + x_offset + sketch_instance.height*scale_const + 15) - x_offset,
        sketch_instance.height*scale_const);
    var fave_and_next_buttons_container = sketch_instance.select('#action-buttons-div');
    fave_and_next_buttons_container.style('z-index', '100000');
    var song_info_div = $('#song-info-div');
    song_info_div.append(
        '<div class="row">' +
            '<div class="col">' +
                '<h1 id="track-title" class="text-center">' + song_info.title + '</h1>' +
                '<h3 id="artist-and-year" class="text-center">' + song_info.artist + ' | ' + song_info.album + ' (' + song_info.year + ')' + '<h3>' +
            '</div>' +
        '</div>' + 
        '<div class="row score-and-author">' +
            '<div class="col-6">' +
                '<img id="pitchfork-logo" src="img/pitchfork.png">' +
                '<span class="">' + song_info.reviewDate + ' – ' + song_info.reviewAuthor + '</span>' +
            '</div>' +
            '<div class="col-6">' +
                '<div class="review-score-container"><div class="review-score">' + song_info.criticScore + '</div></div>' +
            '</div>' +
        '</div>' +
        '<div class="row"><div class="col">' +
            '<div class="col" id="review-snippet-container">' + '<a href="' + song_info.reviewURL + '"><p>' + song_info.reviewSnippet + '</p></a>' + '</div>' +
        '</div></div>'+
        '<div class="row" id="spotify-and-play-links-container">' +
            '<div id="spotify-and-play-links-div">' +
                '<a href="' + song_info.spotifyLink + '"><img id="spotify-link" src="img/spotify.png"></a>' +
                '<a href="' + song_info.googlePlayLink + '"><img id="play-link" src="img/play_music_triangle.png"></a>' +
            '</div>' +
        '</div>'
    )
}