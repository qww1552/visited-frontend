import * as Geo from "./geolocation";
import * as Card from "./card";
import * as KakaoMap from "./map";
import * as FormMethod from "./form-method"

async function drawPage() {
    KakaoMap.clearMap();
    
    const currentPosition = await Geo.getLocation();
    const cards = await Card.getCards(currentPosition.coords);

    for (const card of cards) {
        const cardPosition = {
            latitude: card.latitude,
            longitude: card.longitude,
        };
        const marker = KakaoMap.makeMarker(cardPosition, async () => {
            FormMethod.fillFormInput(card);
        });

        const infowindow = KakaoMap.makeInfoWindow(
            cardPosition,
            card.message
        );
        KakaoMap.drawMarkerAndInfoWindow(marker, infowindow);
    }
}

export { drawPage };

