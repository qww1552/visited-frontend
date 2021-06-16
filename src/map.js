const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
};
const $map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

let markerAndInfowindowStorage = [];
let overlayStorage = '';

function makeMarker(position, callback) {
    const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(position.latitude, position.longitude),
        map: $map,
    });

    kakao.maps.event.addListener(marker, "click", callback);

    return marker;
}

function makeOverlay(position, content) {
    // var iwContent = `
    // <div class="overlay">
    //     ${content}
    //     <div id="menu">
    //         <button class="menu-item update" data-bs-toggle="modal"
    //         data-bs-target="#exampleModal">수정</button>
    //     </div>
    // </div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const iwContent = `<div class="card">
    <div class="card-header">
    ${content.author}님이 남긴 메모

    <div class="close" onclick="closeOverlay()" title="닫기"></div>
    </div>
        <div class="card-body">
            <p class="card-text">${content.message}</p>
        </div>
        <div class="card-footer text-muted">
                <button class="menu-item update" data-bs-toggle="modal"
                data-bs-target="#exampleModal">수정</button>
        </div>
    </div>`
    const customOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(position.latitude, position.longitude),
        clickable: true,
        content: iwContent,
        xAnchor: 0,
        yAnchor: 1.5,
        map: $map,
    });
    if (overlayStorage) {
        overlayStorage.setMap(null)
    }
    overlayStorage = customOverlay;
}

function makeInfoWindow(position, content) {
    var iwContent = `
    <div class="info-title">
        ${content}
    </div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const infoWindow = new kakao.maps.InfoWindow({
        position: new kakao.maps.LatLng(position.latitude, position.longitude),
        content: iwContent,
        map: $map,
    });
    return infoWindow;
}

function drawMarkerAndInfowindow(marker, infowindow) {
    markerAndInfowindowStorage.push([marker, infowindow]);
    marker.setMap($map);
    infowindow.open($map,marker);
}

function clearMap() {
    for (const icons of markerAndInfowindowStorage) {
        icons[0].setMap(null);
        icons[1].setMap(null);
    }
    if (overlayStorage) {
        overlayStorage.setMap(null);
        overlayStorage = '';
    }
    markerAndInfowindowStorage = [];
}

function setCenter(position) {
    var moveLatLon = new kakao.maps.LatLng(
        position.latitude,
        position.longitude
    );
    $map.panTo(moveLatLon);
}

export {
    setCenter,
    drawMarkerAndInfowindow,
    makeOverlay,
    makeInfoWindow,
    makeMarker,
    clearMap
};
