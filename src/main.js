import * as Card from "./card.js";

const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
const $btn = document.getElementById("test-btn");
var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
};

const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

function getLocation() {
    if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
            geoLocationSuccess,
            function error(error) {
                console.error(error);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: Infinity,
            }
        );
    } else {
        alert("GPS를 지원하지 않습니다");
    }
}

$btn.addEventListener("click", () => {
    getLocation();
    getCards();
});

window.onload = () => {
    getCards();
};

function getCards() {
    fetch(baseUrl + "cards", { method: "GET" })
        .then((response) => {
            response.json().then((data) => {
                console.log(data);

                for (const card of data) {
                    if (card.latitude == 0 || card.longitude == 0) continue;
                    const newLocation = new kakao.maps.LatLng(
                        card.latitude,
                        card.longitude
                    );

                    var iwContent = `<div style="padding:5px;">${card.author}, ${card.message}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                        iwPosition = newLocation, //인포윈도우 표시 위치입니다
                        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

                    var marker = new kakao.maps.Marker({
                        position: newLocation,
                    });
                    var infowindow = new kakao.maps.InfoWindow({
                        map: map, // 인포윈도우가 표시될 지도
                        position: iwPosition,
                        content: iwContent,
                        removable: iwRemoveable,
                    });
                    kakao.maps.event.addListener(marker, "click", function () {
                        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                        Card.deleteCard(card.id);
                    });
                    marker.setMap(map);
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

function geoLocationSuccess(position) {
    const data = new FormData(document.querySelector("form"));
    const value = Object.fromEntries(data.entries());
    let card = {
        author: value["author"],
        password: value["password"],
        message: value["message"],
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };
    Card.addCard(card);
}
