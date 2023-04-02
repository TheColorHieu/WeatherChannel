//things to do 
//create a button with a function 
//build a history function 
//impliment api 

//creating the search button 
$(document).ready(function() {
//getting the value to search 
$("search-button").on("click", function(){
    var searchTerm = $("#search-value").val();
    //empty input field
$("#search-value").val("");    
    weatherFunction(searchTerm);
    weatherForecast(searchTerm);
});

//search button enter key feature
$("#search-button").keypress(function(event){
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
        url: "https://api.openweathermap.org/data/2.5/forecast?lat" + searchTerm + "lat={lat}&lon={lon}&appid=e9a2983c2714f2ea8438474602154f62"
    })
}


})