$(document).ready(function () {

    var topic = [];
    console.log(topic);

    function alertButtonName() {
        var buttonName = $(this).attr("data-name");
        console.log(buttonName);
    }

    function renderButtons() {
        $("#animal-buttons").empty();

        for (var i = 0; i < topic.length; i++) {
            var a = $("<button>");
            a.addClass("animal");
            a.attr("data-name", topic[i]);
            a.text(topic[i]);
            $("#animal-buttons").append(a);
        }
    }

    function printContent() {
        // ajax request //
        // get the value of each search button //
        var searchButton = $("#animal-input").val().trim();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ searchButton + "&rating=g&limit=10&api_key=hLPYWYDEpQZnBsi00hCOVXUInzk3asNh";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // var response.data[i] = response.data;
            for (var i = 0; i < response.data.length; i++) {
                var genGif = $("<div>");
                genGif.addClass("gifContent");
                // rating printing //
                var rating = response.data[i].rating;
                var pOne = $("<p>").text("Rating: " + rating);
                console.log(rating);
                genGif.append(pOne);
                // source printing //
                var source = response.data[i].source;
                var pTwo = $("<p>").text("Source: " + source);
                console.log(source);
                genGif.append(pTwo);
                // caption printing //
                var caption = response.data[i].caption;
                var pThree = $("<p>").text(caption);
                console.log(caption);
                genGif.append(pThree);
                // getting the gif //
                var stillURL = response.data[i].images.fixed_height_still.url;
                var animURL = response.data[i].images.fixed_height.url;
                var gif = $("<img class='actualGif'>");
                gif.attr("src", stillURL);
                gif.attr("data-still", stillURL);
                gif.attr("data-animate", animURL);
                gif.attr("data-state", 'still');
                genGif.append(gif);
                // prepending the entire thing to the div //
                $("#animals-gif").prepend(genGif);
            }
        })
    }


    $("#addAnimal").on("click", function (event) {
        event.preventDefault();
        var userInput = $("#animal-input").val().trim();
        topic.push(userInput);
        console.log(topic);
        renderButtons();
    })

    $(document).on("click", ".animal", function () {
        printContent();
        alertButtonName();
        
    });

    $(document).on("click", ".actualGif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    renderButtons();




});
