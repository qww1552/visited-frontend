import * as Card from "./card.js";
import * as Map from "./map.js";
import * as Geo from "./geolocation.js";

const $btn = document.getElementById("test-btn");

window.onload = () => {
    Geo.getLocation().then((res) => console.log(res));
    Card.getCards().then((cards) => {
        for (const card of cards) {
            console.log(card);
            const position = {
                latitude: card.latitude,
                longitude: card.longitude,
            };
            Map.drawMarkerAndInfoWindow(position, card.message);
        }
    });
};
