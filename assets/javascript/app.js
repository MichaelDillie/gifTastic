$(document).ready(function () {

    var gifArray = ["cat", "dog", "hamster", "duck", "mouse", "pig", "rabbit", "frog", "fox", "tiger", "bear", "lizard"];

    var gifBtnRow = $(".gif-btn-row");
    var gifsGoHere = $(".gif-area-row");
    var newAnimal = $("#new-animal");
    var addNewGifBtn = $("#add-new-gif-btn");

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

    addNewGifBtn.on("click", function(event) {
        event.preventDefault();
        gifArray.push(newAnimal.val().trim());
        gifBtnRow.empty();
        generateBtns();
        newAnimal.val("");
    });

    var clickableBtn = $(".gif-btn");

    $(document).on("click", ".gif-btn", displpay);

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
                // console.log(result[i]);
                var gifSpan = $("<span>");
                gifSpan.addClass("display-gif");

                var rating = result[i].rating;

                var actualGif = $("<img>");
                actualGif.attr("src", result[i].images.fixed_height_still.url);
                actualGif.attr("data-still", result[i].images.fixed_height_still.url);
                actualGif.attr("data-animate", result[i].images.fixed_height.url);
                actualGif.attr("data-state", "still");

                var p = $("<p>");
                p.addClass("rating");
                p.text("Rating: " + rating.toUpperCase());

                if(rating === "g" || rating === "pg") {
                    gifSpan.prepend(actualGif);
                    gifSpan.prepend(p);
                    gifsGoHere.prepend(gifSpan);
                }
            }
        });
    }






});