$(document).ready(function(){
    $('#search_results').hide();
    //================================================================================================
                                //Search and Display Weather Info (Section 1)
    //================================================================================================

    $(document).on("click", "#searchLocation", function(event){ //when user clicks the search button
        event.preventDefault(); //prevents the form from submitting itself
        var userInput = $("#searchInput").val().trim(); //retrieve the texts that user inputs
        var inputArr = userInput.split(",") 
        //userInput is a string of city and country, we need to split the string at the comma, into an array that contains
        //2 items: city and country. Do a console.log(inputArr) --> ["los angeles", "us"] --> this is what we want for the Weather API ajax call
        
        //Store each index into a var to plug into the query URL later:
        var cityName = inputArr[0];
        var country = inputArr[1];
        var apiKey1 = "c6ab9da6663a3be45b9f754658c32b90";
        var queryWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + country + "&appid=" + apiKey1;
        
        //Now we do the Weather ajax call:
        $.ajax({
            url: queryWeather,
            method: "GET"
        }).then(function(response) {
            
            //Store the info that Object gives out in variables to make it easier to manipulate:
            var resultCityName = response.name;
            var weatherCode = (response.weather[0].id);
            var weatherDescription = (response.weather[0].description).toUpperCase();

            //Convert temperature string in Object into integer, to plug into calculation:
            var mainTemp = parseInt(response.main.temp);
            var highTemp= parseInt(response.main.temp_max);
            var minTemp= parseInt(response.main.temp_min);
            
            //Convert Kelvin into Fahrenheit and Celcius:
            var currentFah = kelToF(mainTemp);
            var currentCel = kelToC(mainTemp);
            var highFah = kelToF(highTemp);
            var highCel = kelToC(highTemp);
            var minFah = kelToF(minTemp);
            var minCel = kelToC(minTemp);

            //Grab ID and attach temperatures to display on HTML:
            $("#resultCityName").html(resultCityName + "<br> <H6>Weather</H6>");
            $("#currentWeather").text(weatherDescription);
            $("#currentTemp").text(currentFah + '\xB0F' + ' / ' + currentCel + '\xB0C');
            $('#highTemp').text(highFah + '\xB0F' + ' / ' + highCel+ '\xB0C' );
            $('#minTemp').text(minFah + '\xB0F' + ' / ' + minCel + '\xB0C');
            $('#searchInput').hide();
            $('#searchLocation').hide();
            $('#search_results').show();

            //if statement for weather background and icon
            // var codeCheck = str.startsWith;
            console.log(weatherCode);
            
            // if(codeCheck("2")){
                
            // } else if(codeCheck("3")){

            // } else if(codeCheck("4")){
            
            // } else if(codeCheck("5")){

            // } else if(codeCheck("6")){

            // } else if(codeCheck("7")){

            // } else if(codeCheck("8")){

            //console.log(response)
           
        }); 
    });

    //The Weather API gives out temperature in Kelvin, we need to convert it to Fahrenheit and Celcius
    function kelToF(kelvin) {
        return Math.floor((kelvin * 9 / 5 - 459.67)); //round down to whole integer using Math.floor()
    };

    function kelToC(kelvin) {
        return Math.floor((kelvin - 273.15)); //round down to whole integer using Math.floor()
    };
    //END OF SECTION 1
    //=================
                                

    //================================================================================================
                                //Carousel (Section 2)
    //================================================================================================

    // Create arrays of Hot/Cold food, these will be used to compare with Yelp API to spit out the restaurants that we want:
    var foodHot =["ice cream","sandwiches","salads","jamba juice","juice","boba","ice tea","milk tea","slushies","fruits",,"parfait","ceviche","sushi",,"hummus","popsicles",]
    var foodCold =["hot tea","coffee","hot cocoa","hot chocolate","hot soups","ramen","spicy food","oatmeal","pot pies","casserole","pasta"]
    var currentTemp = '';
    var weatherCondition = "";

    //Function to determine whether it's cold or hot. I thought about it and it's better to use current temperature to determine this.

    var currentTemp = $("#currentFah");
    var weatherCondition = '';
    function hotOrCold(currentTemp){
        if (currentTemp >= 65){
            weatherCondition = "hot";
        } else {
            weatherCondition = "cold";
            
        };
    };

});