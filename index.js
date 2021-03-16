$(function () {

  // When click on accordion menu, toggle "+" to "-" (or "-" to "+")
  $(".collapse-btn").on("click", function () { // "click" function will occur when click the element what has "collapse-btn" class.
    $(this).toggleClass("plus"); //in here, "this"($(this)) means the element what has "collapse-btn" class.  "toggleClass" function will return opposition class, if the element has(does not have) "List" class, it will remove(add) "List"class. 
    if ($(this).hasClass("plus") == true) { // "hasClass" function will decide that the element what has "collapse-btn" has the "plus" class. if it has, hasClass will return "true", or will return "false".
      $(this).find(".toggle-plus").html("<i class='fa fa-plus'></i>"); // "find" function selects the children element what has "toggle-plus" class of "this($(this))" element.  
    } else {
      $(this).find(".toggle-plus").html("<i class='fa fa-minus'></i>");
    }
  });



  $(".back").on("click", function (e) {
    var index = $(e.target).parents(".tab").attr("id"); // "$(e.target)" means the element that selected when click mouse left button. "parents(".tab")" selects the elements that has "tab" class among the parents element of "$(e.target)". "attr("id")" function select the "id" attribute value of the element of selected.  
    $(".tab").removeClass("tab-active"); // "removeClass" function deletes the "tab-active" class within the elements that have "tab" class. 
    switch (index) { //"Switch" statement is multi conditions statement.
      case "artist": // in case that value "index" is equal "artist".
        $("#tag").addClass("tab-active"); //$("#tag"), it does mean the element that id attribute is "tag".
        break; // Here, the case that index is "artist" will be finished by "break;".
    }
  });

  $(".card-body").not($("#artist .card-body")).addClass("hide_scrollbar");
  $(".card-body").not($("#artist .card-body")).removeClass("show_scrollbar");
  $(".card-body").on("mouseenter", function () { // "mouseenter" function will occur when mouse cursor entrances on all of the elements that has "card-body" class.
    $(this).not($("#artist .card-body")).removeClass("hide_scrollbar");
    $(this).not($("#artist .card-body")).addClass("show_scrollbar");
  });
  $(".card-body").on("mouseleave", function () { //"mouseleave" function will occur when mouse cursor leaves on all of the elements that has "card-body" class.
    $(this).not($("#artist .card-body")).removeClass("show_scrollbar");
    $(this).not($("#artist .card-body")).addClass("hide_scrollbar");
  });

  $(".show_more").on("click", function () {
    $("#biography").toggleClass("less");
    $(this).html(($(".show_more").html() == "Show more" ? "Show less" : "Show more"));
    // "$(".show_more").html() == "Show more" ? "Show less" : "Show more")", it is three condition statement. if the content of element that has "show_more" class is "Show more", the content of element that has show_more class will be "Show less", and else, the content of element that has show_more class will be "Show more".
    // In here, "html()" function is the content of the assigned element. etc, here, "html()" means the content of element that has "show_more" class. 
  });

  // Top Tags
  $.getJSON("http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=5dfeb6705c9ca65211c0f757ef00bd0a&format=json", function (json) {
    // Above API is to get the top tags of genre.
    // This is the part for API communication.
    // "$.getJSON" function will bring the JSON data via "http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=5dfeb6705c9ca65211c0f757ef00bd0a&format=json" API.
    // The JSON data will include some data such as "artist name", "the count of listeners" and so on. But the returned JSON data will be changed by the API.
    var html = '';
    $.each(json.toptags.tag, function (i, item) {
      // "$.each()" function is loop statement.
      // json.toptags.tag is the array of JSON data.
      // "item" will take every item of json.toptags.tag array by "$.each()" loop statement.
      // etc... item will take the value such as "{name: "hardcore", count: 692880, reach: 97240}" 
      // in that case, "item" is also JSON data. So you can select the item of JSON data such as below. (item.name, item.count)
      html += '<a class="dropdown-item py-3" name="' + item.name + '">' + item.name + " (" + item.count + ') <span class="mx-3 d-none spinner"><i class="fa fa-spinner fa-fw fa-lg"></i></span></a>';
    });
    $('#tag_list').html(html);
    $("#tag_accordion .toggle-plus").html("<i class='fa fa-minus'></i>");
    // just above code, $("#tag_accordion .toggle-plus") means the element that has "toggle-plus" class within the element that id attribute of element is "tag_accordion".
    // html("<i class='fa fa-minus'></i>"), it means that the content of the $("#tag_accordion .toggle-plus") element will be "<i class='fa fa-minus'></i>".
    // I used this part to change the "+" icon to "-" icon when click on accordion.
  });

  // Get Top Artist
  $("#tag_list").on("click", function (e) {
    var name = $(e.target).attr("name");
    // $(e.target).children(".spinner").removeClass("d-none");
    // $(e.target).find(".fa-spinner").addClass("fa-spin");
    // When clicking the tag on tag selection page, I used above code to display the live loading icon. 
    $.getJSON("http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=" + name + "&api_key=5dfeb6705c9ca65211c0f757ef00bd0a&format=json", function (json) {
      // Above API is to get the top artists within specific tag of genre.
      var html = '';
      var count_listener = "";
      $.each(json.topartists.artist, function (i, item) {
        if (i < 50) {
          // $.ajax({
          //   url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + item.name + "&api_key=5dfeb6705c9ca65211c0f757ef00bd0a&format=json",
          //   // There are several method to get JSON data via API.
          //   // I used this part to apply asynchronous API communication.
          //   // Why should I apply asynchronous?
          //   // It is why the next statement has to be executed after completing the just before statement.
          //   type: "GET",
          //   // It means it will get the data by "GET" method. And, there is also "POST" method to get the data via API
          //   async: false,
          //   // This is the asynchronous part, if "async" is false, asynchronous, else if "async" is true, synchronous
          //   success: function (json) {
          //     count_listener = json.artist.stats.listeners;
          //     $(".spinner").find(".fa-spinner").removeClass("fa-spin");
          //     $(".spinner").addClass("d-none");
          //     // When clicking the tag on tag selection page, I used above code to display the live loading icon. 
          //   }
          // });
          html += '<div class="d-flex justify-content-between" id="row_' + item.name + '"><a class="text-dark dropdown-item artist py-3"><span class="artist_name_tag">' + item.name + "</span><span>" + count_listener + '</span> </a><span class="m-3 song_item text-danger" id="' + item.name + '"  data-toggle="modal" data-target="#song_list"><span class="p-2"><i class="fa fa-music fa-lg"></i></span></span></div>';
        }
      });
      $('.artists_list').html(html);
    });
  });
  $(".artists_list").on("click", function (e) {
    if ($(e.target).hasClass("artist") == true || $(e.target).parent().hasClass("artist") == true) {
      var artist = $(e.target).parent().children(".artist_name_tag").html();
      if ($(e.target).hasClass("artist") == true) {
        artist = $(e.target).children(".artist_name_tag").html();
      }
      var artist_name = "";
      var biography = "";
      var images = "";
      var similar = "";
      var slide_mark = "";
      var tags = "";
      var tracks = "";
      var albums = "";
      $.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=5dfeb6705c9ca65211c0f757ef00bd0a&format=json", function (json) {
        // Above API is to get the info of artists. I used this API to get the images of artists
        artist_name = json.artist.name;
        console.log("Artist", json);
        biography = json.artist.bio.content;
        $.each(json.artist.image, function (i, temp) {
          temp = JSON.parse(JSON.stringify(temp).replace("#", ""));
          images += '<div class="carousel-item"><img class="d-block w-100" src="' + temp.text + '" alt="First slide"></div>';
          slide_mark += '<li data-target="#artists_image" data-slide-to="' + i + '"></li>';
        });
        $.each(json.artist.similar.artist, function (i, similar_temp) {
          similar += "<a class='text-dark dropdown-item similar_item py-3' href='" + similar_temp.url + "' target='_blank'>" + similar_temp.name + "</a>";
        });
        $.each(json.artist.tags.tag, function (i, tag_temp) {
          tags += "<a class='text-dark dropdown-item tag_item py-3' href='" + tag_temp.url + "' target='_blank'>" + tag_temp.name + "</a>";
        });
        $("#artist_name").html(artist_name);
        $("#biography").html(biography);
        $("#similar_list").html(similar);
        $("#associated_list").html(tags);
        $("#album_list").html();
        $("#artists_image .carousel-inner").html(images);
        $("#artists_image .carousel-indicators").html(slide_mark);
        $("#artists_image .carousel-item:eq(0)").addClass("active");
        $("#artistS_image .carousel-indicators li:eq(0)").addClass("active");
      });
      //  Artist Album
      $.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artist + "&api_key=5dfeb6705c9ca65211c0f757ef00bd0a&format=json", function (json) {
        //Above API is to get the top album list of specific artist.
        $.each(json.topalbums.album, function (i, album_temp) {
          var images;
          if (i < 10) {
            $.each(album_temp.image, function (i, temp) {
              images = JSON.parse(JSON.stringify(temp).replace("#", ""));
              // JSON.stringify(temp), this will convert the JSON array to json string.
              // replace("#", ""), this replace the "#" to blink letter within string.
              // JSON.parse(), this will convert the json string to json array.
              // Why used?
              //   This result JSON of API will be got such as "{size: "small", #text: "https://lastfm.freetls.fastly.net/i/u/34s/7d79c517b44e43e2b14b7e808c863577.png"}" 
              //   If the json array includes the special letter such as "#", "?", "/"..., nobody can select the element (etc, size, or text).
              //   Therefore it is needed that I have to remove the "#" letter.
              //   So I removed using "JSON.parse(JSON.stringify(temp).replace("#", ""))".
              //   After that, I can select "text" item within json array.
            });
            albums += '<div class="tag_item_image ml-3"><a href="' + album_temp.url + '" target="_blank"><img src="' + images.text + '" class="img-fluid img-thumbnail mx-auto" alt="' + i + '"></a><div class="album_name_footer text-center"><a class="text-primary" target="_blank" href="' + album_temp.url + '">' + album_temp.name + '</a> (' + album_temp.playcount + ')</div></div>';
          }
        });
        $("#artist_album_list").html(albums);
      });
      $.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artist + "&api_key=5dfeb6705c9ca65211c0f757ef00bd0a&format=json", function (json) {
        // Above API is to get the top tracks of specific artist.
        $.each(json.toptracks.track, function (i, temp) {
          if (i < 10) {
            tracks += "<a class='text-dark dropdown-item py-3' href='" + temp.url + "' target='_blank'>" + temp.name + "( " + temp.listeners + ") </a><div class='progress mx-3' style='height: 15px'><div class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='" + Number(temp.listeners) / 20000 + "' aria-valuemin='0' aria-valuemax='100' style='width: " + Number(temp.listeners) / 20000 + "%'></div></div>";
            // I used to display the progress-bar of tracks of specific artist.
          }
        });
        $("#tracks_list").html(tracks);
      });
      $(".tab").removeClass("tab-active");
      $("#artist").addClass("tab-active");
    } else if ($(e.target).parents("span").hasClass("song_item") == true) {
      var artist = $(e.target).parents(".song_item").siblings(".artist").find(".artist_name_tag").html();
      // within above code, what's mean "siblings"?
      // It does mean the same level element with $(e.target).parents(".song_item")
      // please refer this url "https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_traversing_siblings"
      var album = "";
      var n = 0;
      $.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artist + "&api_key=5dfeb6705c9ca65211c0f757ef00bd0a&format=json", function (json) {
        // Above API used to get the top albums of the specific artist.
        $.each(json.topalbums.album, function (i, temp) {
          if (n < 10) {
            n++;
            album += "<a class='text-dark album_item dropdown-item py-3' >" + temp.name + "</a>";
          }
        });
        $(".album_content").addClass("d-none");
        $("#song_list .album_list").html(album);
        $("#artist_name_album").html(artist);
        $("#album_name").html("");
        $("#playcount").html("");
        $("#listener").html("");
        $("#album_tags").html("");
        $("#album_tracks").html("");
        $("#album_summary").html("");
        $("#album_image .carousel-inner").html("");
      });
    }
  });

  $(".modal_close").on("click", function () {
    $(".tab").removeClass("tab-active");
    $("#tag").addClass("tab-active");
  });

  // Album Item click
  $(".album_list").on("click", function (e) {
    if ($(e.target).hasClass("album_item") == true) {
      var album_name = $(e.target).html();
      var artist_name = $("#artist_name_album").html();
      var images = "";
      var slide_indicator = ""
      var album_tags = "";
      var album_tracks = "";
      $.getJSON("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=5dfeb6705c9ca65211c0f757ef00bd0a&artist=" + artist_name + "&album=" + album_name + "&format=json", function (json) {
        // Above API used to get the info of the specific album.
        $.each(json.album.image, function (i, temp) {
          temp = JSON.parse(JSON.stringify(temp).replace("#", ""));
          images += '<div class="carousel-item album_carousel_item"><img class="d-block w-100" src="' + temp.text + '" alt="First slide"></div>';
          slide_indicator += '<li data-target="#album_image" data-slide-to="' + i + '"></li>';
        });
        $.each(json.album.tags.tag, function (i, tags_temp) {
          console.log(tags_temp)
          album_tags += "<a class='text-dark dropdown-item album_tag_item py-3' href='" + tags_temp.url + "' target='_blank'>" + tags_temp.name + "</a>";
        });
        $.each(json.album.tracks.track, function (i, tracks_temp) {
          album_tracks += "<a class='text-dark dropdown-item album_tracks_item py-3' href='" + tracks_temp.url + "' target='_blank'>" + tracks_temp.name + "</a>";
        });
        $(".album_content").removeClass("d-none");
        $("#album_name").html(json.album.name);
        $("#playcount").html(json.album.playcount);
        $("#album_summary").html((json.album.wiki ? json.album.wiki.summary : "No summary"));
        $("#listener").html(json.album.listeners);
        $("#album_tags").html(album_tags);
        $("#album_tracks").html(album_tracks);
        $("#album_image .carousel-inner").html(images);
        $("#album_image .carousel-indicators").html(slide_indicator);
        $(".album_carousel_item:eq(0)").addClass("active");
        $("#album_summary a").attr("target", "_blank");
      });
    }
  });

});