import * as Geo from "./geolocation";
import * as Card from "./card";
import * as Render from "./render";
import * as KakaoMap from "./map";

const $newMemoForm = document.querySelector("#new-memo");
const $memoForm = document.querySelector("#memo");
const $deleteBtn = document.getElementById("delete");

function init() {
    $newMemoForm.onsubmit = submitAdd;
    $memoForm.onsubmit = submitUpdate;
    $deleteBtn.onclick = submitDelete;
}

const submitAdd = async (event) => {
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
    if (response.error) {
        alert(response.message);
    }

    Render.drawPage();
    KakaoMap.setCenter(currentPosition.coords);
};

const submitUpdate = async (event) => {
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
    console.log(response);
    if (response.error) {
        alert(response.message);
    }
    Render.drawPage();
};

const submitDelete = async (event) => {
    const data = new FormData($memoForm);
    const id = data.get("id");
    const password = data.get("password") || " ";

    const response = await Card.deleteCard(id, password);
    console.log(response);
    if (response.error) {
        alert(response.message);
    }
    Render.drawPage();
};

function fillFormInput(card) {
    for (const key in card) {
        if (Object.hasOwnProperty.call($memoForm.elements, key)) {
            const element = card[key];
            $memoForm.elements[key].value = element;
        }
    }
}


export { init, fillFormInput};
