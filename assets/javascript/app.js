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

    //  This will handel the click on GIF name (When clicked this funciton will add gifs to DOM and display them)
    var clickableBtn = $(".gif-btn");

    $(document).on("click", ".gif-btn", displpay);

    function displpay() {
        var gifValue = $(this).attr("data-gifvalue");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifValue + "&api_key=5lOCeJsh28VZ18MUoQMrmIXxQmHUEdrX"

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
                actualGif.attr("src", result[i].images.fixed_height.url);

                if(rating === "g") {
                    gifSpan.prepend(actualGif);
                    gifsGoHere.prepend(gifSpan);
                }
            }
        });


    }




});