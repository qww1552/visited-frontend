const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
const $btn = document.getElementById("test-btn");
const baseUrl = "http://localhost:8080/";
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
          marker.setMap(map);
          var infowindow = new kakao.maps.InfoWindow({
            map: map, // 인포윈도우가 표시될 지도
            position: iwPosition,
            content: iwContent,
            removable: iwRemoveable,
          });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
function geoLocationSuccess(position) {
  let card = {
    author: "insert test",
    password: "1234",
    message: "insert test",
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  fetch(baseUrl + "cards", {
    method: "POST",
    body: JSON.stringify(card),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
}
