const API_KEY = "2a5b964fc1db43a78145f98780c2c16a";


const cityInput =
    document.getElementById("cityInput");

const searchButton =
    document.getElementById("searchButton");


searchButton.addEventListener("click", searchCity);


cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchCity();

    }

});


async function searchCity() {

    const city =
        cityInput.value.trim();


    if (!city) {

        alert("Please enter a city.");

        return;

    }


    try {

        searchButton.disabled = true;

        searchButton.textContent = "Searching...";


        const url =
            `https://api.geoapify.com/v1/geocode/search` +
            `?text=${encodeURIComponent(city)}` +
            `&type=city` +
            `&limit=1` +
            `&lang=en` +
            `&apiKey=${API_KEY}`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Unable to search for the city."
            );

        }


        const data =
            await response.json();


        if (
            !data.features ||
            data.features.length === 0
        ) {

            alert(
                "City not found. Try another city."
            );

            return;

        }


        const cityData =
            data.features[0];


        const cityProperties =
            cityData.properties;


        const placeId =
            cityProperties.place_id;


        const cityName =
            cityProperties.city ||
            cityProperties.name ||
            city;


        if (!placeId) {

            throw new Error(
                "City place ID was not found."
            );

        }


        window.location.href =
            `details.html?city=${encodeURIComponent(cityName)}&placeId=${encodeURIComponent(placeId)}`;


    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong. Please try again."
        );

    } finally {

        searchButton.disabled = false;

        searchButton.textContent = "Explore";

    }

}