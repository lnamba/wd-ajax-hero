(function() {
  'use strict';

  var movies = [];
  var plot = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.attr('id', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE

  $("#search_movies_btn").on("click", function(e){
    // Listen for submissions on the search form. Remember to prevent the default action
    e.preventDefault();
    console.log($("a.btn").get());
    // Validate the user input is not blank
    if ($("#search").val() === "") {
      $("#listings").append("<h2>Please type a keyword to search for.</h2>");
      return false;
    }

    // Clear the previous search results
    $("#search").empty();
    $("#listings").empty();
    movies = [];

    // Send an HTTP request to the [OMDB API](http://omdbapi.com/) search endpoint.
    $.getJSON(`http://www.omdbapi.com/?s=${$("#search").val()}`, function(data){
      console.log(data);

      // Handle the HTTP response by pushing a new, well-formed `movie` object into the global `movies` array.
      data.Search.map(function(i){
        var movieObj = {};
        var plotObj = {};
        movieObj["id"] = i.imdbID;
        movieObj["poster"] = i.Poster;
        movieObj["title"] = i.Title;
        movieObj["year"] = i.Year;
        movies.push(movieObj);
        // // Handle the HTTP response by pushing a new, well-formed JavaScript object into the global `movies` array.
        // plotObj["id"] = i.imdbID;
        // plot.push(plotObj)
      });
      console.log(movies);
      // console.log(plot);

      // Render the `movies` array to the page by calling the `renderMovies()` function with no arguments
      renderMovies();

      $("a.waves-effect.waves-light.btn.modal-trigger").click(function(){
        var movId = $(this).attr('id');
        console.log(`http://www.omdbapi.com/?i=${movId.slice(1)}`)
        $.getJSON(`http://www.omdbapi.com/?i=${movId.slice(1)}`, function(data){
          console.log(data.Plot);
          $("div.modal-content p").empty();
          $("div.modal-content p").append(data.Plot)
        });
      })

      // $("a.waves-effect.waves-light.btn.modal-trigger").click(function(){
      //   console.log($(this).attr('id'))
      //   $.getJSON(`http://www.omdbapi.com/?i=${$(this).attr('id')}`, function(data){
      //     console.log(data.Plot);
      //   });
      //   // $("div.modal-content p").append("test")
      // })

      // $.getJSON(`http://www.omdbapi.com/?i=${$("#search").val()}`, function(data){
      //
      // }
      // plot.map(function(j){
      //
      // });

    });

  });





})();
