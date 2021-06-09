import * as Card from "./card.js";
import * as KakaoMap from "./map.js";
import * as Geo from "./geolocation.js";

const $btn = document.getElementById("test-btn");

window.onload = () => {
    // Geo.getLocation().then((res) => console.log(res));
    drawPage();
};

async function drawPage() {
    const currentPosition = await Geo.getLocation();
    const cards = await Card.getCards();
    for (const card of cards) {
        const cardPosition = {
            latitude: card.latitude,
            longitude: card.longitude,
        };
        KakaoMap.drawMarkerAndInfoWindow(cardPosition, card.message);
    }
}
