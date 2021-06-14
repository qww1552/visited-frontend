import * as Geo from "./geolocation";
import * as Card from "./card";
import * as KakaoMap from "./map";
const $memoForm = document.getElementById("memo");
async function drawPage() {
    const currentPosition = await Geo.getLocation();
    const cards = await Card.getCards(currentPosition.coords);

    for (const card of cards) {
        const cardPosition = {
            latitude: card.latitude,
            longitude: card.longitude,
        };
        const marker = KakaoMap.makeMarker(currentPosition.coords, async () => {
            const response = await Card.getCard(card.id);
            for (const key in card) {
                if (Object.hasOwnProperty.call(card, key)) {
                    const element = card[key];
                    console.log(key);
                    $memoForm.elements[key].value = element;
                }
            }
        });

        const infowindow = KakaoMap.makeInfoWindow(
            currentPosition.coords,
            card.message
        );
        KakaoMap.drawMarkerAndInfoWindow(marker, infowindow);
    }
}

export { drawPage };
