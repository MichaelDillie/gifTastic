$(document).ready(function () {

    var gifArray = ["cat", "dog", "hamster", "duck", "mouse", "pig", "rabbit", "frog", "fox", "tiger", "bear", "lizard"];

    var gifBtnRow = $(".gif-btn-row");


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

    var clickableBtn = $(".gif-btn");

    clickableBtn.on("click", function () {
        var gifValue = $(this).attr("data-gifvalue");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifValue + "&api_key=5lOCeJsh28VZ18MUoQMrmIXxQmHUEdrX"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var result = response.data;
            console.log(queryURL);
        });


    });




});