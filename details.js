document.addEventListener("DOMContentLoaded", function () {

    const API_KEY = "11af7ce7db64488aaed72decacafab2b";
    const params = new URLSearchParams(window.location.search);

    const city = params.get("city");
    const lat = params.get("lat");
    const lon = params.get("lon");

    const cityName = document.getElementById("cityName");
    const placesContainer = document.getElementById("placesContainer");
    const hotelsContainer = document.getElementById("hotelsContainer");
    const placesLoading = document.getElementById("placesLoading");
    const hotelsLoading = document.getElementById("hotelsLoading");
    const placesEmpty = document.getElementById("placesEmpty");
    const hotelsEmpty = document.getElementById("hotelsEmpty");

    if (!city || !lat || !lon) {
        window.location.href = "index.html";
        return;
    }

    cityName.textContent = city;

    loadPlaces();
    loadHotels();

    // =========================
    // FAMOUS PLACES
    // =========================
    async function loadPlaces() {
        try {
            const categories = "tourism.attraction,entertainment.museum,leisure.park";
            const url = `https://api.geoapify.com/v2/places?categories=${encodeURIComponent(categories)}&filter=circle:${lon},${lat},10000&limit=9&lang=en&apiKey=${API_KEY}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error("Places API error: " + response.status);

            const data = await response.json();
            placesLoading.classList.add("hidden");

            if (!data.features || data.features.length === 0) {
                placesEmpty.classList.remove("hidden");
                return;
            }

            data.features.forEach(function (place) {
                createPlaceCard(place);
            });

        } catch (error) {
            console.error("PLACES ERROR:", error);
            placesLoading.textContent = "Unable to load famous places.";
        }
    }

    function createPlaceCard(place) {
        const properties = place.properties;
        const name = properties.name || "Unnamed attraction";
        const address = properties.formatted || "Location information unavailable";
        const id = properties.place_id;
        const latitude = properties.lat || place.geometry.coordinates[1];
        const longitude = properties.lon || place.geometry.coordinates[0];

        const card = document.createElement("article");
        card.className = "place-card";
        
        // Clean text-focused card layout to prevent broken image placeholders
        card.innerHTML = `
            <div class="card-content" style="padding: 20px;">
                <span class="card-label">Attraction</span>
                <h3 style="margin: 10px 0; font-size: 1.2rem;">${escapeHTML(name)}</h3>
                <p style="color: #666; font-size: 0.9rem; margin-bottom: 15px;">${escapeHTML(address)}</p>
                <a class="details-button" href="place-details.html?id=${encodeURIComponent(id)}&lat=${latitude}&lon=${longitude}">View Details</a>
            </div>
        `;
        placesContainer.appendChild(card);
    }

    // =========================
    // HOTELS
    // =========================
    async function loadHotels() {
        try {
            const url = `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${lon},${lat},10000&limit=9&lang=en&apiKey=${API_KEY}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error("Hotels API error: " + response.status);

            const data = await response.json();
            hotelsLoading.classList.add("hidden");

            if (!data.features || data.features.length === 0) {
                hotelsEmpty.classList.remove("hidden");
                return;
            }

            data.features.forEach(function (hotel) {
                createHotelCard(hotel);
            });

        } catch (error) {
            console.error("HOTELS ERROR:", error);
            hotelsLoading.textContent = "Unable to load hotels.";
        }
    }

    function createHotelCard(hotel) {
        const properties = hotel.properties;
        const name = properties.name || "Hotel";
        const address = properties.formatted || "Address unavailable";
        const id = properties.place_id;
        const latitude = properties.lat || hotel.geometry.coordinates[1];
        const longitude = properties.lon || hotel.geometry.coordinates[0];
        const officialWebsite = properties.website || "";

        const card = document.createElement("article");
        card.className = "place-card";
        
        card.innerHTML = `
            <div class="card-content" style="padding: 20px;">
                <span class="card-label hotel-label">Hotel</span>
                <h3 style="margin: 10px 0; font-size: 1.2rem;">${escapeHTML(name)}</h3>
                <p style="color: #666; font-size: 0.9rem; margin-bottom: 15px;">${escapeHTML(address)}</p>
                <a class="details-button" href="hotel-details.html?id=${encodeURIComponent(id)}&lat=${latitude}&lon=${longitude}">View Details</a>
                ${officialWebsite ? `<a class="official-button" href="${escapeHTML(officialWebsite)}" target="_blank" rel="noopener noreferrer" style="margin-left: 10px;">Official Website</a>` : ""}
            </div>
        `;
        hotelsContainer.appendChild(card);
    }

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

});