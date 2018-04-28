$(document).ready(function() {

    var gifArray = ["cat", "dog", "hamster", "duck", "mouse", "pig", "rabbit", "frog", "fox", "tiger", "bear", "lizard"];

    var gifBtnRow = $(".gif-btn-row");


    function generateBtns() {
        for(var i = 0; i <gifArray.length; i++) {
            console.log(gifArray[i]);
            var gifBtn = $("<a>");
            gifBtn.addClass("waves-effect waves-light btn gif-btn");
            gifBtn.text(gifArray[i]);
            gifBtn.attr("data-gifvalue", gifArray[i]);
            gifBtnRow.append(gifBtn);
        }
    }
    generateBtns();

});