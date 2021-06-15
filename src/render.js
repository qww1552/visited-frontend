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
        const marker = KakaoMap.makeMarker(cardPosition, () => {
            FormMethod.fillFormInput(card);
            KakaoMap.makeOverlay(cardPosition,card);
        });

        const infowindow = KakaoMap.makeInfoWindow(
            cardPosition,
            card.author,
        );

        KakaoMap.drawMarkerAndInfowindow(marker, infowindow);
    }
    
    forceInfowindowStyle();

}

function forceInfowindowStyle() {
    getInfoWindows().forEach(element => setInfowindowStyle(element))
}

function getInfoWindows() {
    return document.querySelectorAll('.info-title');
}

function setInfowindowStyle(e) {
    var w = e.offsetWidth + 10;
    var ml = w/2;
    e.parentElement.style.top = "82px";
    e.parentElement.style.left = "50%";
    e.parentElement.style.marginLeft = -ml+"px";
    e.parentElement.style.width = w+"px";
    e.parentElement.previousSibling.style.display = "none";
    e.parentElement.parentElement.style.border = "0px";
    e.parentElement.parentElement.style.background = "unset";
}


export { drawPage };

