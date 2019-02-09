$(document).ready(function () {
    $('#search_results').hide();
    //================================================================================================
    //Search and Display Weather Info (Section 1)
    //================================================================================================

    $(document).on("click", "#searchLocation", function (event) { //when user clicks the search button
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
        }).then(function (response) {

            //Store the info that Object gives out in variables to make it easier to manipulate:
            var resultCityName = response.name;
            var weatherCode = (response.weather[0].id);
            var weatherDescription = (response.weather[0].description).toUpperCase();

            //Convert temperature string in Object into integer, to plug into calculation:
            var mainTemp = parseInt(response.main.temp);
            var highTemp = parseInt(response.main.temp_max);
            var minTemp = parseInt(response.main.temp_min);

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
            $('#highTemp').text(highFah + '\xB0F' + ' / ' + highCel + '\xB0C');
            $('#minTemp').text(minFah + '\xB0F' + ' / ' + minCel + '\xB0C');
            $('#searchInput').hide();
            $('#searchLocation').hide();
            $('#search_results').show();

            //if statement for weather background and icon
            console.log(weatherCode);
            var str = String(weatherCode);

            if (str.startsWith("2") == true) {
                $("#icon").attr("src", "./assets/images/Icons/thunderstorm_icon.png");
                $("#lower_display").css("background", "url(./assets/images/backgrounds/thunderstorm.jpg)");
            } else if (str.startsWith("3") == true) {
                $("#icon").attr("src", "./assets/images/Icons/drizzle_icon.png");
                $("#lower_display").css("background", "url(./assets/images/backgrounds/drizzle.jpg)");
            } else if (str.startsWith("5") == true) {
                $("#icon").attr("src", "./assets/images/Icons/rain_icon.png");
                $("#lower_display").css("background", "url(./assets/images/backgrounds/rain.jpg)");
            } else if (str.startsWith("6") == true) {
                $("#icon").attr("src", "./assets/images/Icons/snow_icon.png");
                $("#lower_display").css("background", "url(./assets/images/backgrounds/snow.jpg)");
            } else if (str.startsWith("7") == true) {
                $("#icon").attr("src", "./assets/images/Icons/atmosphere_icon.png");
                $("#lower_display").css("background", "url(./assets/images/backgrounds/atmosphere.jpg)");
            } else if (str.startsWith("800") == true) {
                $("#icon").attr("src", "./assets/images/Icons/clear_icon.png");
                $("#lower_display").css("background", "url(./assets/images/backgrounds/clear.jpg)");
            } else if (str.startsWith("801") == true || str.startsWith("802") == true || str.startsWith("803") == true || str.startsWith("804") == true) {
                $("#icon").attr("src", "./assets/images/Icons/clouds_icon.png");
                $("#lower_display").css("background", "url(./assets/images/backgrounds/clouds.jpg)");
            }

            //console.log(response)

            var weatherCondition = '';
            var userInput=" los angeles";

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + userInput,
                "method": "GET",
                "headers": {
                "Authorization": "Bearer IwHA5UrtrqeH3DqL3fwQN8s8J-1Z60jBP2IcLJSmKQ5i3aQKWWlYTNGj4KyaMLuI7dSg1WMi9lTGHv6c2aoKm8S85gilFYXJSbWbZA0dNUKEu-PzQq57PfMfhP5YXHYx",
                //   "cache-control": "no-cache",
                //   "Postman-Token": "e57859a1-5f70-487b-85b7-14a613f5d005"
                }
            }

            $.ajax(settings).done(function (response) {
            console.log(response);
            
            var foodHot =["ice cream","sandwiches","salads","jamba juice","juice","boba","ice tea","milk tea","slushies","fruits","parfait","ceviche","sushi","hummus","popsicles",];
            var foodCold =["hot tea","coffee","hot cocoa","hot chocolate","hot soups","ramen","spicy food","oatmeal","pot pies","casserole","pasta"];
            var randHot = foodHot[Math.floor(Math.random() * foodHot.length)];
            var randCold = foodCold[Math.floor(Math.random() * foodCold.length)];

            function hotOrCold(currentFah){
                if (currentFah >= 65){
                    var randHot = foodHot[Math.floor(Math.random() * foodHot.length)];
                    return randHot;
                } else if (currentFah < 65) {
                    var randCold = foodCold[Math.floor(Math.random() * foodCold.length)];
                    return randCold;
                };
                
                
            }

            console.log(hotOrCold(currentFah));


            })
           
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
    //Restaurant Cards (Section 2)
    //================================================================================================

    // // Create arrays of Hot/Cold food, these will be used to compare with Yelp API to spit out the restaurants that we want:
    // var foodHot =["ice cream","sandwiches","salads","jamba juice","juice","boba","ice tea","milk tea","slushies","fruits",,"parfait","ceviche","sushi",,"hummus","popsicles",]
    // var foodCold =["hot tea","coffee","hot cocoa","hot chocolate","hot soups","ramen","spicy food","oatmeal","pot pies","casserole","pasta"]
    // var currentTemp = '';
    // var weatherCondition = "";

    // //Function to determine whether it's cold or hot. I thought about it and it's better to use current temperature to determine this.

    // var currentTemp = $("#currentFah");
    
    // function hotOrCold(currentTemp){
    //     if (currentTemp >= 65){
    //         weatherCondition = "hot";
    //     } else {
    //         weatherCondition = "cold";
            
    //     };
    // };

    //Yelp: Comments, location, ratings, price range//
    // var queryBusiness = "https://api.yelp.com/v3/businesses/ApIPybnarwxkzBgbYegVWQ";
    // var clientID = "ApIPybnarwxkzBgbYegVWQ";
    // var apiKey = "IwHA5UrtrqeH3DqL3fwQN8s8J-1Z60jBP2IcLJSmKQ5i3aQKWWlYTNGj4KyaMLuI7dSg1WMi9lTGHv6c2aoKm8S85gilFYXJSbWbZA0dNUKEu-PzQq57PfMfhP5YXHYx";
    // var userInput=" los angeles";

    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + userInput,
    //     "method": "GET",
    //     "headers": {
    //     "Authorization": "Bearer IwHA5UrtrqeH3DqL3fwQN8s8J-1Z60jBP2IcLJSmKQ5i3aQKWWlYTNGj4KyaMLuI7dSg1WMi9lTGHv6c2aoKm8S85gilFYXJSbWbZA0dNUKEu-PzQq57PfMfhP5YXHYx",
    //     //   "cache-control": "no-cache",
    //     //   "Postman-Token": "e57859a1-5f70-487b-85b7-14a613f5d005"
    //     }
    // }

    // $.ajax(settings).done(function (response) {
    // console.log(response);
    
    // function hotOrCold(mainTemp){
    //     if (mainTemp >= 65){
    //         weatherCondition = "hot";
    //     } else if (mainTemp < 65) {
    //         weatherCondition = "cold";
    //     }
    //     return weatherCondition
    // }



    // })



    hotOrCold();   

//     // var queryBusiness = "https://api.yelp.com/v3/businesses/ApIPybnarwxkzBgbYegVWQ";
//     // var clientID = "ApIPybnarwxkzBgbYegVWQ";
//     // var apiKey = "IwHA5UrtrqeH3DqL3fwQN8s8J-1Z60jBP2IcLJSmKQ5i3aQKWWlYTNGj4KyaMLuI7dSg1WMi9lTGHv6c2aoKm8S85gilFYXJSbWbZA0dNUKEu-PzQq57PfMfhP5YXHYx";

//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search" + "location=" + userInput,
//         "method": "GET",
//         "headers": {
//             "Authorization": "Bearer IwHA5UrtrqeH3DqL3fwQN8s8J-1Z60jBP2IcLJSmKQ5i3aQKWWlYTNGj4KyaMLuI7dSg1WMi9lTGHv6c2aoKm8S85gilFYXJSbWbZA0dNUKEu-PzQq57PfMfhP5YXHYx",
//             //   "cache-control": "no-cache",
//             //   "Postman-Token": "e57859a1-5f70-487b-85b7-14a613f5d005"
//         }
//     }
//     $.ajax(settings).done(function (response) {
//         //Code//


//     });
// });//End of document ready fucntion
 

});