//Image pull from IG//
var queryIG = "https://api.instagram.com/v1/users/self/media/recent/?access_token=4690252769.28b47d3.6f17a44a78ba443aadc67bb56ef3b159";
    
$.ajax({
  url: queryIG,
  method: "GET"
}).then(function(response) {
    var results = response.data;
    for (let i = 0; i < results.length; i++) {
        var image = results[i].images.standard_resolution.url;
        var img = $("<img>").attr("src", image)   
        var newDiv = $("<div>")
        newDiv.append(img); 
        $("#test").append(newDiv);
    };
});
//Yelp: Comments, location, ratings, price range//
var queryBusiness = "https://api.yelp.com/v3/businesses/ApIPybnarwxkzBgbYegVWQ";
var clientID = "ApIPybnarwxkzBgbYegVWQ";
var apiKey = "IwHA5UrtrqeH3DqL3fwQN8s8J-1Z60jBP2IcLJSmKQ5i3aQKWWlYTNGj4KyaMLuI7dSg1WMi9lTGHv6c2aoKm8S85gilFYXJSbWbZA0dNUKEu-PzQq57PfMfhP5YXHYx";
var userInput="";

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
  console.log(userInput);
});
      var results = response.data;
      for (let i = 0; i < results.length; i++) {
          var image = results[i].images.standard_resolution.url;
          var img = $("<img>").attr("src", image)   
          var newDiv = $("<div>")
          newDiv.append(img);
          $("#test").append(newDiv);
      };
