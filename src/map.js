const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
};
const $map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

let markerAndOverlay = [];

function makeMarker(position, callback) {
    const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(position.latitude, position.longitude),
        map: $map,
    });

    kakao.maps.event.addListener(marker, "click", callback);

    return marker;
}

function makeInfoWindow(position, content, callback) {
    var iwContent = `
    <div class="overlay">
        ${content}
    </div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const customOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(position.latitude, position.longitude),
        clickable: true,
        content: iwContent,
        xAnchor: 0.5,
        yAnchor: 1.9,
        map: $map,
    });
    kakao.maps.event.addListener(customOverlay, "click", callback);

    return customOverlay;
}

function drawMarkerAndOverlay(marker, overlay) {
    markerAndOverlay.push([marker, overlay]);
    marker.setMap($map);
    overlay.setMap($map);
}

function clearMap() {
    for (const icons of markerAndOverlay) {
        icons[0].setMap(null);
        icons[1].setMap(null);
    }
    markerAndOverlay = [];
}

function setCenter(position) {
    var moveLatLon = new kakao.maps.LatLng(
        position.latitude,
        position.longitude
    );
    $map.setCenter(moveLatLon);
}

export {
    setCenter,
    drawMarkerAndOverlay as drawMarkerAndInfoWindow,
    makeInfoWindow,
    makeMarker,
    clearMap,
};
