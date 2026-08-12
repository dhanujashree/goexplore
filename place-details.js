document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "11af7ce7db64488aaed72decacafab2b";
   
    const params = new URLSearchParams(window.location.search);
    const placeId = params.get("id");
    const lat = params.get("lat");
    const lon = params.get("lon");

    if (!placeId) {
        document.body.innerHTML = "<h2>Place not found. <a href='index.html'>Go Back</a></h2>";
        return;
    }

    loadPlaceDetails(placeId);

    async function loadPlaceDetails(id) {
        try {
            const url = `https://api.geoapify.com/v2/place-details?id=${encodeURIComponent(id)}&apiKey=${API_KEY}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error("Failed to fetch place details");

            const data = await response.json();
            if (data.features && data.features.length > 0) {
                renderDetails(data.features[0].properties);
            } else {
                document.body.innerHTML = "<h2>Place details unavailable. <a href='index.html'>Go Back</a></h2>";
            }
        } catch (error) {
            console.error("Error loading place details:", error);
            document.body.innerHTML = "<h2>Error loading details. <a href='index.html'>Go Back</a></h2>";
        }
    }

    function renderDetails(props) {
        const name = props.name || "Attraction Details";
        const address = props.formatted || "Address unavailable";
        
        document.title = `${name} - GoExplore`;

        const container = document.body;
        container.innerHTML = `
            <div style="max-width: 800px; margin: 40px auto; padding: 20px; font-family: sans-serif;">
                <p><a href="javascript:history.back()" style="text-decoration: none; color: #0066cc;">← Back</a></p>
                <h1 style="margin-top: 20px; font-size: 2rem;">${escapeHTML(name)}</h1>
                <p style="color: #555; margin-bottom: 25px;"><strong>Address:</strong> ${escapeHTML(address)}</p>

                ${lat && lon ? `<a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #0066cc; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">View on Google Maps</a>` : ""}
            </div>
        `;
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