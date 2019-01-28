//HW 6

$( document ).ready(function() {
    addButtonClickHandlers();
});

function addButtonClickHandlers() {

    $("button").on("click", function () {
        var animal = $(this).attr("data-animal");
        console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=iWFqxQuZkE6oHPuKkMn9eDziKNifaHff&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var results = response.data;

            $("#gifs").html("");

            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");
                var p = "Rating: " + results[i].rating;
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("class", "gif");
                animalImage.attr("title", p);
                animalDiv.append(animalImage);
                $("#gifs").prepend(animalDiv);
            }

            addGifClickHandler();

        });
    });
}

function addGifClickHandler() {
    
    $(".gif").on("click", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }

    });

}

$("#add-animal").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var animalButton = $("#anyInput").val().trim();
    var a = $("<button>");
    // Adding a data-attribute
    a.attr("data-animal", animalButton);
    // Providing the initial button text
    a.text(animalButton);
    // Adding the button to the buttons-view div
    $("#buttons").append(a);
    // Clear the textbox when done
    $("#anyInput").val("");

    addButtonClickHandlers();
});

