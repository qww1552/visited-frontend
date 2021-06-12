const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
};
const $map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

function makeMarker(position, callback) {
    const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(position.latitude, position.longitude),
        // map: $map,
    });

    kakao.maps.event.addListener(marker, "click", callback);

    return marker;
}

function makeInfoWindow(position, content, callback) {
    var iwContent = `<div class="btn btn-primary" style="padding:5px;">${content}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const infowindow = new kakao.maps.InfoWindow({
        position: new kakao.maps.LatLng(position.latitude, position.longitude),
        content: iwContent,
        removable: true,
        // map: $map,
    });
    kakao.maps.event.addListener(infowindow, "click", callback);
    return infowindow;
}

function drawMarkerAndInfoWindow(marker, infowindow) {
    marker.setMap($map);
    infowindow.open($map, marker);
}

function setCenter(position) {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(
        position.latitude,
        position.longitude
    );
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    $map.setCenter(moveLatLon);
}

export { setCenter, drawMarkerAndInfoWindow, makeInfoWindow, makeMarker };
