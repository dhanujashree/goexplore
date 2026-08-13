var API_KEY = "11af7ce7db64488aaed72decacafab2b";

var searchInput =
    document.getElementById("searchInput");

var searchBtn =
    document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {

    var city = searchInput.value.trim();

    if (city === "") {
        alert("Please enter a city");
        return;
    }

    console.log("Searching for:", city);

    findCity(city);
});


async function findCity(city) {

    try {

        var url =
            "https://api.geoapify.com/v1/geocode/search" +
            "?text=" + encodeURIComponent(city) +
            "&type=city" +
            "&limit=1" +
            "&lang=en" +
            "&apiKey=" + API_KEY;

        console.log("API URL created");

        var response = await fetch(url);

        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error(
                "Geoapify returned " + response.status
            );
        }

        var data = await response.json();

        console.log("Geoapify result:", data);

        if (!data.features || data.features.length === 0) {

            alert("City not found");

            return;
        }

        var properties =
            data.features[0].properties;

        var placeId =
            properties.place_id;

        var cityName =
            properties.city ||
            properties.name ||
            city;

        var lat = properties.lat;
        var lon = properties.lon;


        console.log("City:", cityName);
        console.log("Place ID:", placeId);
        console.log("Latitude:", lat, "Longitude:", lon);


        window.location.href =
            "details.html?city=" +
            encodeURIComponent(cityName) +
            "&placeId=" +
            encodeURIComponent(placeId) +
            "&lat=" +
            encodeURIComponent(lat) +
            "&lon=" +
            encodeURIComponent(lon);


    } catch (error) {

        console.error(
            "Geoapify error:",
            error
        );

        alert(
            "Unable to search right now. Check the browser console."
        );
    }
}

  document.addEventListener("DOMContentLoaded", function () {

 
  var places = [
    { name: "Singapore", image: "https://images.pexels.com/photos/1842332/pexels-photo-1842332.jpeg?cs=srgb&dl=architecture-attraction-bay-1842332.jpg&fm=jpg" },
    { name: "Australia", image: "https://www.rd.com/wp-content/uploads/2020/01/australia.jpg" },
    { name: "Thailand", image: "https://www.roadaffair.com/wp-content/uploads/2018/11/wat-arun-bangkok-thailand-shutterstock_521829061.jpg" },
    { name: "India", image: "https://www.holidify.com/images/bgImages/DELHI.jpg" },
    { name: "South Korea", image: "https://lp-cms-production.imgix.net/2019-06/475514416_high.jpg" },
    { name: "Japan", image: "https://thriftynomads.com/wp-content/uploads/2018/01/Japan-Mt-Fuji.jpg" },
    { name: "Iceland", image: "https://icelandtrippers.com/wp-content/uploads/2020/07/godafoss-northern-lights-scaled.jpg" },
    { name: "Paris", image: "https://i.etsystatic.com/12595643/r/il/1b04da/989729975/il_794xN.989729975_dcg2.jpg" },
    { name: "Switzerland", image: "https://wallpaperaccess.com/full/1094033.jpg" }
  ];

  var destinationCards = document.querySelectorAll(".destinations .card");
  var currentIndex = 0;

  function updateDestinationCards() {
    for (var i = 0; i < destinationCards.length; i++) {
      (function (card, i) {
        var placeIndex = (currentIndex + i) % places.length;
        var img = card.querySelector("img");
        var span = card.querySelector("span");

        img.style.transition = "opacity 1s ease-in-out";
        img.style.opacity = 0;

        setTimeout(function () {
          img.src = places[placeIndex].image;
          span.textContent = places[placeIndex].name;
          img.style.opacity = 1;
        }, 500);
      })(destinationCards[i], i);
    }

    currentIndex += destinationCards.length;
    if (currentIndex >= places.length) currentIndex = 0;
  }

  updateDestinationCards();
  setInterval(updateDestinationCards, 3000);


  
  var countryImages = {
    "Switzerland": [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      "https://d20t6we9nb6rnn.cloudfront.net/jennyandyani/1678635994394-640x640.jpg",
      "https://i0.wp.com/alpshiking.swisshikingvacations.com/wp-content/uploads/2020/04/05ALP_0243-Wasenegg-hikers-Eiger-Monch-Jungfrau-mini-min.jpg?w=1000&ssl=1"
    ],
    "Nepal": [
      "https://dynamic.tourtravelworld.com/blog_images/17-best-places-to-visit-in-nepal-before-you-die-20170605040457.jpg",
      "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/12/22171359/pokhra.jpg",
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/7a/77/03.jpg"
    ],
    "Kashmir": [
      "https://www.tripplannersindia.com/assets/blog/images/bestplacestovisitinkashmir/Gulmarg.webp",
      "https://tse2.mm.bing.net/th/id/OIP.yR3tpYhizVh35_pnOfG29wHaD9?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://th.bing.com/th/id/R.6282d99441e336f87aea0af3c8b7767e?rik=MUZ8E8Yi%2b08nxw&riu=http%3a%2f%2fwww.rajasthantourplanner.com%2fblog%2fwp-content%2fuploads%2f2017%2f04%2fGulmarg--1024x681.jpg&ehk=DrMBopUOleTLEZ01lXBB48E951HQpCqOImYg3Ikm%2biE%3d&risl=&pid=ImgRaw&r=0"
    ],
    "South Korea": [
      "https://www.agoda.com/wp-content/uploads/2018/06/experience_south-korea_seoul_winter-skiing-snowboarding.jpg",
      "https://livingnomads.com/wp-content/uploads/2019/11/03/Everland-Snow-Buster-01.jpg",
      "https://cdn.koreatraveleasy.com/wp-content/uploads/2018/01/06015803/korea-ski-yongpyong-resort-kids-activity-winter.jpg"
    ],
    "Tibet": [
      "tibet.jpg",
      "https://data.tibettravel.org/assets/images/tour-review/winter-tibet-tour8.jpg",
      "https://www.worldtravelguide.net/wp-content/uploads/2017/03/shu-China-Tibet-PotalaPalace-137112731-1440x823.jpg"
    ]
  };

  var tripCards = document.querySelectorAll(".trip-card");

  tripCards.forEach(function (card) {
    var country = card.querySelector("h3").innerText.trim();
    var img = card.querySelector("img");

    if (!countryImages[country]) return;

    var images = countryImages[country];
    var index = 0;

    setInterval(function () {
      index = (index + 1) % images.length;
      img.src = images[index];
    }, 2500);
  });


  
  var searchInput = document.getElementById("searchInput");
  var searchBtn = document.getElementById("searchBtn");
  var searchCards = document.querySelectorAll(".cards-container .box");
  var cardsSection = document.querySelector(".cards-container");

  searchBtn.addEventListener("click", function () {
    var value = searchInput.value.toLowerCase().trim();

    if (value === "") {
      alert("Please type a country or place name");
      return;
    }

    searchCards.forEach(function (card) {
      var name = card.getAttribute("data-name").toLowerCase();
      card.classList.remove("active", "fade");

      if (name.includes(value)) {
        card.classList.add("active");
      } else {
        card.classList.add("fade");
      }
    });

    cardsSection.scrollIntoView({ behavior: "smooth" });
  });

  searchInput.addEventListener("input", function () {
    if (this.value === "") {
      searchCards.forEach(function (card) {
        card.classList.remove("active", "fade");
      });
    }
  });


  var availabilityBtns = document.querySelectorAll(".availability-btn");
  var stayCards = document.querySelectorAll(".stay");

  availabilityBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var currentCard = this.closest(".stay");
      var isActive = currentCard.classList.contains("active");

      stayCards.forEach(function (card) {
        card.classList.remove("active", "fade");
      });

      if (!isActive) {
        currentCard.classList.add("active");
        stayCards.forEach(function (card) {
          if (card !== currentCard) card.classList.add("fade");
        });
      }
    });
  });

});

  







