const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


searchBtn.addEventListener("click", function () {

    const place =
        searchInput.value.trim();


    if (!place) {

        alert("Please enter a destination.");

        return;

    }


    window.location.href =
        `details.html?place=${encodeURIComponent(place)}`;

});
