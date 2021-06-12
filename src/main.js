import * as Card from "./card.js";
import * as KakaoMap from "./map.js";
import * as Geo from "./geolocation.js";
import "./main.css";

const $newMemoForm = document.querySelector("#new-memo");
const $memoForm = document.querySelector("#memo");

window.onload = () => {
    console.log("onload");
    drawPage();
};

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

$newMemoForm.onsubmit = async (event) => {
    event.preventDefault(); // prevent refresh when submit is occured
    const currentPosition = await Geo.getLocation();

    const data = new FormData(event.target);
    const card = {
        author: data.get("author"),
        password: data.get("password"),
        message: data.get("message"),
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
    };
    const response = await Card.addCard(card);
    drawPage();
    KakaoMap.setCenter(currentPosition.coords);

    console.log(response);
};

$memoForm.onsubmit = async (event) => {
    event.preventDefault(); // prevent refresh when submit is occured
    const currentPosition = await Geo.getLocation();

    const data = new FormData(event.target);
    const card = {
        id: data.get("id"),
        author: data.get("author"),
        password: data.get("password"),
        message: data.get("message"),
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
    };
    const response = await Card.updateCard(card);
    drawPage();
    KakaoMap.setCenter(currentPosition.coords);

    console.log(response);
};
