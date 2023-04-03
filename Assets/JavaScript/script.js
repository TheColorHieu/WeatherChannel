//things to do 
//create a button with a function 
//build a history function 
//impliment api 

//creating the search button 
$(document).ready(function() {
//getting the value to search 
$("submit").on("click", function(){
    var searchTerm = $("#submit").val();
    console.log("hello world");
    //empty input field
$("#submit").val("");    
    weatherFunction(searchTerm);
    weatherForecast(searchTerm);
});

//search button enter key feature
$("#submit").keypress(function(event){
    console.log("hello world");
var keycode = (event.keyCode ? event.keyCode : event.which);
if(keycode === 13){
    weatherFunction(searchTerm);
    weatherForecast(searchTerm);
}
});

//creating the weather function
function weatherFunction(searchTerm){
    //creating a request to the url 
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?lat" + searchTerm + "&appid=e9a2983c2714f2ea8438474602154f62",

    }).then(function (data) {
        //if index of search value does not exsist
        if(history.indexOf(searchTerm) === -1){
        //were going to save the history in an array
        history.pushState(searchTerm);
        //then were going to save it into a local storage
        localStorage.setItem("history", JSON.stringify(history));
        createRow(searchTerm);
        }
        //clears out old content
        $("#today").empty();

        var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var img = $("<img>").attr("src"," https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        //here we are setting up the variables for the data we are requesting
        var card = $("<div>").addClass("card-body");
        var cardBody = $("<div>").addClass("card");
        var wind = $("<p>").text("Wind Speed : " + data.wind.speed + "MPH");
        var wind = $("<p>").text("Temperature: " + data.main.temp + "F");
        var wind = $("<p>").text("Humidity: " + data.main.humidity + "%");
        console.log(data)
        var long = data.coord.long;
        var lat = data.coord.lat;
        //getting the cordinates 
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=e9a2983c2714f2ea8438474602154f62=" + lat + "&lon=" + long,
        
        }).then(function (response) {
            console.log(response);

            var uvColor;
            var uvResponse = response.value;
            var uvIndex = $("<p>").addClass("card=text").text("UV Index: ");
            var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);

            if (uvResponse < 3) {
                btn.addClass("btn-success");
              } else if (uvResponse < 7) {
                btn.addClass("btn-warning");
              } else {
                btn.addClass("btn-danger");
              }

              cardBody.append(uvIndex);
        $("#today .card-body").append(uvIndex.append(btn));

        });

        //merging and adding it to the page 
        title.append(img);
        cardBody.append(uvIndex);
        $("#today .card-body").append(uvIndex.append(btn));
        console.log(data);

        //creating the weatherForecast function
        function weatherForecast(searchTerm){
            $.ajax({
                type: "GET",
                url : "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=e9a2983c2714f2ea8438474602154f62=imperial",
            }).then(function (data) {
                console.log(data);
                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

                //creating the loop for the 5 days to pull the data 
            for (var i =0; i < data.list.length; i++){
                if(data.list[i]).dt_txt.indexOf("15:00:00") !== -1){
                    var titleFive = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                    var imgFive = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                    var colFive = $("<div>").addClass("col-md-2.5");
                    var cardFive = $("<div>").addClass("card bg-primary text-white");
                    var cardBodyFive = $("<div>").addClass("card-body p-2");
                    var humidFive = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                    var tempFive = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + " °F");

                    //mering together and appending it 
                    colFive.append(cardFive.append(cardBodyFive.append(tittleFive, imgFive, tempFive, humidFive)));
                    //append card, body to card and other elements to the body
                    $("#forecast .row").append(colFive);
                }
            }
            });

        }


    });



})