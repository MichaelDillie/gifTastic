$(document).ready(function () {

    var gifArray = ["cat", "dog", "hamster", "duck", "mouse", "pig", "rabbit", "frog", "fox", "tiger", "bear", "lizard"];

    var gifBtnRow = $(".gif-btn-row");
    var gifsGoHere = $(".gif-area-row");
    var newAnimal = $("#new-animal");
    var addNewGifBtn = $("#add-new-gif-btn");
    var downloadBtn = $(".download-btn");

    // This function will generate all btns new and old
    function generateBtns() {
        for (var i = 0; i < gifArray.length; i++) {
            var gifBtn = $("<a>");
            gifBtn.addClass("waves-effect waves-light btn gif-btn");
            gifBtn.text(gifArray[i]);
            gifBtn.attr("data-gifvalue", gifArray[i]);
            gifBtnRow.append(gifBtn);
        }
    }
    generateBtns();

    // Will add the button that the user has added
    addNewGifBtn.on("click", function(event) {
        // Checks if input is an empty string
        if(newAnimal.val() === "") {
            (event).preventDefault();
            console.log("No text input");
        } else {
            event.preventDefault();
            gifArray.push(newAnimal.val().trim());
            gifBtnRow.empty();
            generateBtns();
            newAnimal.val("");
        }
    });

    var clickableBtn = $(".gif-btn");
    // When the gif button is clicked this will run the display funciton
    $(document).on("click", ".gif-btn", displpay);

    // Creates the div that will hold GIF and its info
    function displpay() {
        gifsGoHere.empty();
        var gifValue = $(this).attr("data-gifvalue");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifValue + "&api_key=5lOCeJsh28VZ18MUoQMrmIXxQmHUEdrX&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var result = response.data;

            for(var i = 0; i < result.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("display-gif");

                var rating = result[i].rating;

                var actualGif = $("<img>");
                actualGif.addClass("actual-gif");
                actualGif.attr("src", result[i].images.fixed_height_still.url);
                actualGif.attr("data-still", result[i].images.fixed_height_still.url);
                actualGif.attr("data-animate", result[i].images.fixed_height.url);
                actualGif.attr("data-title", result[i].title);
                actualGif.attr("data-state", "still");

                var download = $("<a>");
                download.addClass("waves-effect waves-light btn-small download-btn");
                download.attr("data-url", result[i].images.fixed_height.mp4);
                download.attr("data-title", result[i].title);
                download.text("download");

                var p = $("<p>");
                p.addClass("rating");
                p.text("Rating: " + rating.toUpperCase());

                var title = $("<p>");
                title.addClass("gif-title");
                title.text(result[i].title.toUpperCase());

                var userName = $("<p>");
                userName.addClass("user-name");
                userName.text(result[i].username);

                if(rating === "g" || rating === "pg") {
                    gifDiv.prepend(actualGif);
                    gifDiv.prepend(p);
                    gifDiv.prepend(userName);
                    gifDiv.prepend(title);
                    gifDiv.append(download);
                    gifsGoHere.prepend(gifDiv);
                }
            }
        });
    }
    // Checks if GIF is still or animated
    // Will change to amimated if data-state is still
    $(document).on("click", ".actual-gif", function() {
        var state = $(this).attr("data-state");
        if(state === "still") {
            console.log($(this).attr("data-animate"));
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    });
    // The broken ass download button
    $(document).on("click", ".download-btn", function() {
        console.log("do not get this download BS");
        console.log($(this).attr("data-url"));
        console.log($(this).attr("data-title"));
        // download($(this).attr("data-url"), $(this).attr("data-title"), "video/mp4");
    });
});