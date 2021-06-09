const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
};
const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

function makeMarker(position) {
    return new kakao.maps.Marker({
        position: new kakao.maps.LatLng(position.latitude, position.longitude),
    });
}

function makeInfoWindow(position, data) {
    var iwContent = `<div style="padding:5px;">${data}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    return new kakao.maps.InfoWindow({
        map: map, // 인포윈도우가 표시될 지도
        position: new kakao.maps.LatLng(position.latitude, position.longitude),
        content: iwContent,
        removable: true,
    });
}

function drawMarkerAndInfoWindow(position, data) {
    const marker = makeMarker(position);
    const infowindow = makeInfoWindow(position, data);
    marker.setMap(map);
    infowindow.open(map, marker);
}

export { drawMarkerAndInfoWindow, makeInfoWindow, makeMarker };
